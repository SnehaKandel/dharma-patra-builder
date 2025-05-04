
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PetitionForm from "@/components/forms/PetitionForm";
import DocumentPreview from "@/components/forms/DocumentPreview";
import { PetitionFormData } from "@/types/forms";
import { Link } from "react-router-dom";
import { Search, Download, RefreshCcw, AlertTriangle } from "lucide-react";
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
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<string | null>(null);

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
          
          <div className="flex items-center">
            <Link to="/kanoon-search">
              <Button className="flex items-center gap-2 bg-asklegal-purple hover:bg-asklegal-accent text-white shadow-sm">
                <Search size={18} />
                <span>कानून खोज</span>
              </Button>
            </Link>
          </div>
        </div>

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
              
              {generatedPdfId && (
                <Button 
                  onClick={handleOpenPdf}
                  variant="outline"
                  className="border-asklegal-purple/50 text-asklegal-heading hover:bg-asklegal-purple/10"
                >
                  <Download size={18} className="mr-2" />
                  Open PDF
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
                      <p className="mt-1">Make sure your backend server has the route: /api/petitions/generate</p>
                    </div>
                    
                    <p className="text-xs mt-3 text-red-500">
                      Based on your backend logs, the route /api/petitions/generate is returning a 404 error.
                      Check your backend routes configuration.
                    </p>
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
