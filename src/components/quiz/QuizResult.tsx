
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
          Quiz Results
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
            <p className="text-green-600 dark:text-green-400">Excellent! Your legal knowledge is outstanding.</p>
          ) : percentage >= 60 ? (
            <p className="text-asklegal-purple">Good effort! Your legal knowledge is solid.</p>
          ) : (
            <p className="text-amber-600 dark:text-amber-400">Your score shows room for improvement.</p>
          )}
        </div>
      </div>
      
      <div className="space-y-8 mb-6">
        <h3 className="text-xl font-medium text-asklegal-heading theme-transition">
          Questions and Answers
        </h3>
        
        {state.questions.map((question, index) => (
          <div key={question.id} className="p-4 border border-asklegal-form-border/30 rounded-lg animate-fade-in">
            <div className="mb-2 text-sm text-asklegal-text/60 theme-transition">
              Question {index + 1} / {state.questions.length}
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
          Try Again
        </Button>
        <Button onClick={onGoHome} className="bg-asklegal-purple hover:bg-asklegal-purple/90 text-white">
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
