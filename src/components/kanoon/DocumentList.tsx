
import { LegalDocument } from "@/types/forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentListProps {
  documents: LegalDocument[];
  setSelectedDocument: (doc: LegalDocument | null) => void;
}

const DocumentList = ({ documents, setSelectedDocument }: DocumentListProps) => {
  const categorizeDocuments = (category: string) => {
    return documents.filter(doc => doc.category === category);
  };

  const handleDownload = (doc: LegalDocument, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent document selection when clicking download
    const link = document.createElement('a');
    link.href = doc.pdfUrl;
    link.download = `${doc.titleEn.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const DocumentItem = ({ doc }: { doc: LegalDocument }) => (
    <div 
      className="flex items-center justify-between p-3 hover:bg-asklegal-purple/10 rounded cursor-pointer border border-transparent hover:border-asklegal-purple/20"
      onClick={() => setSelectedDocument(doc)}
    >
      <div className="flex items-start gap-3 flex-1">
        <FileText className="h-4 w-4 text-asklegal-purple mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="text-asklegal-text font-nepali text-sm font-medium truncate">{doc.title}</h4>
          <p className="text-xs text-asklegal-text/60 mt-1">{doc.titleEn}</p>
          <div className="flex gap-2 mt-1">
            <span className="text-xs text-asklegal-text/50">{doc.year}</span>
            {doc.fileSize && <span className="text-xs text-asklegal-text/50">• {doc.fileSize}</span>}
            {doc.pages && <span className="text-xs text-asklegal-text/50">• {doc.pages} pages</span>}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-asklegal-purple/20"
        onClick={(e) => handleDownload(doc, e)}
        title="Download PDF"
      >
        <Download className="h-3 w-3 text-asklegal-purple" />
      </Button>
    </div>
  );
  
  return (
    <div className="card-glassmorphism p-0 overflow-hidden">
      <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30">
        <h2 className="text-lg font-medium text-asklegal-heading">
          Acts and legislative provisions
        </h2>
      </div>
      <div className="p-4">
        <Tabs defaultValue="constitutional" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto">
            <TabsTrigger value="constitutional" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">संविधान</TabsTrigger>
            <TabsTrigger value="civil" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">नागरिक</TabsTrigger>
            <TabsTrigger value="criminal" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">फौजदारी</TabsTrigger>
            <TabsTrigger value="commercial" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">व्यापारिक</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <TabsList className="grid grid-cols-2 bg-asklegal-card-bg text-asklegal-text h-auto">
              <TabsTrigger value="labor" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">श्रम</TabsTrigger>
              <TabsTrigger value="family" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">पारिवारिक</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2 bg-asklegal-card-bg text-asklegal-text h-auto">
              <TabsTrigger value="property" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सम्पत्ति</TabsTrigger>
              <TabsTrigger value="tax" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">कर</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <TabsList className="grid grid-cols-1 bg-asklegal-card-bg text-asklegal-text h-auto">
              <TabsTrigger value="environment" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">वातावरण</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-1 bg-asklegal-card-bg text-asklegal-text h-auto">
              <TabsTrigger value="ecommerce" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">इ-कमर्स</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="space-y-1 max-h-96 overflow-y-auto">
            <TabsContent value="constitutional" className="space-y-1 mt-0">
              {categorizeDocuments('constitutional').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="civil" className="space-y-1 mt-0">
              {categorizeDocuments('civil').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="criminal" className="space-y-1 mt-0">
              {categorizeDocuments('criminal').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="commercial" className="space-y-1 mt-0">
              {categorizeDocuments('commercial').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="labor" className="space-y-1 mt-0">
              {categorizeDocuments('labor').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="family" className="space-y-1 mt-0">
              {categorizeDocuments('family').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="property" className="space-y-1 mt-0">
              {categorizeDocuments('property').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="tax" className="space-y-1 mt-0">
              {categorizeDocuments('tax').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="environment" className="space-y-1 mt-0">
              {categorizeDocuments('environment').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="ecommerce" className="space-y-1 mt-0">
              {categorizeDocuments('ecommerce').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentList;
