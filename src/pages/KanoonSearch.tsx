import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LegalDocument } from "@/types/forms";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration
const MOCK_DOCUMENTS: LegalDocument[] = [
  // E-commerce combined document (new addition)
  {
    id: "ecom-combined",
    title: "विद्युतीय व्यापार (इ-कमर्स) ऐन",
    titleEn: "Electronic Commerce Act",
    description: "विद्युतीय व्यापार (इ-कमर्स) को सम्बन्धमा व्यवस्था गर्न बनेको ऐन",
    category: "Acts",
    year: "2061",
    ministry: "उद्योग, वाणिज्य तथा आपूर्ति मन्त्रालय",
    pdfUrl: "public/lovable-uploads/b03bbdd5-6db3-4a51-9d7a-da1d9c37e131.png",
    isPopular: true,
    parts: [
      "public/lovable-uploads/b03bbdd5-6db3-4a51-9d7a-da1d9c37e131.png",
      "public/lovable-uploads/9a6482de-ec4e-4c1b-9204-f51586f8108b.png",
      "public/lovable-uploads/4492931e-4550-4726-a387-3884fdbf2a0f.png",
      "public/lovable-uploads/fb6aaf25-5a2e-42f7-81dd-e6aa6aae98ed.png",
      "public/lovable-uploads/e1a10177-9d9a-4e38-a47c-961c645d175d.png",
      "public/lovable-uploads/cefec219-6879-41e2-92d6-b7e314e44f75.png",
      "public/lovable-uploads/203bd37b-028c-4184-b46a-d7eea96bbef7.png",
    ]
  },
  // Original content
  {
    id: "1",
    title: "अधिकार दुरुपयोग",
    titleEn: "Adhikar Durupayog",
    description: "अधिकारको दुरुपयोग सम्बन्धी ऐन",
    category: "Acts",
    year: "2058",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/adhikar-durupayog.pdf",
    isPopular: true
  },
  {
    id: "2",
    title: "भ्रष्टाचार",
    titleEn: "Bhrastachar",
    description: "भ्रष्टाचार निवारण ऐन",
    category: "Acts",
    year: "2059",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/bhrastachar.pdf",
    isPopular: true
  },
  {
    id: "3",
    title: "अपराधी",
    titleEn: "Aparadhi",
    description: "अपराधी संहिता",
    category: "Acts",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/aparadhi.pdf",
    isPopular: true
  },
  {
    id: "4",
    title: "देवानीकायदाह",
    titleEn: "Dewanikayada",
    description: "देवानी संहिता",
    category: "Acts",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/dewanikayada.pdf",
    isPopular: true
  },
  {
    id: "5",
    title: "दीवानी",
    titleEn: "Diwani",
    description: "दीवानी कार्यविधि संहिता",
    category: "Acts",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/diwani.pdf",
    isPopular: true
  },
  // Added more items to match screenshot
  {
    id: "6",
    title: "फौजदारी",
    titleEn: "Faujdari",
    description: "फौजदारी कार्यविधि संहिता",
    category: "Acts",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/faujdari.pdf",
    isPopular: true
  },
  {
    id: "7",
    title: "चिकित्सा शिक्षा ऐन",
    titleEn: "Chikitsa Shiksha Ain",
    description: "चिकित्सा शिक्षा ऐन",
    category: "Acts",
    year: "2075",
    ministry: "शिक्षा, विज्ञान तथा प्रविधि मन्त्रालय",
    pdfUrl: "/docs/chikitsa-shiksha.pdf",
    isPopular: true
  },
  {
    id: "8",
    title: "मानव अधिक��र",
    titleEn: "Manav Adhikar",
    description: "राष्ट्रिय मानव अधिकार आयोग ऐन",
    category: "Acts",
    year: "2068",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/manav-adhikar.pdf",
    isPopular: true
  }
];

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
            <div className="card-glassmorphism p-0 overflow-hidden">
              <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30 flex items-center">
                <Search className="w-5 h-5 text-asklegal-purple mr-2" />
                <h2 className="text-lg font-medium text-asklegal-heading">
                  Search Kanoon
                </h2>
              </div>
              <div className="p-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search legal resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-asklegal-purple/40 text-asklegal-text pl-10 pr-4 focus-visible:ring-1 focus-visible:ring-asklegal-purple"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-asklegal-purple" />
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-asklegal-heading mb-2">Popular searches</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="text-sm bg-asklegal-purple/10 hover:bg-asklegal-purple/20 text-asklegal-text px-3 py-1 rounded-md"
                      onClick={() => setSearchQuery("Constitution")}
                    >
                      Constitution
                    </button>
                    <button 
                      className="text-sm bg-asklegal-purple/10 hover:bg-asklegal-purple/20 text-asklegal-text px-3 py-1 rounded-md"
                      onClick={() => setSearchQuery("Acts")}
                    >
                      Acts
                    </button>
                    <button 
                      className="text-sm bg-asklegal-purple/10 hover:bg-asklegal-purple/20 text-asklegal-text px-3 py-1 rounded-md"
                      onClick={() => setSearchQuery("इ-कमर्स")}
                    >
                      इ-कमर्स
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                    <div 
                      className="flex items-center gap-2 p-2 hover:bg-asklegal-purple/10 rounded cursor-pointer"
                      onClick={() => setSelectedDocument(MOCK_DOCUMENTS.find(doc => doc.id === "ecom-combined") || null)}
                    >
                      <FileText className="h-4 w-4 text-asklegal-purple" />
                      <span className="text-asklegal-text font-nepali">विद्युतीय व्यापार (इ-कमर्स) ऐन</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="acts" className="space-y-4">
                    {MOCK_DOCUMENTS.filter(doc => !doc.id.startsWith('ecom')).map((doc) => (
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
          </div>

          {/* Right Document Preview */}
          <div className="lg:col-span-2">
            {selectedDocument ? (
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 min-h-[842px] animate-paper-print">
                <div className="flex justify-between mb-6">
                  <h2 className="text-2xl font-bold font-nepali">{selectedDocument.title}</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(selectedDocument)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300">{selectedDocument.titleEn}</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedDocument.year}</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedDocument.ministry}</p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  {selectedDocument.id === "ecom-combined" && selectedDocument.parts ? (
                    <ScrollArea className="h-[700px] pr-4">
                      <div className="space-y-6">
                        {selectedDocument.parts.map((imagePath, index) => (
                          <div key={index} className="flex justify-center">
                            <img 
                              src={imagePath} 
                              alt={`${selectedDocument.title} - Page ${index + 1}`}
                              className="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : selectedDocument.id.startsWith('ecom') ? (
                    <div className="flex justify-center">
                      <img 
                        src={selectedDocument.pdfUrl} 
                        alt={selectedDocument.title}
                        className="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded"
                        style={{ maxHeight: '700px' }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-nepali">
                        यो {selectedDocument.title} सम्बन्धी कानून हो। यसले {selectedDocument.description} को बारेमा व्याख्या गर्दछ। 
                        यो {selectedDocument.year} सालमा जारी गरिएको थियो। यो दस्तावेज {selectedDocument.ministry} द्वारा प्रकाशित गरिएको हो।
                      </p>
                      <div className="text-center mt-20">
                        <p className="text-gray-500 dark:text-gray-400">PDF प्रिभ्यू यहाँ देखाइनेछ। यो केवल डेमो विवरण हो।</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card-glassmorphism flex items-center justify-center min-h-[842px]">
                <div className="text-center p-6">
                  <FileText className="h-16 w-16 text-asklegal-purple/70 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-asklegal-heading mb-2">Select a document to preview</h3>
                  <p className="text-asklegal-text/80 max-w-md">
                    Choose a document from the list on the left to view its contents here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default KanoonSearch;
