import { type Question } from '@/lib/openai';
import { QuizQuestionCard } from './quiz-question-card';
import { Card } from '@/components/ui/card';
import { modelConfig, latestApiResponse } from '@/lib/openai';
import { Bot } from 'lucide-react';

export function QuizQuestions({ questions }: { questions: Question[] }) {
  const tokenUsage = latestApiResponse?.usage;
  
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max">
        {questions.map((question, idx) => (
          <QuizQuestionCard
            key={question.id}
            question={question}
            index={idx}
          />
        ))}
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
    </div>
  );
}