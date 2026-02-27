export interface Issue {
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
  original: string;
  suggestion: string;
  reason: string;
  offset: number;
  length: number;
  // Optional fields for enhanced functionality
  id?: string;
  ignored?: boolean;
}

export interface AnalyzeRequest {
  text: string;
  apiKey?: string;
  model?: string;
  ignoredIssues?: string[];
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
}

export interface AnalyzeResponse {
  issues: Issue[];
  metadata?: AnalysisMetadata;
  error?: string;
  message?: string;
}
