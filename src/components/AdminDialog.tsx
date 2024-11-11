import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Settings } from 'lucide-react';
import { ModelProvider, modelConfig, updateModelConfig, currentSystemPrompt, updateSystemPrompt, resetSystemPrompt } from '@/lib/openai';

const ADMIN_PASSWORD = 'T#sting123q';

export function AdminDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [provider, setProvider] = useState<ModelProvider>(modelConfig.provider);
  const [apiKey, setApiKey] = useState(modelConfig.apiKey);
  const [systemPrompt, setSystemPrompt] = useState(currentSystemPrompt);

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleProviderChange = (value: ModelProvider) => {
    setProvider(value);
    updateModelConfig({ provider: value });
  };

  const handleApiKeyChange = () => {
    updateModelConfig({ apiKey });
  };

  const handleSystemPromptChange = () => {
    updateSystemPrompt(systemPrompt);
  };

  const handleSystemPromptReset = () => {
    resetSystemPrompt();
    setSystemPrompt(currentSystemPrompt);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Settings</DialogTitle>
        </DialogHeader>
        {!isAuthenticated ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
            </div>
            <Button onClick={handlePasswordSubmit}>Login</Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">Model Provider</Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="groq">Groq</SelectItem>
                  <SelectItem value="grok">Grok (X.ai)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button onClick={handleApiKeyChange}>Verify</Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="h-[200px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSystemPromptChange}>Update</Button>
                <Button variant="outline" onClick={handleSystemPromptReset}>Reset</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}