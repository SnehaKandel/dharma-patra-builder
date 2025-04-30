
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, ArrowRight, BookOpen } from 'lucide-react';
import { QuizState } from '@/types/quiz';
import { quizService } from '@/services/quiz';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResult from '@/components/quiz/QuizResult';

const Play = () => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  
  const startQuiz = () => {
    const newQuizState = quizService.startNewQuiz(5); // 5 questions
    setQuizState(newQuizState);
    setIsStarted(true);
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    if (!quizState) return;
    
    const updatedAnswers = [...quizState.selectedAnswers];
    updatedAnswers[quizState.currentQuestionIndex] = optionIndex;
    
    setQuizState({
      ...quizState,
      selectedAnswers: updatedAnswers
    });
  };
  
  const handleNextQuestion = () => {
    if (!quizState) return;
    
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex + 1
      });
    } else {
      // Quiz finished
      const calculatedScore = quizService.calculateScore(quizState);
      setScore(calculatedScore);
      setQuizState({
        ...quizState,
        isQuizComplete: true
      });
    }
  };
  
  const handleRetry = () => {
    startQuiz();
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const currentQuestion = quizState?.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState ? quizState.currentQuestionIndex === quizState.questions.length - 1 : false;
  const isAnswerSelected = quizState ? quizState.selectedAnswers[quizState.currentQuestionIndex] !== null : false;
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {!isStarted ? (
            <Card className="card-glassmorphism overflow-hidden animate-fade-in">
              <CardContent className="p-8">
                <div className="text-center">
                  <PlayCircle size={80} className="text-asklegal-purple mx-auto mb-6" />
                  <h1 className="text-3xl font-bold text-asklegal-heading theme-transition mb-4">कानूनी क्विज खेल्नुहोस्</h1>
                  <p className="text-asklegal-text/70 theme-transition mb-8 max-w-lg mx-auto">
                    यस क्विजमा तपाईंले नेपालको संविधान, फौजदारी कानून, देवानी कानून, न्यायपालिका, र अधिकार सम्बन्धी प्रश्नहरू पाउनुहुनेछ। तपाईंको कानूनी ज्ञान परीक्षण गर्नुहोस्!
                  </p>
                  
                  <div className="flex justify-center gap-4 flex-wrap">
                    <Button 
                      onClick={startQuiz}
                      className="bg-asklegal-purple hover:bg-asklegal-purple/90 text-white px-8 btn-animated"
                    >
                      क्विज सुरु गर्नुहोस्
                    </Button>
                    <Button 
                      onClick={() => navigate('/kanoon-search')}
                      variant="outline"
                      className="border-asklegal-purple/50 text-asklegal-text hover:bg-asklegal-purple/10 theme-transition"
                    >
                      <BookOpen size={18} className="mr-2" /> कानून अध्ययन गर्नुहोस्
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : quizState && !quizState.isQuizComplete ? (
            <Card className="card-glassmorphism overflow-hidden animate-fade-in">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-asklegal-heading theme-transition">कानूनी क्विज</h2>
                  <div className="text-asklegal-text/60 theme-transition">
                    प्रश्न {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                  <div 
                    className="h-full bg-asklegal-purple rounded-full transition-all duration-300"
                    style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` }}
                  ></div>
                </div>
                
                {currentQuestion && (
                  <QuizQuestion 
                    question={currentQuestion}
                    selectedOption={quizState.selectedAnswers[quizState.currentQuestionIndex]}
                    onSelect={handleOptionSelect}
                  />
                )}
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!isAnswerSelected}
                    className="bg-asklegal-purple hover:bg-asklegal-purple/90 text-white px-6"
                  >
                    {isLastQuestion ? 'परिणाम हेर्नुहोस्' : 'अर्को प्रश्न'} 
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : quizState && quizState.isQuizComplete ? (
            <Card className="card-glassmorphism overflow-hidden animate-fade-in">
              <CardContent className="p-8">
                <QuizResult 
                  state={quizState}
                  score={score}
                  onRetry={handleRetry}
                  onGoHome={handleGoHome}
                />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
};

export default Play;
