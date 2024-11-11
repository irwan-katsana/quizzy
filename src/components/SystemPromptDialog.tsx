import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { currentSystemPrompt, updateSystemPrompt, resetSystemPrompt } from '@/lib/openai';

export function SystemPromptDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState(currentSystemPrompt);

  const handleUpdate = () => {
    updateSystemPrompt(prompt);
    setIsOpen(false);
  };

  const handleReset = () => {
    resetSystemPrompt();
    setPrompt(currentSystemPrompt);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit System Prompt</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit System Prompt</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-[300px]"
          />
          <div className="flex gap-2">
            <Button onClick={handleUpdate}>Update</Button>
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}