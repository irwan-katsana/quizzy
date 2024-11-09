import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { currentSystemPrompt, updateSystemPrompt, resetSystemPrompt } from '@/lib/openai';
import { useToast } from '@/hooks/use-toast';

export function SystemPromptEditor() {
  const [prompt, setPrompt] = useState(currentSystemPrompt);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateSystemPrompt(prompt);
    setIsOpen(false);
    toast({
      title: "System Prompt Updated",
      description: "The new prompt will be used for future questions.",
    });
  };

  const handleReset = () => {
    resetSystemPrompt();
    setPrompt(currentSystemPrompt);
    toast({
      title: "System Prompt Reset",
      description: "The default prompt has been restored.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit System Prompt</DialogTitle>
        </DialogHeader>
        <Card className="p-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}