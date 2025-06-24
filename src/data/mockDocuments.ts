
import { LegalDocument } from "@/types/forms";

// Mock data for demonstration
export const MOCK_DOCUMENTS: LegalDocument[] = [
  // E-commerce Laws
  {
    id: "ecom-combined",
    title: "विद्युतीय व्यापार (इ-कमर्स) ऐन",
    titleEn: "Electronic Commerce Act",
    description: "विद्युतीय व्यापार (इ-कमर्स) को सम्बन्धमा व्यवस्था गर्न बनेको ऐन",
    category: "ecommerce",
    year: "2061",
    ministry: "उद्योग, वाणिज्य तथा आपूर्ति मन्त्रालय",
    pdfUrl: "public/lovable-uploads/b03bbdd5-6db3-4a51-9d7a-da1d9c37e131.png",
    fileSize: "2.5 MB",
    pages: 7,
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
  
  // Civil Laws
  {
    id: "civil-code",
    title: "नागरिक संहिता",
    titleEn: "Civil Code",
    description: "नेपालको नागरिक कानुनको मुख्य संहिता",
    category: "civil",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/civil-code.pdf",
    fileSize: "5.2 MB",
    pages: 156,
    isPopular: true
  },
  {
    id: "civil-procedure",
    title: "दीवानी कार्यविधि संहिता",
    titleEn: "Civil Procedure Code",
    description: "दीवानी अदालती कार्यविधि सम्बन्धी कानुन",
    category: "civil",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/civil-procedure.pdf",
    fileSize: "3.8 MB",
    pages: 98,
    isPopular: true
  },

  // Criminal Laws
  {
    id: "criminal-code",
    title: "फौजदारी संहिता",
    titleEn: "Criminal Code",
    description: "नेपालको फौजदारी कानुनको मुख्य संहिता",
    category: "criminal",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/criminal-code.pdf",
    fileSize: "4.7 MB",
    pages: 134,
    isPopular: true
  },
  {
    id: "criminal-procedure",
    title: "फौजदारी कार्यविधि संहिता",
    titleEn: "Criminal Procedure Code",
    description: "फौजदारी अदालती कार्यविधि सम्बन्धी कानुन",
    category: "criminal",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/criminal-procedure.pdf",
    fileSize: "3.2 MB",
    pages: 87,
    isPopular: true
  },

  // Constitutional Laws
  {
    id: "constitution",
    title: "नेपालको संविधान",
    titleEn: "Constitution of Nepal",
    description: "नेपालको मुख्य संविधान",
    category: "constitutional",
    year: "2072",
    ministry: "संविधान सभा सचिवालय",
    pdfUrl: "/docs/constitution.pdf",
    fileSize: "6.8 MB",
    pages: 308,
    isPopular: true
  },

  // Commercial Laws
  {
    id: "company-act",
    title: "कम्पनी ऐन",
    titleEn: "Company Act",
    description: "कम्पनी दर्ता र सञ्चालन सम्बन्धी कानुन",
    category: "commercial",
    year: "2063",
    ministry: "उद्योग, वाणिज्य तथा आपूर्ति मन्त्रालय",
    pdfUrl: "/docs/company-act.pdf",
    fileSize: "2.9 MB",
    pages: 76,
    isPopular: true
  },
  {
    id: "banking-act",
    title: "बैंक तथा वित्तीय संस्था ऐन",
    titleEn: "Banking and Financial Institution Act",
    description: "बैंक र वित्तीय संस्था सम्बन्धी कानुन",
    category: "commercial",
    year: "2073",
    ministry: "अर्थ मन्त्रालय",
    pdfUrl: "/docs/banking-act.pdf",
    fileSize: "4.1 MB",
    pages: 112,
    isPopular: true
  },

  // Labor Laws
  {
    id: "labor-act",
    title: "श्रम ऐन",
    titleEn: "Labor Act",
    description: "श्रमिक र रोजगारदाता सम्बन्धी कानुन",
    category: "labor",
    year: "2074",
    ministry: "श्रम, रोजगार तथा सामाजिक सुरक्षा मन्त्रालय",
    pdfUrl: "/docs/labor-act.pdf",
    fileSize: "3.5 MB",
    pages: 95,
    isPopular: true
  },

  // Family Laws
  {
    id: "family-law",
    title: "पारिवारिक कानुन",
    titleEn: "Family Law",
    description: "विवाह, सम्बन्धविच्छेद र पारिवारिक सम्बन्धी कानुन",
    category: "family",
    year: "2074",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/family-law.pdf",
    fileSize: "2.1 MB",
    pages: 58,
    isPopular: false
  },

  // Property Laws
  {
    id: "land-act",
    title: "भूमि ऐन",
    titleEn: "Land Act",
    description: "जग्गा जमिन सम्बन्धी कानुन",
    category: "property",
    year: "2021",
    ministry: "भूमि व्यवस्था, सहकारी तथा गरिबी निवारण मन्त्रालय",
    pdfUrl: "/docs/land-act.pdf",
    fileSize: "4.3 MB",
    pages: 118,
    isPopular: true
  },

  // Tax Laws
  {
    id: "income-tax-act",
    title: "आयकर ऐन",
    titleEn: "Income Tax Act",
    description: "आयकर सम्बन्धी कानुन",
    category: "tax",
    year: "2058",
    ministry: "अर्थ मन्त्रालय",
    pdfUrl: "/docs/income-tax-act.pdf",
    fileSize: "3.7 MB",
    pages: 89,
    isPopular: true
  },

  // Environment Laws
  {
    id: "environment-act",
    title: "वातावरण संरक्षण ऐन",
    titleEn: "Environment Protection Act",
    description: "वातावरण संरक्षण सम्बन्धी कानुन",
    category: "environment",
    year: "2076",
    ministry: "वन तथा वातावरण मन्त्रालय",
    pdfUrl: "/docs/environment-act.pdf",
    fileSize: "2.8 MB",
    pages: 67,
    isPopular: false
  }
];
