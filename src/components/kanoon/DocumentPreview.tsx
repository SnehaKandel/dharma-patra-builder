
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LegalDocument } from "@/types/forms";
import { Download, FileText, Calendar, Building, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentPreviewProps {
  document: LegalDocument | null;
  handleDownload: (doc: LegalDocument) => void;
}

const DocumentPreview = ({ document, handleDownload }: DocumentPreviewProps) => {
  const { toast } = useToast();

  const handleDirectDownload = () => {
    if (!document) return;
    
    // Check if the document has a valid PDF URL
    if (!document.pdfUrl || document.pdfUrl.startsWith('/docs/')) {
      toast({
        title: "Download Not Available",
        description: "This document is not currently available for download. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    // For image-based documents, show a message instead
    if (document.id.startsWith('ecom') && document.parts) {
      toast({
        title: "Preview Only",
        description: "This document is available for preview only. Download functionality will be available soon.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const link = window.document.createElement('a');
      link.href = document.pdfUrl;
      link.download = `${document.titleEn.replace(/\s+/g, '_')}.pdf`;
      link.target = '_blank'; // Open in new tab as fallback
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `${document.title} is being downloaded to your device.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive"
      });
    }
  };

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
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold font-nepali mb-2">{document.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{document.titleEn}</p>
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-2 bg-asklegal-purple hover:bg-asklegal-purple/90"
          onClick={handleDirectDownload}
        >
          <Download className="h-4 w-4" />
          {document.pdfUrl.startsWith('/docs/') ? 'Preview Only' : 'Download PDF'}
        </Button>
      </div>
      
      {/* Document Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-asklegal-purple" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Year: {document.year}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-asklegal-purple" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{document.ministry}</span>
        </div>
        <div className="flex items-center gap-2">
          <File className="h-4 w-4 text-asklegal-purple" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {document.fileSize && `${document.fileSize}`}
            {document.pages && ` • ${document.pages} pages`}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        {document.id === "ecom-combined" && document.parts ? (
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {document.parts.map((imagePath, index) => (
                <div key={index} className="flex justify-center">
                  <img 
                    src={imagePath} 
                    alt={`${document.title} - Page ${index + 1}`}
                    className="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded shadow-sm"
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
              className="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded shadow-sm"
              style={{ maxHeight: '600px' }}
            />
          </div>
        ) : (
          <div className="h-[600px] flex items-center justify-center">
            <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <FileText className="h-16 w-16 text-asklegal-purple/70 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-asklegal-heading mb-2">Document Preview</h3>
              <p className="text-asklegal-text/80 mb-4 max-w-md">
                {document.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {document.pdfUrl.startsWith('/docs/') 
                  ? 'This document is currently available for preview only.'
                  : 'Click the download button above to view the full document.'
                }
              </p>
              {!document.pdfUrl.startsWith('/docs/') && (
                <Button 
                  variant="outline" 
                  onClick={handleDirectDownload}
                  className="border-asklegal-purple text-asklegal-purple hover:bg-asklegal-purple/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {document.titleEn}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
