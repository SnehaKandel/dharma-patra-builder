
import { Button } from "@/components/ui/button";
import { PetitionFormData } from "@/types/forms";
import { ArrowDown, Download, Printer, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { pdfService } from "@/services/pdfService";

interface DocumentPreviewProps {
  formData: PetitionFormData;
  generatedPdfId?: string | null;
  onGeneratePdf?: () => Promise<void>;
}

const DocumentPreview = ({ formData, generatedPdfId, onGeneratePdf }: DocumentPreviewProps) => {
  const { toast } = useToast();
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (generatedPdfId) {
      console.log("Opening generated PDF:", generatedPdfId);
      pdfService.openPetitionPdf(generatedPdfId);
    } else if (onGeneratePdf) {
      setIsGenerating(true);
      try {
        await onGeneratePdf();
        toast({
          title: "PDF Generated",
          description: "Your petition document is ready for download.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        });
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleDownloadDirectPDF = async () => {
    setIsDownloading(true);
    try {
      await pdfService.downloadPetitionPdf(formData);
      toast({
        title: "Download Started",
        description: "Your petition PDF is downloading now.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download PDF. Please try again.",
      });
      console.error("PDF download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (showDownloadOptions) {
      setShowDownloadOptions(false);
    }
  };

  return (
    <div 
      className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden flex flex-col h-full"
      onClick={handleClickOutside}
    >
      <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30 flex justify-between items-center">
        <h3 className="text-lg font-medium text-asklegal-purple">Document Preview</h3>
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-asklegal-purple/40 text-white hover:bg-asklegal-purple/20 flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowDownloadOptions(!showDownloadOptions);
            }}
            disabled={isGenerating || isDownloading}
          >
            {isGenerating || isDownloading ? (
              <>
                <RefreshCcw size={16} className="animate-spin" />
                {isDownloading ? "Downloading..." : "Generating..."}
              </>
            ) : (
              <>
                Download <ArrowDown size={16} />
              </>
            )}
          </Button>
          
          {showDownloadOptions && (
            <div 
              className="absolute right-0 mt-2 py-2 w-60 bg-asklegal-dark border border-asklegal-purple/30 rounded-md shadow-lg z-10 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-asklegal-purple/20 flex items-center"
                onClick={handleDownloadDirectPDF}
                disabled={isDownloading}
              >
                <Download size={16} className="mr-2" /> Download as PDF (Direct)
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-asklegal-purple/20 flex items-center"
                onClick={handleDownloadPDF}
                disabled={isGenerating}
              >
                <Download size={16} className="mr-2" /> {generatedPdfId ? "Open Generated PDF" : "Generate PDF"}
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-asklegal-purple/20 flex items-center"
                onClick={handlePrint}
              >
                <Printer size={16} className="mr-2" /> Print Document
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-auto">
        <div className="bg-white text-gray-900 p-8 shadow-lg min-h-[842px] w-full max-w-[595px] mx-auto animate-paper-print">
          <div className="text-right mb-4">
            <p className="font-nepali">फाराम नं २</p>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-xl font-nepali font-bold">श्री सर्वोच्च अदालत, काठमाडौंमा पेश गरेको</h1>
            <h2 className="text-lg font-nepali font-bold">निवेदन पत्र</h2>
          </div>
          
          <div className="mb-6">
            <p className="font-nepali">
              विषय: {formData.subject || "___________"}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <p className="font-nepali mb-1">मुद्दा नं {formData.caseNumber || "___________"}</p>
              <p className="font-nepali mb-4">को ठाउँ: {formData.district || "___________"}</p>
              
              <p className="font-nepali mb-1">निवेदक</p>
              <p className="font-nepali">जिल्ला {formData.applicantDistrictName || "___________"} न.पा./गा.पा. वडा नं. {formData.applicantWardNumber || "___________"}</p>
              <p className="font-nepali">बस्ने वर्ष {formData.residentYears || "___"} को {formData.applicantName || "___________"}</p>
            </div>
            
            <div>
              <p className="font-nepali mb-4">विरुद्ध</p>
              <p className="font-nepali">जिल्ला {formData.opponentDistrictName || "___________"} न.पा./गा.पा. वडा नं. {formData.opponentWardNumber || "___________"}</p>
              <p className="font-nepali">बस्ने वर्ष {formData.opponentYearsOfResidence || "___"} को {formData.opponentName || "___________"}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-nepali font-bold mb-2">मुद्दा:</h3>
            <p className="font-nepali ml-4">
              निवेदनपत्रको व्यहोरा देहाय अनुसार निवेदन गर्दछु/गर्दछौँ :
            </p>
          </div>
          
          <div className="mb-6">
            <ol className="list-decimal pl-6 space-y-4">
              <li className="font-nepali">
                {formData.petitionDetails || "उक्त मुद्दामा मैले/हामीले जिल्ला न.पा./गा.पा. वडा नं बस्ने लाई तारिख तोकिएकोमा म/हामी अशक्त तारिखमा हाजिर हुन सकेको छैन। तसर्थ तारिख थामी पाउँ भनी कानून बमोजिम आफ्नो मुद्दाको तारिख थामी पाउँ।"}
              </li>
              <li className="font-nepali">
                {formData.demands || "लेखिएको व्यहोरा ठिक साँचो हो फरक ठहरे कानूनबमोजिम सहुँला बुझाउँला।"}
              </li>
            </ol>
          </div>
          
          <div className="text-right mt-12">
            <p className="font-nepali">निवेदक</p>
            <p className="font-nepali">नाम: {formData.applicantName || "___________"}</p>
            <p className="font-nepali">मिति: {formData.dateBS || formData.date || "___________"}</p>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-300 text-xs text-gray-500">
            <p>नोट : (१) यो निवेदनपत्र तथा कागजातहरूको प्रतिलिपीहरू सम्बन्धित पक्षलाई सम्बन्धित स्थानमा उपलब्ध गराउनुपर्ने छ र त्यसको प्रति अलग्गै प्रमाणित गरी अदालत/कार्यालयमा पेशिएको हुनुपर्नेछ।</p>
            <p>(२) अनुमति पाएमा मात्र निवेदनमात्र दिन सक्नेछ।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
