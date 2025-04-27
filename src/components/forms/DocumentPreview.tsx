
import { Button } from "@/components/ui/button";
import { PetitionFormData } from "@/types/forms";
import { ArrowDown, Download, Printer } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentPreviewProps {
  formData: PetitionFormData;
}

const DocumentPreview = ({ formData }: DocumentPreviewProps) => {
  const { toast } = useToast();
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const handleDownloadPDF = () => {
    toast({
      title: "Generating PDF",
      description: "Your petition document is being prepared for download.",
    });
    // In a real implementation, we would use a PDF generation library
    // like jsPDF or html2pdf here
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden flex flex-col h-full">
      <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30 flex justify-between items-center">
        <h3 className="text-lg font-medium text-asklegal-purple">Document Preview</h3>
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-asklegal-purple/40 text-white hover:bg-asklegal-purple/20"
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
          >
            Download <ArrowDown size={16} className="ml-2" />
          </Button>
          
          {showDownloadOptions && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-asklegal-dark border border-asklegal-purple/30 rounded-md shadow-lg z-10 animate-fade-in">
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-asklegal-purple/20"
                onClick={handleDownloadPDF}
              >
                <Download size={16} className="inline-block mr-2" /> Download as PDF
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-asklegal-purple/20"
                onClick={handlePrint}
              >
                <Printer size={16} className="inline-block mr-2" /> Print Document
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-auto">
        <div className="bg-white text-gray-900 p-8 shadow-lg min-h-[842px] w-full max-w-[595px] mx-auto animate-paper-print">
          <div className="text-center mb-6">
            <h1 className="text-xl font-nepali font-bold">श्री सर्वोच्च अदालत</h1>
            <p className="font-nepali">काठमाडौं</p>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-lg font-nepali font-bold underline">निवेदन पत्र</h2>
          </div>
          
          <div className="space-y-4 font-nepali">
            <p>
              विषय: {formData.subject || "___________"}
            </p>
            
            <div className="flex gap-2">
              <div className="w-1/2">
                <p>निवेदक: {formData.applicantName || "___________"}</p>
                <p>जिल्ला: {formData.district || "___________"}</p>
                <p>ठेगाना: {formData.address || "___________"}</p>
              </div>
              
              <div className="w-1/2">
                <p>विपक्षी: {formData.opponentName || "___________"}</p>
                <p>पद: {formData.opponentPosition || "___________"}</p>
                <p>कार्यालय: {formData.opponentOffice || "___________"}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold mb-2">१. निवेदनको व्यहोरा:</h3>
              <p className="whitespace-pre-line">{formData.petitionDetails || "यहाँ निवेदनको व्यहोरा लेख्नुहोस्..."}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold mb-2">२. माग:</h3>
              <p className="whitespace-pre-line">{formData.demands || "यहाँ माग लेख्नुहोस्..."}</p>
            </div>
            
            <div className="mt-8 text-right">
              <p>निवेदक</p>
              <p>नाम: {formData.applicantName || "___________"}</p>
              <p>मिति: {formData.date || "___________"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
