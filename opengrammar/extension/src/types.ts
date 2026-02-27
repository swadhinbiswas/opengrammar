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
}

export interface AnalyzeResponse {
  issues: Issue[];
  metadata?: {
    textLength: number;
    issuesCount: number;
    processingTimeMs: number;
    model?: string;
    provider?: string;
  };
  error?: string;
  message?: string;
}

export interface HighlightData {
  issue: Issue;
  element: HTMLElement;
  range: Range;
}

export interface RewriteRequest {
  text: string;
  tone: 'formal' | 'casual' | 'professional' | 'friendly' | 'concise' | 'detailed' | 'persuasive' | 'neutral';
  apiKey?: string;
  model?: string;
  provider?: LLMProvider;
  baseUrl?: string;
}

export interface RewriteResponse {
  original: string;
  rewritten: string;
  tone: string;
  error?: string;
}
