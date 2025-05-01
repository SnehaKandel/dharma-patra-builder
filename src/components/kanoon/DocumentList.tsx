
import { LegalDocument } from "@/types/forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

interface DocumentListProps {
  documents: LegalDocument[];
  setSelectedDocument: (doc: LegalDocument | null) => void;
}

const DocumentList = ({ documents, setSelectedDocument }: DocumentListProps) => {
  // Filter e-commerce documents separately
  const ecomDocument = documents.find(doc => doc.id === "ecom-combined");
  const actDocuments = documents.filter(doc => !doc.id.startsWith('ecom'));
  
  return (
    <div className="card-glassmorphism p-0 overflow-hidden">
      <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30">
        <h2 className="text-lg font-medium text-asklegal-heading">
          Acts and legislative provisions
        </h2>
      </div>
      <div className="p-4">
        <Tabs defaultValue="ecommerce" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-asklegal-card-bg text-asklegal-text">
            <TabsTrigger value="ecommerce" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs md:text-sm">विद्युतीय व्यापार</TabsTrigger>
            <TabsTrigger value="acts" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs md:text-sm">Acts</TabsTrigger>
            <TabsTrigger value="constitution" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs md:text-sm">Constitution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ecommerce" className="space-y-4">
            {ecomDocument && (
              <div 
                className="flex items-center gap-2 p-2 hover:bg-asklegal-purple/10 rounded cursor-pointer"
                onClick={() => setSelectedDocument(ecomDocument)}
              >
                <FileText className="h-4 w-4 text-asklegal-purple" />
                <span className="text-asklegal-text font-nepali">{ecomDocument.title}</span>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="acts" className="space-y-4">
            {actDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center gap-2 p-2 hover:bg-asklegal-purple/10 rounded cursor-pointer"
                onClick={() => setSelectedDocument(doc)}
              >
                <FileText className="h-4 w-4 text-asklegal-purple" />
                <span className="text-asklegal-text font-nepali">{doc.title}</span>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="constitution" className="space-y-4">
            <div className="flex items-center gap-2 p-2 hover:bg-asklegal-purple/10 rounded cursor-pointer">
              <FileText className="h-4 w-4 text-asklegal-purple" />
              <span className="text-asklegal-text font-nepali">नेपालको संविधान</span>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentList;
