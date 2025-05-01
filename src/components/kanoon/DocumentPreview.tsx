
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LegalDocument } from "@/types/forms";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentPreviewProps {
  document: LegalDocument | null;
  handleDownload: (doc: LegalDocument) => void;
}

const DocumentPreview = ({ document, handleDownload }: DocumentPreviewProps) => {
  if (!document) {
    return (
      <div className="card-glassmorphism flex items-center justify-center min-h-[842px]">
        <div className="text-center p-6">
          <FileText className="h-16 w-16 text-asklegal-purple/70 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-asklegal-heading mb-2">Select a document to preview</h3>
          <p className="text-asklegal-text/80 max-w-md">
            Choose a document from the list on the left to view its contents here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 min-h-[842px] animate-paper-print">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold font-nepali">{document.title}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => handleDownload(document)}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">{document.titleEn}</p>
        <p className="text-gray-600 dark:text-gray-300">{document.year}</p>
        <p className="text-gray-600 dark:text-gray-300">{document.ministry}</p>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {document.id === "ecom-combined" && document.parts ? (
          <ScrollArea className="h-[700px] pr-4">
            <div className="space-y-6">
              {document.parts.map((imagePath, index) => (
                <div key={index} className="flex justify-center">
                  <img 
                    src={imagePath} 
                    alt={`${document.title} - Page ${index + 1}`}
                    className="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : document.id.startsWith('ecom') ? (
          <div className="flex justify-center">
            <img 
              src={document.pdfUrl} 
              alt={document.title}
              className="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded"
              style={{ maxHeight: '700px' }}
            />
          </div>
        ) : (
          <div>
            <p className="font-nepali">
              यो {document.title} सम्बन्धी कानून हो। यसले {document.description} को बारेमा व्याख्या गर्दछ। 
              यो {document.year} सालमा जारी गरिएको थियो। यो दस्तावेज {document.ministry} द्वारा प्रकाशित गरिएको हो।
            </p>
            <div className="text-center mt-20">
              <p className="text-gray-500 dark:text-gray-400">PDF प्रिभ्यू यहाँ देखाइनेछ। यो केवल डेमो विवरण हो।</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Fix the missing import
import { FileText } from "lucide-react";

export default DocumentPreview;
