import { type Question } from '@/lib/openai';
import { QuizQuestionCard } from './quiz-question-card';

export function QuizQuestions({ questions }: { questions: Question[] }) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max">
      {questions.map((question, idx) => (
        <QuizQuestionCard
          key={question.id}
          question={question}
          index={idx}
        />
      ))}
    </div>
  );
}