
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

  // Filter documents
  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => {
    if (searchQuery === "") return true;
    
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeCategory === "all") return matchesSearch;
    return matchesSearch && doc.category === activeCategory;
  });

  const handleDownload = (doc: LegalDocument) => {
    toast({
      title: "Downloading Document",
      description: `Downloading ${doc.title} (${doc.titleEn})...`,
    });
    // In a real app, this would trigger actual download
    window.open(doc.pdfUrl, '_blank');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-asklegal-heading">नेपाल कानून खोज</h1>
          <p className="text-asklegal-text/80 mt-2">
            Search and access Nepali laws, acts, and legislative provisions.
          </p>
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
