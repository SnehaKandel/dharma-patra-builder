
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PetitionForm from "@/components/forms/PetitionForm";
import DocumentPreview from "@/components/forms/DocumentPreview";
import { PetitionFormData } from "@/types/forms";
import { Link } from "react-router-dom";
import { Search, Download, RefreshCcw, AlertTriangle, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { pdfService } from "@/services/pdfService";

const Forms = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PetitionFormData>({
    subject: "दाखिल खारेज गरिपाउँ।",
    applicantName: "",
    district: "",
    address: "",
    residentYears: "",
    opponentName: "",
    opponentPosition: "",
    opponentOffice: "",
    petitionDetails: "",
    demands: "",
    date: new Date().toISOString().split('T')[0],
    caseNumber: "",
    issueNumber: "",
    applicantMunicipality: "",
    applicantDistrictName: "",
    applicantAdditionalInfo: "",
    applicantWardNumber: "",
    applicantFatherName: "",
    opponentMunicipality: "",
    mukuda: "",
    opponentAdditionalInfo: "",
    opponentFatherName: "",
    opponentDistrictName: "",
    opponentYearsOfResidence: "",
    opponentWardNumber: "",
    otherWardNumber: "",
    otherName: "",
    otherMunicipality: "",
    otherWardName: "",
    shubham: "",
    day: "",
    month: "",
    year: "",
    dateBS: ""
  });
  
  // Add state to track the generated PDF file ID
  const [generatedPdfId, setGeneratedPdfId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<string | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  // Function to handle form submission and PDF generation
  const handleGeneratePdf = async () => {
    if (isGenerating) return;
    
    try {
      setIsGenerating(true);
      setLastError(null);
      
      toast({
        title: "Generating PDF",
        description: "Your petition document is being prepared...",
      });
      
      // Log API URL for debugging
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log("Using API URL:", apiUrl);
      
      // Capture request details for debugging
      const requestUrl = `${apiUrl}/api/petitions/generate`;
      setLastRequest(requestUrl);
      console.log("Sending request to:", requestUrl);
      
      // Submit the form data to generate a PDF
      const fileId = await pdfService.submitPetitionForm(formData);
      console.log("Generated PDF file ID:", fileId);
      
      setGeneratedPdfId(fileId);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your petition document is ready for download.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "There was an error generating your PDF. Please try again.";
      setLastError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: errorMessage,
      });
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to download PDF directly
  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      setLastError(null);
      
      toast({
        title: "Downloading PDF",
        description: "Preparing your petition document for download...",
      });
      
      await pdfService.downloadPetitionPdf(formData);
      
      toast({
        title: "Download Started",
        description: "Your petition PDF is downloading now.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "There was an error downloading your PDF. Please try again.";
      setLastError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: errorMessage,
      });
      console.error("Error downloading PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to open the PDF in a new tab
  const handleOpenPdf = () => {
    if (generatedPdfId) {
      console.log("Opening PDF with ID:", generatedPdfId);
      pdfService.openPetitionPdf(generatedPdfId);
    } else {
      toast({
        variant: "destructive",
        title: "No PDF Available",
        description: "Please generate a PDF first before attempting to download.",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-asklegal-heading">Judicial Petitions and Forms</h1>
            <p className="text-asklegal-text/70 mt-2">
              Create, customize, and download legal petition documents.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowDebugPanel(!showDebugPanel)}
            >
              <Terminal size={16} />
              {showDebugPanel ? 'Hide Debug' : 'Show Debug'}
            </Button>
            
            <Link to="/kanoon-search">
              <Button className="flex items-center gap-2 bg-asklegal-purple hover:bg-asklegal-accent text-white shadow-sm">
                <Search size={18} />
                <span>कानून खोज</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Debug Panel */}
        {showDebugPanel && (
          <div className="mb-6 p-4 bg-gray-900 text-gray-200 rounded-md font-mono text-xs overflow-x-auto">
            <h3 className="text-sm font-semibold mb-2">Debug Information</h3>
            <div className="space-y-1">
              <p>API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}</p>
              <p>Routes: /api/petitions/generate, /api/petitions/generate-pdf, /api/petitions/download/:fileId</p>
              {lastRequest && <p>Last request sent to: {lastRequest}</p>}
              {lastError && (
                <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded">
                  <p className="font-semibold text-red-400">Error:</p>
                  <p>{lastError}</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Potential Solutions:</h4>
              <ol className="list-decimal list-inside space-y-1 pl-2">
                <li>Check if your backend server is running on port 5000</li>
                <li>Verify petitionRoutes is registered in app.js with <code className="bg-gray-800 px-1">app.use('/api/petitions', petitionRoutes)</code></li>
                <li>Ensure the routes '/generate', '/generate-pdf', and '/download/:fileId' exist in petitionRoutes.js</li>
                <li>Check for any CORS issues</li>
                <li>Verify PDFKit is installed on the server</li>
              </ol>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <PetitionForm formData={formData} onFormChange={setFormData} />
            
            {/* PDF Generation and Download Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Button 
                onClick={handleGeneratePdf} 
                disabled={isGenerating}
                className="bg-asklegal-purple hover:bg-asklegal-accent text-white shadow-sm flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate PDF"
                )}
              </Button>
              
              <Button 
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="bg-asklegal-purple hover:bg-asklegal-accent text-white shadow-sm flex items-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download as PDF
                  </>
                )}
              </Button>
              
              {generatedPdfId && (
                <Button 
                  onClick={handleOpenPdf}
                  variant="outline"
                  className="border-asklegal-purple/50 text-asklegal-heading hover:bg-asklegal-purple/10"
                >
                  <Download size={18} className="mr-2" />
                  Open Generated PDF
                </Button>
              )}
            </div>
            
            {/* Error display with enhanced debugging info */}
            {lastError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Error Details:</h3>
                    <p className="text-sm mt-1">{lastError}</p>
                    
                    <div className="mt-3 p-3 bg-red-100 rounded text-xs font-mono">
                      <p className="font-medium">Debugging Information:</p>
                      <p className="mt-1">Backend URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}</p>
                      {lastRequest && <p className="mt-1">Last request: {lastRequest}</p>}
                      <p className="mt-1">Make sure your backend server has the routes: /api/petitions/generate and /api/petitions/generate-pdf</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Document Preview */}
          <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-8rem)]">
            <div className="card-glassmorphism shadow-md p-1">
              <DocumentPreview 
                formData={formData} 
                generatedPdfId={generatedPdfId}
                onGeneratePdf={handleGeneratePdf}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Forms;
