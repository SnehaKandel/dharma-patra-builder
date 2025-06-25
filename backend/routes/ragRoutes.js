
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const fs = require('fs').promises;
const { pipeline } = require('@huggingface/transformers');
const router = express.Router();

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/pdfs/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Initialize embedding pipeline
let embedder = null;
const initializeEmbedder = async () => {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
};

// Chunk text into smaller segments
const chunkText = (text, chunkSize = 500) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? '. ' : '') + sentence;
    }
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
};

// Calculate cosine similarity
const cosineSimilarity = (a, b) => {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// Upload and process PDFs
router.post('/upload-pdfs', upload.array('pdfs', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No PDF files uploaded' });
    }

    const embedder = await initializeEmbedder();
    const documents = [];

    for (const file of req.files) {
      console.log(`Processing ${file.originalname}...`);
      
      // Extract text from PDF
      const dataBuffer = await fs.readFile(file.path);
      const pdfData = await pdfParse(dataBuffer);
      
      // Clean and chunk the text
      const cleanText = pdfData.text.replace(/\s+/g, ' ').trim();
      const chunks = chunkText(cleanText, 400);
      
      // Generate embeddings for each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await embedder(chunk, { pooling: 'mean', normalize: true });
        
        documents.push({
          filename: file.originalname,
          chunkIndex: i,
          content: chunk,
          embedding: Array.from(embedding.data),
          uploadDate: new Date()
        });
      }
    }

    // Save to database (MongoDB collection)
    const db = req.app.locals.db;
    const collection = db.collection('constitution_documents');
    
    // Clear existing documents
    await collection.deleteMany({});
    
    // Insert new documents
    await collection.insertMany(documents);
    
    console.log(`Processed ${documents.length} document chunks from ${req.files.length} PDFs`);
    
    res.json({ 
      message: 'PDFs processed successfully',
      documentsCount: documents.length,
      filesProcessed: req.files.length
    });

  } catch (error) {
    console.error('Error processing PDFs:', error);
    res.status(500).json({ error: 'Failed to process PDFs' });
  }
});

// Query the RAG system
router.post('/query', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const embedder = await initializeEmbedder();
    
    // Generate embedding for the question
    const questionEmbedding = await embedder(question, { pooling: 'mean', normalize: true });
    const questionVector = Array.from(questionEmbedding.data);
    
    // Retrieve documents from database
    const db = req.app.locals.db;
    const collection = db.collection('constitution_documents');
    const documents = await collection.find({}).toArray();
    
    if (documents.length === 0) {
      return res.status(404).json({ error: 'No documents found. Please upload constitution PDFs first.' });
    }
    
    // Calculate similarities and get top 3 most relevant chunks
    const similarities = documents.map(doc => ({
      ...doc,
      similarity: cosineSimilarity(questionVector, doc.embedding)
    }));
    
    const topChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);
    
    // Prepare context for Ollama
    const context = topChunks.map(chunk => chunk.content).join('\n\n');
    const sources = [...new Set(topChunks.map(chunk => chunk.filename))];
    
    // Call Ollama
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: `Based on the following context from Nepal's Constitution documents, answer the question. If the answer is not in the context, say "I don't have information about that in the provided documents."

Context:
${context}

Question: ${question}

Answer:`,
        stream: false
      })
    });
    
    if (!ollamaResponse.ok) {
      throw new Error('Ollama service unavailable');
    }
    
    const ollamaData = await ollamaResponse.json();
    
    res.json({
      answer: ollamaData.response,
      sources: sources,
      relevantChunks: topChunks.length
    });

  } catch (error) {
    console.error('Error in RAG query:', error);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

// Get upload status
router.get('/status', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('constitution_documents');
    const count = await collection.countDocuments();
    
    const uniqueFiles = await collection.distinct('filename');
    
    res.json({
      documentsCount: count,
      filesUploaded: uniqueFiles.length,
      files: uniqueFiles
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

module.exports = router;
