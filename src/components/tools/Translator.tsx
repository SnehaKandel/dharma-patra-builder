
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock translations for demo purposes (until API is connected)
const mockTranslations: Record<string, string> = {
  "namaste": "नमस्ते",
  "kasto cha": "कस्तो छ",
  "k cha": "के छ",
  "timilai maya cha": "तिमीलाई माया छ",
  "dhanyabad": "धन्यवाद",
  "माया": "Love",
  "नमस्ते": "Hello",
  "के छ": "What's up",
  "तिमीलाई माया छ": "I love you",
  "धन्यवाद": "Thank you"
};

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<"en-to-ne" | "ne-to-en">("en-to-ne");
  const { toast } = useToast();

  // Debounced translation effect
  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      return;
    }

    const timer = setTimeout(() => {
      translateText(inputText);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputText, direction]);

  const translateText = (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    
    // Mock API call (replace with actual API integration)
    setTimeout(() => {
      try {
        // Check if we have a mock translation
        const lowerText = text.toLowerCase();
        if (mockTranslations[lowerText]) {
          setOutputText(mockTranslations[lowerText]);
        } else {
          // For words we don't have in our mock database
          if (direction === "en-to-ne") {
            // Add some Devanagari characters as placeholder
            setOutputText("मोक ट्रान्सलेसन");
          } else {
            // Add English text as placeholder
            setOutputText("Mock translation");
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Translation Failed",
          description: "Could not translate text. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }, 500);
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
          <CardTitle className="text-asklegal-heading">Nepali-English Translator</CardTitle>
          <Tabs defaultValue="auto" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="auto">Auto</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="auto">
              <div className="text-xs text-asklegal-text/70 mt-1">
                Auto-translating as you type...
              </div>
            </TabsContent>
            <TabsContent value="manual">
              <div className="text-xs text-asklegal-text/70 mt-1">
                Click translate button when ready
              </div>
            </TabsContent>
          </Tabs>
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
              disabled={isLoading}
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
                <div className={`font-${direction === "ne-to-en" ? "sans" : "nepali"}`}>
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
