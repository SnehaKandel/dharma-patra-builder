
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PetitionForm from "@/components/forms/PetitionForm";
import DocumentPreview from "@/components/forms/DocumentPreview";
import { PetitionFormData } from "@/types/forms";
import { Link } from "react-router-dom";
import { Search, Download } from "lucide-react";
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

  // Function to handle form submission and PDF generation
  const handleGeneratePdf = async () => {
    if (isGenerating) return;
    
    try {
      setIsGenerating(true);
      toast({
        title: "Generating PDF",
        description: "Your petition document is being prepared...",
      });
      
      // Submit the form data to generate a PDF
      const fileId = await pdfService.submitPetitionForm(formData);
      setGeneratedPdfId(fileId);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your petition document is ready for download.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "There was an error generating your PDF. Please try again.",
      });
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to open the PDF in a new tab
  const handleOpenPdf = () => {
    if (generatedPdfId) {
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
                className="bg-asklegal-purple hover:bg-asklegal-accent text-white shadow-sm"
              >
                {isGenerating ? "Generating..." : "Generate PDF"}
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
