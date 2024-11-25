import { useState } from 'react';
import { QuizForm } from '@/components/quiz-form';
import { QuizQuestions } from '@/components/quiz-questions';
import { AdminPage } from '@/components/admin-page';
import { type Question } from '@/lib/openai';
import { Toaster } from '@/components/ui/toaster';
import { Sparkles, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleQuestionsGenerated = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };

  const handleReset = () => {
    setQuestions([]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <header className="relative flex flex-col items-center justify-center mb-12 pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Quizzy
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium italic text-center">
            Fun AI-powered Learning, Made Personal!
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            Based on the Malaysian curriculum
          </p>
          <div className="absolute right-0 top-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <AdminPage />
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {questions.length === 0 ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizForm onQuestionsGenerated={handleQuestionsGenerated} />
              </motion.div>
            ) : (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizQuestions 
                  questions={questions} 
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;