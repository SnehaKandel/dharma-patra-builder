
import api from "@/lib/api";

/**
 * Service for handling PDF-related operations
 */
export const pdfService = {
  /**
   * Opens a petition PDF in a new tab
   * @param fileId - The ID or filename of the PDF to open
   */
  openPetitionPdf: (fileId: string): void => {
    // Construct the URL to the PDF endpoint
    const pdfUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/petitions/download/${fileId}`;
    
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  },

  /**
   * Submits petition form data and returns the generated PDF file ID
   * @param formData - The petition form data
   * @returns Promise resolving to the file ID of the generated PDF
   */
  submitPetitionForm: async (formData: any): Promise<string> => {
    try {
      const response = await api.post('/petitions/generate', formData);
      return response.data.fileId;
    } catch (error) {
      console.error('Error generating petition PDF:', error);
      throw error;
    }
  }
};
