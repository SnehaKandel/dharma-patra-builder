
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
      // Check if the API URL environment variable is set
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      // Log the API URL for debugging
      console.log('Using API URL:', apiUrl);
      
      // Make the API call to generate the PDF
      const response = await api.post('/petitions/generate', formData);
      
      // Return the file ID from the response
      return response.data.fileId;
    } catch (error: any) {
      console.error('Error generating petition PDF:', error);
      
      // Provide more specific error information based on the error type
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Cannot connect to the backend server. Please ensure the server is running at the configured API URL.');
      }
      
      // If there's a message in the error response, use it
      if (error.response?.data?.error) {
        throw new Error(`Server error: ${error.response.data.error}`);
      }
      
      // Re-throw with a generic error message if none of the above
      throw new Error('Failed to generate PDF. Please try again later.');
    }
  },
  
  /**
   * Check if the backend server is accessible
   * @returns Promise resolving to boolean indicating if backend is accessible
   */
  checkBackendConnection: async (): Promise<boolean> => {
    try {
      await api.get('/');
      return true;
    } catch (error) {
      console.error('Backend connection check failed:', error);
      return false;
    }
  }
};
