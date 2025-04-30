
import { Button } from "@/components/ui/button";
import { QuizState, QuizQuestion as QuizQuestionType } from "@/types/quiz";
import QuizQuestionComponent from "./QuizQuestion";

interface QuizResultProps {
  state: QuizState;
  score: number;
  onRetry: () => void;
  onGoHome: () => void;
}

const QuizResult = ({ state, score, onRetry, onGoHome }: QuizResultProps) => {
  const percentage = Math.round((score / state.questions.length) * 100);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-asklegal-heading theme-transition mb-2">
          क्विज परिणाम
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="text-3xl font-bold text-asklegal-purple">
            {score}/{state.questions.length}
          </div>
          <div className="text-lg text-asklegal-text/70 theme-transition">
            ({percentage}%)
          </div>
        </div>
        
        <div className="mt-4">
          {percentage >= 80 ? (
            <p className="text-green-600 dark:text-green-400">उत्कृष्ट! तपाईंको कानूनी ज्ञान अत्यन्त राम्रो छ।</p>
          ) : percentage >= 60 ? (
            <p className="text-asklegal-purple">राम्रो प्रयास! तपाईंको कानूनी ज्ञान राम्रो छ।</p>
          ) : (
            <p className="text-amber-600 dark:text-amber-400">अझै अभ्यास गर्नुहोस्। तपाईं निश्चित रूपमा सुधार गर्न सक्नुहुन्छ।</p>
          )}
        </div>
      </div>
      
      <div className="space-y-8 mb-6">
        <h3 className="text-xl font-medium text-asklegal-heading theme-transition">
          प्रश्न र उत्तरहरू
        </h3>
        
        {state.questions.map((question, index) => (
          <div key={question.id} className="p-4 border border-asklegal-form-border/30 rounded-lg">
            <div className="mb-2 text-sm text-asklegal-text/60 theme-transition">
              प्रश्न {index + 1} / {state.questions.length}
            </div>
            <QuizQuestionComponent 
              question={question}
              selectedOption={state.selectedAnswers[index]}
              onSelect={() => {}} // No action needed in results view
              showCorrectAnswer={true}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button onClick={onRetry} variant="outline" className="border-asklegal-purple text-asklegal-purple">
          फेरि प्रयास गर्नुहोस्
        </Button>
        <Button onClick={onGoHome} className="bg-asklegal-purple hover:bg-asklegal-purple/90 text-white">
          होम पृष्ठमा जानुहोस्
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
