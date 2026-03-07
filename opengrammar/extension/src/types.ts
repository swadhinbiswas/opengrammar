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
  confidence?: number;
  priority?: number;
  source?: 'rule' | 'llm' | 'context';
}

export interface IgnoredIssue {
  id: string;
  type: Issue['type'];
  original: string;
  suggestion: string;
  ignoredAt: number;
}

export interface AnalyzeRequest {
  text: string;
  apiKey?: string;
  model?: string;
  provider?: LLMProvider;
  baseUrl?: string;
  ignoredIssues?: string[];
  dictionary?: string[];
  context?: AnalysisContext;
}

export interface AnalysisContext {
  domain?: string;
  editorType?: string;
  activeSentence?: string;
  previousText?: string;
  nextText?: string;
  fullTextExcerpt?: string;
}

export interface AnalyzeResponse {
  issues: Issue[];
  metadata?: {
    textLength: number;
    issuesCount: number;
    processingTimeMs: number;
    contextUsed?: boolean;
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

export interface AutocompleteRequest {
  text: string;
  cursor: number;
  apiKey?: string;
  model?: string;
  provider?: LLMProvider;
  baseUrl?: string;
  context?: AnalysisContext;
}

export interface AutocompleteResponse {
  suggestion: string;
  confidence: number;
  replaceStart: number;
  replaceEnd: number;
  source: 'heuristic' | 'llm';
  error?: string;
}

export interface EditorContext {
  text: string;
  issues: Issue[];
  sourceTabId?: number;
  capturedAt: number;
}

export interface RewriteContext {
  selectedText: string;
  sourceTabId?: number;
  capturedAt: number;
}

export type AnalyticsEventType =
  | 'analysis_runs'
  | 'issues_found'
  | 'suggestions_applied'
  | 'suggestions_ignored'
  | 'autocomplete_shown'
  | 'autocomplete_accepted'
  | 'rewrite_opened'
  | 'rewrite_applied';

export interface AnalyticsSummary {
  totals: Record<AnalyticsEventType, number>;
  domains: Record<string, number>;
  providers: Record<string, number>;
  lastUpdatedAt?: number;
}
