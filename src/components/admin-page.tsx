import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Settings, Lock, Eye, EyeOff, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  currentSystemPrompt,
  updateSystemPrompt,
  resetSystemPrompt,
  updateModelConfig,
  modelConfig,
  type ModelProvider,
  verifyApiKey,
  latestApiResponse
} from '@/lib/openai';

const ADMIN_PASSWORD = 'T#sting123q';

const MODEL_OPTIONS = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  groq: ['llama-3.1-70b-versatile', 'llama-3.2-3b-preview', 'mixtral-8x7b-32768', 'llama2-70b-4096'],
  grok: ['grok-beta']
};

const DEFAULT_API_KEYS = {
  groq: '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',
  grok: 'xai-WgiUAuD4ZKgybN5zGjYU1McEDTlQu9ycT7jxLzKK03cjwcnrKxKoVouqMswCxyg8hD11RPmmKmtA2wdR',
  openai: 'sk-svcacct-mQ85RsXfW_7huGODNf29JiYDnwDSbWf1QWLRIoZX7n1cKxUi9zw9bLqYs3qT-VuQeQD5TT3BlbkFJ0OhVtgtJcuunEAzktBxfhA56terZKy3KWreoPwrfo_Kyru2FtZB6j8D2z0eEEwv-CDMAA'
};

function formatApiResponse(response: any): string {
  if (!response) return 'No API response yet';
  
  try {
    if (response.choices?.[0]?.message?.content) {
      try {
        const content = JSON.parse(response.choices[0].message.content);
        return JSON.stringify({
          ...response,
          choices: [{
            ...response.choices[0],
            message: {
              ...response.choices[0].message,
              content: content
            }
          }]
        }, null, 2);
      } catch {
        return JSON.stringify(response, null, 2);
      }
    }
    return JSON.stringify(response, null, 2);
  } catch (error) {
    return 'Error formatting API response';
  }
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [provider, setProvider] = useState<ModelProvider>(modelConfig.provider);
  const [model, setModel] = useState(modelConfig.model);
  const [apiKey, setApiKey] = useState(modelConfig.apiKey);
  const [prompt, setPrompt] = useState(currentSystemPrompt);
  const [temperature, setTemperature] = useState(modelConfig.temperature);
  const [topP, setTopP] = useState(modelConfig.topP);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showApiResponse, setShowApiResponse] = useState(false);
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
    const defaultKey = DEFAULT_API_KEYS[newProvider];
    setApiKey(defaultKey);
    updateModelConfig({
      provider: newProvider,
      model: MODEL_OPTIONS[newProvider][0],
      apiKey: defaultKey
    });
    toast({
      title: "Provider Changed",
      description: `Switched to ${newProvider} with default configuration.`,
    });
  };

  const verifyCurrentApiKey = async () => {
    setIsVerifying(true);
    try {
      await verifyApiKey(provider, apiKey, model);
      toast({
        title: "Success",
        description: "API key verified successfully!",
      });
    } catch (error) {
      console.error('API Key verification error:', error);
      toast({
        title: "Error",
        description: "Failed to verify API key. Please check your key and try again.",
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
      apiKey,
      temperature,
      topP
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
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button 
                variant="outline"
                onClick={verifyCurrentApiKey}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Key"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Temperature</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Controls randomness: 0 is focused and deterministic, 1 is more creative and varied.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={[temperature]}
                  onValueChange={([value]) => setTemperature(value)}
                  max={1}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{temperature.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Top P</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Controls diversity: 0.1 is focused on likely tokens, 1.0 considers all possibilities.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={[topP]}
                  onValueChange={([value]) => setTopP(value)}
                  max={1}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{topP.toFixed(1)}</span>
              </div>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Latest API Response</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiResponse(!showApiResponse)}
              >
                {showApiResponse ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {showApiResponse && (
              <div className="relative">
                <Textarea
                  value={formatApiResponse(latestApiResponse)}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900/50 overflow-auto whitespace-pre"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(formatApiResponse(latestApiResponse));
                    toast({
                      title: "Copied",
                      description: "API response copied to clipboard",
                    });
                  }}
                >
                  Copy
                </Button>
              </div>
            )}
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