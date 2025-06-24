
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
    ],
    content: `विद्युतीय व्यापार (इ-कमर्स) ऐन, २०६१

प्रस्तावना
नेपालमा विद्युतीय व्यापारको विकास र विस्तारलाई प्रोत्साहन गर्न र यसको नियमन गर्नका लागि आवश्यक व्यवस्था मिलाउन बनेको ऐन ।

दफा १. संक्षिप्त नाम र प्रारम्भ:
(१) यस ऐनको नाम "विद्युतीय व्यापार (इ-कमर्स) ऐन, २०६१" रहेको छ ।
(२) यो ऐन तुरुन्त प्रारम्भ हुनेछ ।

दफा २. परिभाषा:
यस ऐनमा प्रसङ्गले अर्को अर्थ नलागेमा,-
(क) "विद्युतीय व्यापार" भन्नाले कम्प्युटर नेटवर्कको माध्यमबाट वस्तु वा सेवाको खरिद बिक्री गर्ने कार्यलाई सम्झनुपर्छ ।
(ख) "विद्युतीय हस्ताक्षर" भन्नाले विद्युतीय रूपमा उत्पादन गरिएको डाटा जुन कुनै विद्युतीय रेकर्डसँग संलग्न वा तार्किक रूपमा सम्बद्ध हुन्छ र जुन हस्ताक्षरकर्ताको पहिचान गर्न प्रयोग गरिन्छ ।

दफा ३. विद्युतीय हस्ताक्षरको मान्यता:
(१) कुनै विद्युतीय हस्ताक्षर कानुनी दृष्टिले मान्य हुनेछ यदि त्यसले निम्न शर्तहरू पूरा गर्छ:
(क) त्यो हस्ताक्षरकर्ताको नियन्त्रणमा छ
(ख) त्यसले हस्ताक्षरकर्ताको पहिचान गर्न सक्छ
(ग) त्यो सम्बन्धित कागजातसँग जोडिएको छ

दफा ४. विद्युतीय रेकर्डको कानुनी मान्यता:
कुनै पनि विद्युतीय रेकर्ड कानुनी प्रमाणको रूपमा मान्य हुनेछ ।`
  },

  {
    id: "adhikar-durupayog",
    title: "अख्तियार दुरुपयोग अनुसन्धान आयोग ऐन",
    titleEn: "Commission for the Investigation of Abuse of Authority Act",
    description: "अख्तियार दुरुपयोग अनुसन्धान आयोग सम्बन्धी कानुन",
    category: "constitutional",
    year: "2048",
    ministry: "कानुन, न्याय तथा संसदीय मामिला मन्त्रालय",
    pdfUrl: "/docs/adhikar-durupayog.pdf",
    fileSize: "3.2 MB",
    pages: 45,
    isPopular: true,
    content: `अख्तियार दुरुपयोग अनुसन्धान आयोग ऐन, २०४८

प्रस्तावना
अख्तियार दुरुपयोग अनुसन्धान आयोगको काम, कर्तव्य, अधिकार र कार्यविधिको सम्बन्धमा व्यवस्था गर्न बनेको ऐन ।

दफा १. संक्षिप्त नाम र प्रारम्भ:
(१) यस ऐनको नाम "अख्तियार दुरुपयोग अनुसन्धान आयोग ऐन, २०४८" रहेको छ ।
(२) यो ऐन २०४८ सालको चैत्र १ गतेदेखि लागू हुनेछ ।

दफा २. परिभाषा:
यस ऐनमा प्रसङ्गले अर्को अर्थ नलागेमा,-
(क) "आयोग" भन्नाले अख्तियार दुरुपयोग अनुसन्धान आयोगलाई सम्झनुपर्छ ।
(ख) "अख्तियारको दुरुपयोग" भन्नाले कुनै पदाधिकारीले आफ्नो पदको अख्तियारको दुरुपयोग गरी भ्रष्टाचार गरेको वा गराएको कार्यलाई सम्झनुपर्छ ।

दफा ३. आयोगको स्थापना:
(१) यस ऐन बमोजिम अख्तियार दुरुपयोग अनुसन्धान आयोग स्थापना गरिएको छ ।
(२) आयोगको मुख्यालय काठमाडौंमा रहनेछ ।

दफा ४. आयोगको संरचना:
(१) आयोगमा एक प्रमुख आयुक्त र दुई आयुक्त रहनेछन् ।
(२) प्रमुख आयुक्त र आयुक्तहरूको नियुक्ति संविधान बमोजिम हुनेछ ।`
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
