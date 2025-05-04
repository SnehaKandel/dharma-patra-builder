
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Directory where generated PDFs are stored
const UPLOADS_DIR = path.join(__dirname, '../uploads/generated');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/**
 * Generate a PDF from petition form data
 */
router.post('/generate', async (req, res) => {
  try {
    const formData = req.body;
    
    // Generate a unique filename
    const fileName = `petition_${Date.now()}.pdf`;
    const filePath = path.join(UPLOADS_DIR, fileName);
    
    // Create a PDF document
    const doc = new PDFDocument({ font: 'Helvetica' });
    const writeStream = fs.createWriteStream(filePath);
    
    doc.pipe(writeStream);
    
    // Add content to the PDF based on form data
    doc.fontSize(18).text('Judicial Petition', { align: 'center' });
    doc.moveDown();
    
    // Add header section
    doc.fontSize(14).text(`Subject: ${formData.subject || 'N/A'}`);
    doc.moveDown();
    
    // Add case details
    doc.fontSize(12).text(`Case Number: ${formData.caseNumber || 'N/A'}`);
    doc.text(`Issue Number: ${formData.issueNumber || 'N/A'}`);
    doc.moveDown();
    
    // Add applicant details
    doc.fontSize(14).text('Applicant Details:', { underline: true });
    doc.fontSize(12).text(`Name: ${formData.applicantName || 'N/A'}`);
    doc.text(`District: ${formData.applicantDistrictName || 'N/A'}`);
    doc.text(`Municipality: ${formData.applicantMunicipality || 'N/A'}`);
    doc.text(`Ward Number: ${formData.applicantWardNumber || 'N/A'}`);
    doc.text(`Years of Residence: ${formData.residentYears || 'N/A'}`);
    doc.text(`Father's Name: ${formData.applicantFatherName || 'N/A'}`);
    doc.moveDown();
    
    // Add opponent details
    doc.fontSize(14).text('Opponent Details:', { underline: true });
    doc.fontSize(12).text(`Name: ${formData.opponentName || 'N/A'}`);
    doc.text(`District: ${formData.opponentDistrictName || 'N/A'}`);
    doc.text(`Municipality: ${formData.opponentMunicipality || 'N/A'}`);
    doc.text(`Ward Number: ${formData.opponentWardNumber || 'N/A'}`);
    doc.text(`Years of Residence: ${formData.opponentYearsOfResidence || 'N/A'}`);
    doc.text(`Father's Name: ${formData.opponentFatherName || 'N/A'}`);
    doc.moveDown();
    
    // Add petition details
    doc.fontSize(14).text('Petition Details:', { underline: true });
    doc.fontSize(12).text(formData.petitionDetails || 'No details provided.');
    doc.moveDown();
    
    // Add demands
    doc.fontSize(14).text('Demands:', { underline: true });
    doc.fontSize(12).text(formData.demands || 'No demands specified.');
    doc.moveDown();
    
    // Add date and signature
    doc.text(`Date: ${formData.dateBS || formData.date || 'N/A'}`);
    doc.moveDown(2);
    doc.text('_______________________', { align: 'right' });
    doc.text('Applicant Signature', { align: 'right' });
    
    // Finalize PDF
    doc.end();
    
    // Wait for the PDF to be fully written
    writeStream.on('finish', () => {
      res.status(200).json({
        message: 'Petition PDF generated successfully',
        fileId: fileName,
      });
    });
    
    writeStream.on('error', (error) => {
      console.error('Error writing PDF:', error);
      res.status(500).json({ error: 'Failed to generate PDF' });
    });
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

/**
 * Serve a generated PDF file
 */
router.get('/download/:fileId', (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Prevent path traversal attacks by sanitizing the fileId
    const sanitizedFileId = path.basename(fileId);
    const filePath = path.join(UPLOADS_DIR, sanitizedFileId);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('PDF not found');
    }
    
    // Set headers for inline PDF viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${sanitizedFileId}"`);
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Error serving PDF:', error);
    res.status(500).send('Error serving the PDF file');
  }
});

module.exports = router;
