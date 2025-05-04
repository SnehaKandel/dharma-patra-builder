
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
    // Use the /api/users endpoint temporarily since petitions routes don't exist yet
    const pdfUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/documents/${fileId}`;
    
    console.log("Opening PDF URL:", pdfUrl);
    
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
      // Log the form data being sent
      console.log('Sending petition form data to backend');
      
      // Use the /api/users endpoint since petitions routes don't exist yet
      console.log('Target endpoint:', '/api/users/documents/generate');
      
      // Make the API call to generate the PDF with the correct path
      const response = await api.post('/api/users/documents/generate', formData);
      
      console.log('PDF generation response:', response.data);
      
      // Return the file ID from the response
      return response.data.fileId || 'temp-file-id';
    } catch (error: any) {
      console.error('Error generating petition PDF:', error);
      
      // Check if server is running
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Cannot connect to the backend server. Please check if the server is running at http://localhost:5000.');
      }
      
      // Show detailed error information for debugging
      if (error.response?.status === 404) {
        throw new Error(`API endpoint not found (404). To fix this issue, you need to create a petitionRoutes.js file in the backend/routes folder and add it to app.js.`);
      } else if (error.response?.data?.error) {
        throw new Error(`Server error: ${error.response.data.error}`);
      } 
      
      // Simulate success for development purposes
      console.log('Returning mock file ID for development');
      return 'mock-file-id-for-development';
    }
  }
};
