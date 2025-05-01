
import { LegalDocument } from "@/types/forms";

// Mock data for demonstration
export const MOCK_DOCUMENTS: LegalDocument[] = [
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
    title: "मानव अधिकार",
    titleEn: "Manav Adhikar",
    description: "राष्ट्रिय मानव अधिकार आयोग ऐन",
    category: "Acts",
    year: "2068",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/manav-adhikar.pdf",
    isPopular: true
  }
];
