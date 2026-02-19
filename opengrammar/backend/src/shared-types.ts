export interface Issue {
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
  original: string;
  suggestion: string;
  reason: string;
  offset: number;
  length: number;
}

export interface AnalyzeRequest {
  text: string;
  apiKey?: string;
  model?: string;
}

export interface AnalyzeResponse {
  issues: Issue[];
  error?: string;
}
