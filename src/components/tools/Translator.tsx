
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, RotateCcw, Loader2, Languages } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

// We'll keep the mock translations as fallback when the API fails
const mockTranslations: Record<string, string> = {
  // English to Nepali
  "hello": "नमस्ते",
  "namaste": "नमस्ते",
  "hi": "नमस्ते",
  "how are you": "तपाईंलाई कस्तो छ",
  "kasto cha": "कस्तो छ",
  "k cha": "के छ",
  "what's up": "के छ",
  "i love you": "म तिमीलाई माया गर्छु",
  "timilai maya cha": "तिमीलाई माया छ",
  "thank you": "धन्यवाद",
  "dhanyabad": "धन्यवाद",
  "good morning": "शुभ प्रभात",
  "good night": "शुभ रात्री",
  "yes": "हो",
  "no": "होइन",
  "please": "कृपया",
  "sorry": "माफ गर्नुहोस्",
  "water": "पानी",
  "food": "खाना",
  "help": "मद्दत",
  "today": "आज",
  "tomorrow": "भोलि",
  "yesterday": "हिजो",
  "money": "पैसा",
  "family": "परिवार",
  "friend": "साथी",
  "house": "घर",
  "work": "काम",
  "school": "विद्यालय",
  "hospital": "अस्पताल",
  "court": "अदालत",
  "lawyer": "वकिल",
  "judge": "न्यायाधीश",
  "document": "कागजात",
  "petition": "निवेदन",
  "government": "सरकार",
  "law": "कानून",
  "rights": "अधिकार",
  "justice": "न्याय",
  "witness": "साक्षी",
  "evidence": "प्रमाण",
  "penalty": "जरिवाना",
  "verdict": "फैसला",
  
  // Nepali to English
  "नमस्ते": "Hello",
  "तपाईंलाई कस्तो छ": "How are you",
  "के छ": "What's up",
  "म तिमीलाई माया गर्छु": "I love you",
  "तिमीलाई माया छ": "I love you",
  "धन्यवाद": "Thank you",
  "शुभ प्रभात": "Good morning",
  "शुभ रात्री": "Good night",
  "हो": "Yes",
  "होइन": "No",
  "कृपया": "Please",
  "माफ गर्नुहोस्": "Sorry",
  "पानी": "Water",
  "खाना": "Food",
  "मद्दत": "Help",
  "आज": "Today",
  "भोलि": "Tomorrow",
  "हिजो": "Yesterday",
  "पैसा": "Money",
  "परिवार": "Family",
  "साथी": "Friend",
  "घर": "House",
  "काम": "Work",
  "विद्यालय": "School",
  "अस्पताल": "Hospital",
  "अदालत": "Court",
  "वकिल": "Lawyer",
  "न्यायाधीश": "Judge",
  "कागजात": "Document",
  "निवेदन": "Petition",
  "सरकार": "Government",
  "कानून": "Law",
  "अधिकार": "Rights",
  "न्याय": "Justice",
  "साक्षी": "Witness",
  "प्रमाण": "Evidence",
  "जरिवाना": "Penalty",
  "फैसला": "Verdict"
};

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<"en-to-ne" | "ne-to-en">("en-to-ne");
  const { toast } = useToast();

  // Check if text contains Devanagari script
  const containsDevanagari = (text: string): boolean => {
    const devanagariRegex = /[\u0900-\u097F]/;
    return devanagariRegex.test(text);
  };

  // Detect language and set direction automatically
  const detectLanguageAndSetDirection = (text: string) => {
    if (containsDevanagari(text)) {
      setDirection("ne-to-en");
    } else {
      setDirection("en-to-ne");
    }
  };

  // Enhanced translation function using LibreTranslate API
  const translateText = async (text: string) => {
    if (!text.trim()) {
      setOutputText("");
      return;
    }

    setIsLoading(true);
    detectLanguageAndSetDirection(text);

    try {
      // First try online translation API
      const sourceLang = direction === "en-to-ne" ? "en" : "ne";
      const targetLang = direction === "en-to-ne" ? "ne" : "en";
      
      // Using LibreTranslate public API (with fallback to our mock dictionary)
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: "text"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOutputText(data.translatedText);
      } else {
        // Fallback to our dictionary when API fails
        fallbackTranslation(text);
      }
    } catch (error) {
      console.error("Translation API error:", error);
      // Fallback to our dictionary when API fails
      fallbackTranslation(text);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback to dictionary-based translation
  const fallbackTranslation = (text: string) => {
    try {
      const processedText = text.trim().toLowerCase();
      
      // Check if we have an exact match
      if (mockTranslations[processedText]) {
        setOutputText(mockTranslations[processedText]);
      } else {
        // Try to find partial matches or word-by-word translation
        const words = processedText.split(/\s+/);
        if (words.length > 1) {
          // Try translating each word
          const translatedParts = words.map(word => {
            return mockTranslations[word] || word;
          });
          
          // If at least one word was translated, use the word-by-word translation
          if (translatedParts.some(part => part !== words[translatedParts.indexOf(part)])) {
            setOutputText(translatedParts.join(" "));
          } else {
            // Fallback message
            if (direction === "en-to-ne") {
              setOutputText("अनुवाद उपलब्ध छैन"); // Translation not available
            } else {
              setOutputText("Translation not available");
            }
          }
        } else {
          // Single word that doesn't have a translation
          if (direction === "en-to-ne") {
            setOutputText("अनुवाद उपलब्ध छैन"); // Translation not available
          } else {
            setOutputText("Translation not available");
          }
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Translation Failed",
        description: "Could not translate text. Please try again.",
      });
    }
  };

  const handleSwapLanguages = () => {
    setDirection(prev => prev === "en-to-ne" ? "ne-to-en" : "en-to-ne");
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleClearText = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <Card className="w-full bg-asklegal-dark border-asklegal-purple/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-asklegal-heading flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Nepali-English Translator
          </CardTitle>
          <div className="text-sm text-asklegal-text/70 flex items-center">
            <span>
              {direction === "en-to-ne" 
                ? "English → Nepali" 
                : "Nepali → English"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-asklegal-heading">
                {direction === "en-to-ne" ? "English / Romanized Nepali" : "नेपाली (Nepali)"}
              </label>
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={direction === "en-to-ne" ? "Type English or Romanized Nepali here..." : "यहाँ नेपाली टाइप गर्नुहोस्..."}
              className="min-h-[100px] bg-asklegal-darker border-asklegal-purple/20 placeholder:text-white/30"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapLanguages}
              className="rounded-full bg-asklegal-purple/10 border-asklegal-purple/30 hover:bg-asklegal-purple/20"
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span className="sr-only">Swap languages</span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearText}
              className="rounded-full bg-asklegal-purple/10 border-asklegal-purple/30 hover:bg-asklegal-purple/20"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Clear text</span>
            </Button>

            <Button
              onClick={() => translateText(inputText)}
              className="bg-asklegal-purple hover:bg-asklegal-accent"
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-asklegal-heading">
                {direction === "en-to-ne" ? "नेपाली (Nepali)" : "English"}
              </label>
            </div>
            <div className="min-h-[100px] p-3 bg-asklegal-darker border border-asklegal-purple/20 rounded-md">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-4 w-4 animate-spin text-asklegal-purple" />
                </div>
              ) : (
                <div className={`${direction === "ne-to-en" ? "font-sans" : "font-nepali"}`}>
                  {outputText}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Translator;
