import { useState, useEffect, useRef } from 'react';
import { type Question } from '@/lib/openai';
import { QuizQuestionCard } from './quiz-question-card';
import { Card } from '@/components/ui/card';
import { modelConfig, latestApiResponse } from '@/lib/openai';
import { Bot } from 'lucide-react';
import { CongratulationsDialog } from './congratulations-dialog';
import { Progress } from '@/components/ui/progress';

interface QuizQuestionsProps {
  questions: Question[];
  onReset: () => void;
}

export function QuizQuestions({ questions, onReset }: QuizQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [showCongratulations, setShowCongratulations] = useState(false);
  const tokenUsage = latestApiResponse?.usage;
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  // Auto-scroll when component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleQuestionAnswered = (questionId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => new Set([...prev, questionId]));
    }
    
    // Wait a bit before moving to next question for better UX
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowCongratulations(true);
      }
    }, 1500);
  };

  const handleDialogClose = () => {
    setShowCongratulations(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(new Set());
    onReset();
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{correctAnswers.size} correct</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="min-h-[400px]">
        <QuizQuestionCard
          key={questions[currentQuestionIndex].id}
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex}
          onAnswered={(isCorrect) => handleQuestionAnswered(questions[currentQuestionIndex].id, isCorrect)}
        />
      </div>
      
      <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 dark:bg-gray-900/80">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Bot className="h-4 w-4 text-purple-500" />
          <span className="font-medium">AI Provider:</span>
          <span className="text-purple-600 dark:text-purple-400 capitalize">{modelConfig.provider}</span>
          <span className="font-medium ml-4">Model:</span>
          <span className="text-purple-600 dark:text-purple-400">{modelConfig.model}</span>
          {tokenUsage && (
            <>
              <span className="font-medium ml-4">Tokens Used:</span>
              <span className="text-purple-600 dark:text-purple-400">
                {tokenUsage.total_tokens.toLocaleString()} 
                ({tokenUsage.prompt_tokens.toLocaleString()} prompt + {tokenUsage.completion_tokens.toLocaleString()} completion)
              </span>
            </>
          )}
        </div>
      </Card>

      <CongratulationsDialog
        isOpen={showCongratulations}
        onClose={handleDialogClose}
        score={correctAnswers.size}
        totalQuestions={questions.length}
      />
    </div>
  );
}