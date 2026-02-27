export interface Issue {
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
  original: string;
  suggestion: string;
  reason: string;
  offset: number;
  length: number;
  id?: string;
  ignored?: boolean;
}

export interface AnalyzeRequest {
  text: string;
  apiKey?: string;
  model?: string;
  provider?: LLMProvider;
  baseUrl?: string;
  ignoredIssues?: string[];
  customRules?: CustomRule[];
}

export interface CustomRule {
  id: string;
  pattern: string;
  replacement: string;
  description: string;
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
}

export interface AnalysisMetadata {
  textLength: number;
  issuesCount: number;
  processingTimeMs: number;
  model?: string;
  provider?: string;
}

export interface AnalyzeResponse {
  issues: Issue[];
  metadata?: AnalysisMetadata;
  error?: string;
  message?: string;
}

export type LLMProvider = 
  | 'openai'
  | 'openrouter'
  | 'groq'
  | 'together'
  | 'ollama'
  | 'custom';

export interface ProviderConfig {
  id: LLMProvider;
  name: string;
  baseUrl: string;
  models: string[];
  requiresApiKey: boolean;
  description: string;
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    requiresApiKey: true,
    description: 'Official OpenAI API',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: ['meta-llama/llama-3-70b-instruct', 'anthropic/claude-3.5-sonnet', 'google/gemma-2-27b-it'],
    requiresApiKey: true,
    description: 'Access 100+ models with one API',
  },
  {
    id: 'groq',
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: ['llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it', 'mixtral-8x7b-32768'],
    requiresApiKey: true,
    description: 'Blazing fast inference',
  },
  {
    id: 'together',
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    models: ['meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'mistralai/Mixtral-8x7B-Instruct-v0.1'],
    requiresApiKey: true,
    description: 'Open source models at scale',
  },
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    baseUrl: 'http://localhost:11434/v1',
    models: ['qwen2.5:0.5b', 'qwen2.5:1.5b', 'phi4-mini:3.8b', 'llama3.2:3b', 'mistral:7b'],
    requiresApiKey: false,
    description: 'Run models locally on your machine',
  },
  {
    id: 'custom',
    name: 'Custom Endpoint',
    baseUrl: '',
    models: [],
    requiresApiKey: true,
    description: 'Your own OpenAI-compatible API',
  },
];
