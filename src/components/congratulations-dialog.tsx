import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles } from 'lucide-react';

interface CongratulationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
}

export function CongratulationsDialog({
  isOpen,
  onClose,
  score,
  totalQuestions,
}: CongratulationsDialogProps) {
  const fireConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#FFA500'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#9333EA', '#3B82F6'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FF1493', '#9333EA'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#3B82F6', '#FFD700'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#9333EA', '#FF1493'],
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      fireConfetti();
    }
  }, [isOpen, fireConfetti]);

  const percentage = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! You're Amazing! 🌟";
    if (percentage >= 80) return "Excellent Work! Keep it up! 🎉";
    if (percentage >= 60) return "Good Job! You're Learning! 👏";
    return "Keep Practicing! You've Got This! 💪";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Congratulations!
          </DialogTitle>
          <DialogDescription className="text-center pt-4 space-y-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {score} / {totalQuestions}
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {getMessage()}
            </p>
            <div className="py-4">
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate More Questions
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}