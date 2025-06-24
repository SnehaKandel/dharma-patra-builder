
import { LegalDocument } from "@/types/forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

interface DocumentListProps {
  documents: LegalDocument[];
  setSelectedDocument: (doc: LegalDocument | null) => void;
}

const DocumentList = ({ documents, setSelectedDocument }: DocumentListProps) => {
  const categorizeDocuments = (category: string) => {
    return documents.filter(doc => doc.category === category);
  };

  const DocumentItem = ({ doc }: { doc: LegalDocument }) => (
    <div 
      className="flex items-center gap-3 p-3 hover:bg-asklegal-purple/10 rounded cursor-pointer border border-transparent hover:border-asklegal-purple/20"
      onClick={() => setSelectedDocument(doc)}
    >
      <FileText className="h-4 w-4 text-asklegal-purple flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="text-asklegal-text font-nepali text-sm font-medium truncate">{doc.title}</h4>
        <p className="text-xs text-asklegal-text/60 mt-1">{doc.titleEn}</p>
        <div className="flex gap-2 mt-1">
          <span className="text-xs text-asklegal-text/50">{doc.year}</span>
          <span className="text-xs text-asklegal-text/50">• {doc.ministry}</span>
        </div>
      </div>
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
        <Tabs defaultValue="abuse-of-authority" className="w-full">
          {/* Main categories in a 4-column grid */}
          <TabsList className="grid grid-cols-4 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto">
            <TabsTrigger value="abuse-of-authority" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">अख्तियार दुरुपयोग</TabsTrigger>
            <TabsTrigger value="corruption" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">भ्रष्टाचार</TabsTrigger>
            <TabsTrigger value="crime" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">अपराध</TabsTrigger>
            <TabsTrigger value="judicial-procedure" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">देवानिकार्यबिधि</TabsTrigger>
          </TabsList>
          
          {/* Second row - 4 columns */}
          <TabsList className="grid grid-cols-4 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto">
            <TabsTrigger value="civil" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">देवानी</TabsTrigger>
            <TabsTrigger value="criminal" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">फौजदारी</TabsTrigger>
            <TabsTrigger value="medical-education" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">चिकित्सा शिक्षा</TabsTrigger>
            <TabsTrigger value="human-rights" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">मानव अधिकार</TabsTrigger>
          </TabsList>
          
          {/* Third row - 4 columns */}
          <TabsList className="grid grid-cols-4 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto">
            <TabsTrigger value="drug-regulation" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">लागू औषध</TabsTrigger>
            <TabsTrigger value="electronic-transaction" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">इलेक्ट्रोनिक ट्रान्जेक्सन</TabsTrigger>
            <TabsTrigger value="disaster-risk" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">विपद जोखिम</TabsTrigger>
            <TabsTrigger value="disability-rights" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">अपाङ्गता अधिकार</TabsTrigger>
          </TabsList>
          
          {/* Fourth row - 4 columns */}
          <TabsList className="grid grid-cols-4 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto">
            <TabsTrigger value="personal-privacy" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">व्यक्तिगत गोपनीयता</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">शिक्षा</TabsTrigger>
            <TabsTrigger value="labor" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">श्रम</TabsTrigger>
            <TabsTrigger value="communicable-diseases" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सङ्क्रामक रोग</TabsTrigger>
          </TabsList>
          
          {/* Fifth row - 4 columns */}
          <TabsList className="grid grid-cols-4 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto">
            <TabsTrigger value="transportation" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सवारी तथा यातायात</TabsTrigger>
            <TabsTrigger value="cooperatives" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सहकारी</TabsTrigger>
            <TabsTrigger value="public-procurement" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सार्वजनिक खरिद</TabsTrigger>
            <TabsTrigger value="good-governance" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सुशासन</TabsTrigger>
          </TabsList>
          
          {/* Sixth row - 1 column */}
          <TabsList className="grid grid-cols-1 mb-4 bg-asklegal-card-bg text-asklegal-text h-auto w-1/4">
            <TabsTrigger value="right-to-information" className="data-[state=active]:text-asklegal-heading data-[state=active]:bg-asklegal-purple/10 text-xs p-2">सूचना को हक</TabsTrigger>
          </TabsList>
          
          <div className="space-y-1 max-h-96 overflow-y-auto">
            <TabsContent value="abuse-of-authority" className="space-y-1 mt-0">
              {categorizeDocuments('abuse-of-authority').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="corruption" className="space-y-1 mt-0">
              {categorizeDocuments('corruption').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="crime" className="space-y-1 mt-0">
              {categorizeDocuments('crime').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="judicial-procedure" className="space-y-1 mt-0">
              {categorizeDocuments('judicial-procedure').map((doc) => (
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
            
            <TabsContent value="medical-education" className="space-y-1 mt-0">
              {categorizeDocuments('medical-education').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="human-rights" className="space-y-1 mt-0">
              {categorizeDocuments('human-rights').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="drug-regulation" className="space-y-1 mt-0">
              {categorizeDocuments('drug-regulation').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="electronic-transaction" className="space-y-1 mt-0">
              {categorizeDocuments('electronic-transaction').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="disaster-risk" className="space-y-1 mt-0">
              {categorizeDocuments('disaster-risk').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="disability-rights" className="space-y-1 mt-0">
              {categorizeDocuments('disability-rights').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="personal-privacy" className="space-y-1 mt-0">
              {categorizeDocuments('personal-privacy').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="education" className="space-y-1 mt-0">
              {categorizeDocuments('education').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="labor" className="space-y-1 mt-0">
              {categorizeDocuments('labor').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="communicable-diseases" className="space-y-1 mt-0">
              {categorizeDocuments('communicable-diseases').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="transportation" className="space-y-1 mt-0">
              {categorizeDocuments('transportation').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="cooperatives" className="space-y-1 mt-0">
              {categorizeDocuments('cooperatives').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="public-procurement" className="space-y-1 mt-0">
              {categorizeDocuments('public-procurement').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="good-governance" className="space-y-1 mt-0">
              {categorizeDocuments('good-governance').map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </TabsContent>
            
            <TabsContent value="right-to-information" className="space-y-1 mt-0">
              {categorizeDocuments('right-to-information').map((doc) => (
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
