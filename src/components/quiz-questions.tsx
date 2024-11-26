import { useState } from 'react';
import { type Question } from '@/lib/openai';
import { QuizQuestionCard } from './quiz-question-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { modelConfig, latestApiResponse } from '@/lib/openai';
import { Bot, Home } from 'lucide-react';
import { CongratulationsDialog } from './congratulations-dialog';
import { motion } from 'framer-motion';

interface QuizQuestionsProps {
  questions: Question[];
  onReset: () => void;
}

export function QuizQuestions({ questions, onReset }: QuizQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [showCongratulations, setShowCongratulations] = useState(false);
  const tokenUsage = latestApiResponse?.usage;
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleQuestionAnswered = (questionId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => new Set([...prev, questionId]));
    }
    
    // Wait longer before moving to next question for better UX
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowCongratulations(true);
      }
    }, 2000);
  };

  const handleDialogClose = () => {
    setShowCongratulations(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(new Set());
    onReset();
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Start
        </Button>
        <div className="text-sm font-medium text-green-600 dark:text-green-400">
          {correctAnswers.size} correct
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[length:20px_20px] bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        
        {/* Progress Fill */}
        <motion.div
          className="absolute h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ 
            boxShadow: '0 0 10px rgba(147, 51, 234, 0.3)',
            willChange: 'width'
          }}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
          style={{ 
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }} 
        />
      </div>

      {/* Question Counter */}
      <div className="text-sm font-medium text-purple-600 dark:text-purple-400 text-center">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>

      <div className="min-h-[400px]">
        <QuizQuestionCard
          key={questions[currentQuestionIndex].id}
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex}
          onAnswered={(isCorrect) => handleQuestionAnswered(questions[currentQuestionIndex].id, isCorrect)}
        />
      </div>

      {/* AI Usage Info */}
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