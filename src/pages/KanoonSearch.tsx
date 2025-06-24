
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import { LegalDocument } from "@/types/forms";
import DocumentList from "@/components/kanoon/DocumentList";
import DocumentPreview from "@/components/kanoon/DocumentPreview";
import { MOCK_DOCUMENTS } from "@/data/mockDocuments";

const KanoonSearch = () => {
  const { toast } = useToast();
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);

  const handleDownload = (doc: LegalDocument) => {
    // Check if the document has a valid PDF URL
    if (!doc.pdfUrl || doc.pdfUrl.startsWith('/docs/')) {
      toast({
        title: "Download Not Available",
        description: "This document is not currently available for download.",
        variant: "destructive"
      });
      return;
    }

    // For image-based documents, show a message instead
    if (doc.id.startsWith('ecom') && doc.parts) {
      toast({
        title: "Preview Only",
        description: "This document is available for preview only.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create download link
      const link = document.createElement('a');
      link.href = doc.pdfUrl;
      link.download = `${doc.titleEn.replace(/\s+/g, '_')}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `${doc.title} (${doc.titleEn}) is being downloaded...`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-asklegal-heading">नेपाल कानून खोज</h1>
          <p className="text-asklegal-text/80 mt-2">
            Access Nepali laws, acts, and legislative provisions. Download PDFs directly to your device.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Document Categories */}
          <div className="lg:col-span-1">
            <DocumentList 
              documents={MOCK_DOCUMENTS} 
              setSelectedDocument={setSelectedDocument} 
            />
          </div>

          {/* Right Document Preview */}
          <div className="lg:col-span-2">
            <DocumentPreview 
              document={selectedDocument} 
              handleDownload={handleDownload} 
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default KanoonSearch;
