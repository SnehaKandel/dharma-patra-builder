
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const logger = require('../utils/logger');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/petitions');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  logger.info(`Created directory: ${uploadsDir}`);
}

/**
 * @route POST /api/petitions/generate
 * @desc Generate a PDF petition from form data
 * @access Public
 */
router.post('/generate', async (req, res) => {
  try {
    logger.info('Received petition form data for PDF generation');
    
    // Mock response for now - in reality, you'd generate a PDF here
    const fileId = `petition-${Date.now()}.pdf`;
    
    // Mock writing a file for demonstration purposes
    fs.writeFileSync(
      path.join(uploadsDir, fileId),
      'This is a mock PDF file content'
    );
    
    // Return success response with file ID
    return res.status(200).json({
      success: true,
      message: 'PDF generated successfully',
      fileId: fileId
    });
  } catch (error) {
    logger.error('Error generating petition PDF:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
      error: error.message
    });
  }
});

/**
 * @route GET /api/petitions/download/:fileId
 * @desc Download a generated petition PDF
 * @access Public
 */
router.get('/download/:fileId', (req, res) => {
  try {
    const { fileId } = req.params;
    const filePath = path.join(uploadsDir, fileId);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'PDF file not found'
      });
    }
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${fileId}`);
    
    // Stream the file to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    logger.error('Error downloading petition PDF:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to download PDF',
      error: error.message
    });
  }
});

module.exports = router;
