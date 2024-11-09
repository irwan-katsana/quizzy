import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Settings, Lock } from 'lucide-react';
import {
  currentSystemPrompt,
  updateSystemPrompt,
  resetSystemPrompt,
  updateModelConfig,
  modelConfig,
  type ModelProvider,
  openai
} from '@/lib/openai';

const ADMIN_PASSWORD = 'T#sting123q';

const MODEL_OPTIONS = {
  openai: ['gpt-4', 'gpt-3.5-turbo'],
  groq: ['mixtral-8x7b-32768', 'llama2-70b-4096'],
  grok: ['grok-1']
};

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [provider, setProvider] = useState<ModelProvider>(modelConfig.provider);
  const [model, setModel] = useState(modelConfig.model);
  const [apiKey, setApiKey] = useState(modelConfig.apiKey);
  const [prompt, setPrompt] = useState(currentSystemPrompt);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive"
      });
    }
    setPassword('');
  };

  const handleProviderChange = (newProvider: ModelProvider) => {
    setProvider(newProvider);
    setModel(MODEL_OPTIONS[newProvider][0]);
  };

  const verifyApiKey = async () => {
    setIsVerifying(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "test" }],
        model: model,
        max_tokens: 1
      });
      if (completion) {
        toast({
          title: "Success",
          description: "API key verified successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify API key",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveChanges = () => {
    updateModelConfig({
      provider,
      model,
      apiKey
    });
    updateSystemPrompt(prompt);
    toast({
      title: "Settings Saved",
      description: "Model configuration and system prompt updated.",
    });
  };

  const handleResetPrompt = () => {
    resetSystemPrompt();
    setPrompt(currentSystemPrompt);
    toast({
      title: "Reset Complete",
      description: "System prompt has been reset to default.",
    });
  };

  if (!isAuthenticated) {
    return (
      <Card className="p-6 w-full max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold">Admin Access</h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-semibold">Admin Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Model Provider</Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="groq">Groq</SelectItem>
                  <SelectItem value="grok">Grok (X.AI)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {MODEL_OPTIONS[provider].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>API Key</Label>
            <div className="flex space-x-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline"
                onClick={verifyApiKey}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Key"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>System Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleResetPrompt}>
              Reset Prompt
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}