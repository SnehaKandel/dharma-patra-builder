
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import { LegalDocument } from "@/types/forms";
import KanoonSearchBar from "@/components/kanoon/KanoonSearch";
import DocumentList from "@/components/kanoon/DocumentList";
import DocumentPreview from "@/components/kanoon/DocumentPreview";
import { MOCK_DOCUMENTS } from "@/data/mockDocuments";

const KanoonSearch = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);

  // Enhanced filter function with better search logic
  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => {
    let matchesSearch = true;
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      matchesSearch = 
        doc.title.toLowerCase().includes(query) ||
        doc.titleEn.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.ministry.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query);
    }
      
    if (activeCategory === "all") return matchesSearch;
    return matchesSearch && doc.category === activeCategory;
  });

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
            Search and access Nepali laws, acts, and legislative provisions. Download PDFs directly to your device.
          </p>
          {searchQuery && (
            <p className="text-sm text-asklegal-purple mt-2">
              Showing {filteredDocuments.length} results for "{searchQuery}"
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Search and Categories */}
          <div className="lg:col-span-1 space-y-6">
            <KanoonSearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
            />
            
            <DocumentList 
              documents={filteredDocuments} 
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
