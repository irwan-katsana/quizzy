import OpenAI from 'openai';

export type ModelProvider = 'openai' | 'groq' | 'grok';

interface ModelConfig {
  provider: ModelProvider;
  model: string;
  apiKey: string;
  temperature: number;
  topP: number;
}

export const modelConfig: ModelConfig = {
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  temperature: 0.7,
  topP: 1.0
};

const API_ENDPOINTS = {
  groq: 'https://api.groq.com/openai/v1',
  grok: 'https://api.x.ai/v1',
  openai: 'https://api.openai.com/v1'
};

// Get API keys from environment variables
const API_KEYS = {
  groq: import.meta.env.VITE_GROQ_API_KEY || '',
  grok: import.meta.env.VITE_GROK_API_KEY || '',
  openai: import.meta.env.VITE_OPENAI_API_KEY || ''
} as const;

export let latestApiResponse: any = null;

export let openai = new OpenAI({
  apiKey: modelConfig.apiKey || API_KEYS[modelConfig.provider],
  baseURL: API_ENDPOINTS[modelConfig.provider],
  dangerouslyAllowBrowser: true
});

export const updateModelConfig = (newConfig: Partial<ModelConfig>) => {
  Object.assign(modelConfig, newConfig);
  if (newConfig.apiKey || newConfig.provider) {
    openai = new OpenAI({
      apiKey: modelConfig.apiKey || API_KEYS[modelConfig.provider],
      baseURL: API_ENDPOINTS[modelConfig.provider],
      dangerouslyAllowBrowser: true
    });
  }
};

export const verifyApiKey = async (provider: ModelProvider, apiKey: string, model: string) => {
  const tempClient = new OpenAI({
    apiKey: apiKey,
    baseURL: API_ENDPOINTS[provider],
    dangerouslyAllowBrowser: true
  });

  const completion = await tempClient.chat.completions.create({
    messages: [{ role: "user", content: "test" }],
    model: model,
    max_tokens: 1
  });

  latestApiResponse = completion;
  return !!completion;
};

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

const DEFAULT_SYSTEM_PROMPT = `You are an educational assistant creating multiple-choice questions for Malaysian students.
Follow these rules strictly:
1. Create highly varied questions that are clear, fun, age-appropriate and test variation of skills required for particular syllabus
2. Each question must have exactly 4 options
3. One and only one option must be correct
4. Include a brief, informative explanation for the correct answer
5. Avoid personal questions like, what is your favorite color
6. Provide the output only as a JSON array in the exact format specified below, without any additional text, code blocks, or formatting. Do not include backticks, markdown, or language indicators. The JSON array should look like this:
[{
  "id": "unique_string",
  "question": "question_text",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": "exact_correct_option_text",
  "explanation": "brief_explanation"
}]`;

export let currentSystemPrompt = DEFAULT_SYSTEM_PROMPT;

export const updateSystemPrompt = (newPrompt: string) => {
  currentSystemPrompt = newPrompt;
};

export const resetSystemPrompt = () => {
  currentSystemPrompt = DEFAULT_SYSTEM_PROMPT;
};

export async function generateQuestions(
  standard: string,
  subject: string,
  subTopic: string,
  count: number = 10
): Promise<Question[]> {
  const prompt = `Generate ${count} multiple choice questions suitable for Standard ${standard} students in Malaysia studying ${subject}${
    subTopic ? ` focusing on ${subTopic}` : ''
  }. Make the questions engaging and fun for children.`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: currentSystemPrompt },
      { role: "user", content: prompt }
    ],
    model: modelConfig.model,
    temperature: modelConfig.temperature,
    top_p: modelConfig.topP,
  });

  latestApiResponse = completion;

  try {
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content received from OpenAI');
    return JSON.parse(content) as Question[];
  } catch (error) {
    console.error('Error parsing OpenAI response:', error);
    throw new Error('Failed to generate questions');
  }
}