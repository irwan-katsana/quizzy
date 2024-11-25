import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { type Question } from '@/lib/openai';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestionCardProps {
  question: Question;
  index: number;
  onAnswered: (isCorrect: boolean) => void;
}

export function QuizQuestionCard({ question, index, onAnswered }: QuizQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      onAnswered(isCorrect);
    }
  };

  return (
    <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 dark:bg-gray-900/80">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Question {index + 1}
          </h3>
          {isSubmitted && (
            isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-green-500 animate-bounce" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )
          )}
        </div>
        
        <p className="text-lg text-gray-700 dark:text-gray-300">{question.question}</p>
        
        <div className="space-y-4">
          {question.options.map((option, optIdx) => (
            <div
              key={optIdx}
              className={cn(
                "relative flex items-center",
                "rounded-lg border-2 p-4 cursor-pointer transition-all",
                !isSubmitted && "hover:bg-purple-50 dark:hover:bg-purple-900/20",
                selectedAnswer === option && !isSubmitted && "border-purple-400 bg-purple-50 dark:bg-purple-900/20",
                isSubmitted && option === question.correctAnswer && "border-green-400 bg-green-50 dark:bg-green-900/20",
                isSubmitted && selectedAnswer === option && option !== question.correctAnswer && "border-red-400 bg-red-50 dark:bg-red-900/20",
                isSubmitted && option !== selectedAnswer && option !== question.correctAnswer && "opacity-50"
              )}
              onClick={() => !isSubmitted && setSelectedAnswer(option)}
            >
              <div className="flex items-center flex-1">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 mr-4",
                    selectedAnswer === option && !isSubmitted && "border-purple-500 bg-purple-500",
                    isSubmitted && option === question.correctAnswer && "border-green-500 bg-green-500",
                    isSubmitted && selectedAnswer === option && option !== question.correctAnswer && "border-red-500 bg-red-500",
                  )}
                />
                <Label className={cn(
                  "flex-1 cursor-pointer text-base",
                  isSubmitted && option === question.correctAnswer && "text-green-700 dark:text-green-300 font-medium",
                  isSubmitted && selectedAnswer === option && option !== question.correctAnswer && "text-red-700 dark:text-red-300"
                )}>
                  {option}
                </Label>
              </div>
            </div>
          ))}
        </div>

        {!isSubmitted && (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full mt-4 text-base py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            size="lg"
          >
            Submit Answer
          </Button>
        )}

        {isSubmitted && (
          <div className={cn(
            "mt-4 p-4 rounded-lg border-2",
            isCorrect 
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          )}>
            <p className="text-base font-medium">
              {isCorrect ? (
                <span className="text-green-700 dark:text-green-300">
                  ✨ Amazing! You got it right! ⭐️
                </span>
              ) : (
                <span className="text-red-700 dark:text-red-300">
                  Don't worry! The correct answer is: {question.correctAnswer}
                </span>
              )}
            </p>
            {question.explanation && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {question.explanation}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}