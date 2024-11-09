import OpenAI from 'openai';

export type ModelProvider = 'openai' | 'groq' | 'grok';

interface ModelConfig {
  provider: ModelProvider;
  model: string;
  apiKey: string;
}

export const modelConfig: ModelConfig = {
  provider: 'openai',
  model: 'gpt-4',
  apiKey: 'sk-svcacct-mQ85RsXfW_7huGODNf29JiYDnwDSbWf1QWLRIoZX7n1cKxUi9zw9bLqYs3qT-VuQeQD5TT3BlbkFJ0OhVtgtJcuunEAzktBxfhA56terZKy3KWreoPwrfo_Kyru2FtZB6j8D2z0eEEwv-CDMAA'
};

export let openai = new OpenAI({
  apiKey: modelConfig.apiKey,
  dangerouslyAllowBrowser: true
});

export const updateModelConfig = (newConfig: Partial<ModelConfig>) => {
  Object.assign(modelConfig, newConfig);
  if (newConfig.apiKey) {
    openai = new OpenAI({
      apiKey: newConfig.apiKey,
      dangerouslyAllowBrowser: true
    });
  }
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
1. Create questions that are clear, fun, age-appropriate and test variation of skills required for particular syllabus
2. Each question must have exactly 4 options
3. One and only one option must be correct
4. Include a brief, encouraging explanation for the correct answer
5. Make explanations friendly and positive
6. Return the response in this exact JSON format:
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
    temperature: 0.7,
  });

  try {
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content received from OpenAI');
    return JSON.parse(content) as Question[];
  } catch (error) {
    console.error('Error parsing OpenAI response:', error);
    throw new Error('Failed to generate questions');
  }
}