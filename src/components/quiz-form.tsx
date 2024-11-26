import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { generateQuestions, type Question } from '@/lib/openai';
import { Loader2, Sparkles, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTopics, getRandomTopics } from '@/lib/subjects';

const STANDARDS = ['1', '2', '3', '4', '5', '6'];
const SUBJECTS = ['Math', 'Science'];

export function QuizForm({ onQuestionsGenerated }: { onQuestionsGenerated: (questions: Question[]) => void }) {
  const [standard, setStandard] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [subTopic, setSubTopic] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update suggested topics when standard or subject changes
  useEffect(() => {
    if (standard && subject) {
      setSuggestedTopics(getRandomTopics(subject, standard));
    } else {
      setSuggestedTopics([]);
    }
  }, [standard, subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!standard || !subject) {
      toast({
        title: "Missing Information",
        description: "Please select both standard and subject.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const questions = await generateQuestions(standard, subject, subTopic, 10);
      onQuestionsGenerated(questions);
      toast({
        title: "✨ Success!",
        description: "10 fun questions generated for you!",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to generate questions. Let's try again!",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const availableTopics = standard && subject ? getTopics(subject, standard) : [];

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 dark:bg-gray-900/80 shadow-xl">
      <div className="relative flex flex-col items-center">
        <span className="absolute -top-3 right-0 text-[10px] text-gray-400 dark:text-gray-500">v0.3.1</span>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Quiz Generator
          </h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="standard" className="text-purple-700 dark:text-purple-300">Standard</Label>
          <Select value={standard} onValueChange={setStandard}>
            <SelectTrigger id="standard" className="border-2 border-purple-100 dark:border-purple-900">
              <SelectValue placeholder="Select standard" />
            </SelectTrigger>
            <SelectContent>
              {STANDARDS.map((std) => (
                <SelectItem key={std} value={std}>
                  Standard {std}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-purple-700 dark:text-purple-300">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject" className="border-2 border-purple-100 dark:border-purple-900">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((subj) => (
                <SelectItem key={subj} value={subj}>
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="subtopic" className="text-purple-700 dark:text-purple-300">
              Sub-topic (Optional)
            </Label>
            {availableTopics.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Available Topics:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {availableTopics.map((topic, index) => (
                        <li key={index} className="text-sm">
                          <button
                            type="button"
                            className="text-left hover:text-purple-600 dark:hover:text-purple-400"
                            onClick={() => setSubTopic(topic)}
                          >
                            {topic}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <Input
            id="subtopic"
            value={subTopic}
            onChange={(e) => setSubTopic(e.target.value)}
            placeholder={suggestedTopics.length > 0 ? `Try: ${suggestedTopics.join(' • ')}` : "E.g., Fractions, Verbs, Plants..."}
            className="border-2 border-purple-100 dark:border-purple-900"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Fun Questions...
            </>
          ) : (
            'Generate 10 Questions'
          )}
        </Button>
      </form>
    </Card>
  );
}