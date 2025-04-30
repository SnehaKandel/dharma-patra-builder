
import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "नेपालको संविधानको धारा १५ ले के प्रत्याभूत गर्छ?",
    options: [
      "समानताको अधिकार",
      "गोपनीयताको अधिकार",
      "हतियार राख्ने अधिकार",
      "अभिव्यक्ति स्वतन्त्रताको अधिकार"
    ],
    correctAnswer: 0, // Index 0 - समानताको अधिकार
    explanation: "नेपालको संविधानको धारा १५ ले सबै नागरिकलाई समानताको अधिकार प्रदान गर्दछ।",
    topic: "Constitution"
  },
  {
    id: "q2",
    question: "नेपालमा सर्वोच्च अदालतको मुख्य न्यायाधीशको कार्यकाल कति वर्षको हुन्छ?",
    options: [
      "३ वर्ष",
      "४ वर्ष",
      "५ वर्ष",
      "६ वर्ष"
    ],
    correctAnswer: 2, // Index 2 - ५ वर्ष
    explanation: "नेपालमा सर्वोच्च अदालतका प्रधान न्यायाधीशको कार्यकाल ५ वर्षको हुन्छ।",
    topic: "Judiciary"
  },
  {
    id: "q3",
    question: "नेपालको फौजदारी कानून अनुसार, निम्न मध्ये कुन अपराध हो?",
    options: [
      "करारको उल्लङ्घन",
      "सम्पत्तिको विवाद",
      "चोरी",
      "सम्पत्ति बाँडफाँट"
    ],
    correctAnswer: 2, // Index 2 - चोरी
    explanation: "चोरी फौजदारी कानून अन्तर्गत अपराध हो, जबकि अन्य विकल्पहरू देवानी कानूनसँग सम्बन्धित छन्।",
    topic: "Criminal Law"
  },
  {
    id: "q4",
    question: "नेपालमा वैवाहिक विच्छेद सम्बन्धी मुद्दा कुन कानून अन्तर्गत पर्छ?",
    options: [
      "फौजदारी कानून",
      "देवानी कानून",
      "संवैधानिक कानून",
      "अन्तर्राष्ट्रिय कानून"
    ],
    correctAnswer: 1, // Index 1 - देवानी कानून
    explanation: "वैवाहिक विच्छेद सम्बन्धी मुद्दाहरू देवानी कानून अन्तर्गत पर्दछन्।",
    topic: "Civil Law"
  },
  {
    id: "q5",
    question: "नेपालको संविधानमा मौलिक हकहरू कति वटा छन्?",
    options: [
      "२७",
      "३०",
      "३१",
      "३३"
    ],
    correctAnswer: 2, // Index 2 - ३१
    explanation: "नेपालको संविधानमा ३१ वटा मौलिक हकहरू छन्।",
    topic: "Rights"
  },
  {
    id: "q6",
    question: "नेपालको न्याय प्रणालीमा कुन अदालत सबैभन्दा माथिल्लो हो?",
    options: [
      "जिल्ला अदालत",
      "उच्च अदालत",
      "सर्वोच्च अदालत",
      "संवैधानिक इजलास"
    ],
    correctAnswer: 2, // Index 2 - सर्वोच्च अदालत
    explanation: "नेपालको न्याय प्रणालीमा सर्वोच्च अदालत सबैभन्दा माथिल्लो अदालत हो।",
    topic: "Judiciary"
  },
  {
    id: "q7",
    question: "नेपालको संविधान अनुसार, राष्ट्रपति र उपराष्ट्रपति कुन दलबाट हुनुपर्छ?",
    options: [
      "एउटै दलबाट हुनुपर्छ",
      "फरक-फरक दलबाट हुनुपर्छ",
      "राष्ट्रपति निर्दलीय हुनुपर्छ",
      "कुनै प्रावधान छैन"
    ],
    correctAnswer: 1, // Index 1 - फरक-फरक दलबाट हुनुपर्छ
    explanation: "नेपालको संविधान अनुसार, राष्ट्रपति र उपराष्ट्रपति फरक-फरक लिङ्ग वा समुदायको हुनुपर्ने र फरक-फरक दलबाट हुनुपर्छ।",
    topic: "Constitution"
  },
  {
    id: "q8",
    question: "नेपालमा ज्यान मार्ने अपराधमा अधिकतम के सजाय हुन्छ?",
    options: [
      "१० वर्ष कैद",
      "जन्मकैद",
      "जन्मकैद र सम्पूर्ण सम्पत्ति जफत",
      "मृत्युदण्ड"
    ],
    correctAnswer: 1, // Index 1 - जन्मकैद
    explanation: "नेपालमा ज्यान मार्ने अपराधमा अधिकतम जन्मकैद हुन सक्छ, मृत्युदण्डको प्रावधान छैन।",
    topic: "Criminal Law"
  },
  {
    id: "q9",
    question: "नेपालको संविधानमा कति वटा अनुसूचीहरू छन्?",
    options: [
      "७",
      "८",
      "९",
      "१०"
    ],
    correctAnswer: 2, // Index 2 - ९
    explanation: "नेपालको संविधानमा ९ वटा अनुसूचीहरू छन्।",
    topic: "Constitution"
  },
  {
    id: "q10",
    question: "नेपालमा देवानी मुद्दामा पुनरावेदन गर्ने म्याद कति दिनको हुन्छ?",
    options: [
      "३० दिन",
      "३५ दिन",
      "४५ दिन",
      "७० दिन"
    ],
    correctAnswer: 2, // Index 2 - ४५ दिन
    explanation: "नेपालमा देवानी मुद्दामा फैसला भएको मितिले ४५ दिनभित्र पुनरावेदन गर्नुपर्छ।",
    topic: "Civil Law"
  },
  {
    id: "q11",
    question: "संविधानको व्याख्या गर्ने अधिकार कुन निकायमा निहित छ?",
    options: [
      "महान्यायाधिवक्ता",
      "राष्ट्रपति",
      "प्रधानमन्त्री",
      "सर्वोच्च अदालत"
    ],
    correctAnswer: 3, // Index 3 - सर्वोच्च अदालत
    explanation: "संविधानको व्याख्या गर्ने अधिकार सर्वोच्च अदालतमा निहित छ।",
    topic: "Constitution"
  },
  {
    id: "q12",
    question: "नेपालको सर्वोच्च अदालतमा कति न्यायाधीशहरु हुन्छन्?",
    options: [
      "११",
      "१५",
      "२०",
      "२५"
    ],
    correctAnswer: 1, // Index 1 - १५
    explanation: "नेपालको सर्वोच्च अदालतमा प्रधान न्यायाधीश सहित बढीमा १५ जना न्यायाधीश हुन्छन्।",
    topic: "Judiciary"
  }
];

// Function to get random questions
export const getRandomQuestions = (count: number = 5): QuizQuestion[] => {
  // Shuffle the array using Fisher-Yates algorithm
  const shuffled = [...quizQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first 'count' questions
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
