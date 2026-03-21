/**
 * Supported LLM provider identifiers for AI-powered grammar checking.
 * Each provider offers different models and pricing tiers.
 */
export type LLMProvider =
  | 'openai'
  | 'openrouter'
  | 'groq'
  | 'together'
  | 'ollama'
  | 'custom';

/**
 * Configuration for an LLM provider including API endpoints and supported models.
 * Used to dynamically switch between different AI providers for text analysis.
 */
export interface ProviderConfig {
  /** Unique identifier for the provider */
  id: LLMProvider;
  /** Human-readable name displayed in UI */
  name: string;
  /** Base URL for the provider's API endpoint */
  baseUrl: string;
  /** List of available model identifiers */
  models: string[];
  /** Whether an API key is required for this provider */
  requiresApiKey: boolean;
  /** Description of provider capabilities and pricing */
  description: string;
}

/**
 * Represents a grammar, spelling, clarity, or style issue detected in text.
 * Issues are highlighted in the editor with color-coded underlines.
 */
export interface Issue {
  /** Category of the detected issue */
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
  /** The original text that was flagged */
  original: string;
  /** Suggested replacement or correction */
  suggestion: string;
  /** Explanation of why this is an issue */
  reason: string;
  /** Character offset where the issue starts in the text */
  offset: number;
  /** Length of the flagged text in characters */
  length: number;
  /** Unique identifier for tracking and ignoring specific issues */
  id?: string;
  /** Whether the user has chosen to ignore this issue */
  ignored?: boolean;
  /** Confidence score from 0 to 1 indicating likelihood of true positive */
  confidence?: number;
  /** Priority score for sorting issues by importance */
  priority?: number;
  /** Source of the detection: rule-based, LLM, or context-aware */
  source?: 'rule' | 'llm' | 'context';
}

/**
 * Tracks issues that the user has chosen to ignore.
 * Stored locally to prevent showing the same suggestion again.
 */
export interface IgnoredIssue {
  /** Unique identifier for the issue */
  id: string;
  /** Category of the ignored issue */
  type: Issue['type'];
  /** The original text that was flagged */
  original: string;
  /** The suggestion that was ignored */
  suggestion: string;
  /** Timestamp when the issue was ignored (Unix epoch ms) */
  ignoredAt: number;
}

/**
 * Request payload for the text analysis API endpoint.
 * Sent when the user types or pauses typing in an editor.
 */
export interface AnalyzeRequest {
  /** The text content to analyze for grammar and style issues */
  text: string;
  /** API key for the selected LLM provider (optional for rule-based only) */
  apiKey?: string;
  /** Specific model to use (e.g., 'gpt-4', 'llama-2') */
  model?: string;
  /** Selected LLM provider for AI-powered analysis */
  provider?: LLMProvider;
  /** Custom base URL for self-hosted or alternative endpoints */
  baseUrl?: string;
  /** List of issue IDs to exclude from results */
  ignoredIssues?: string[];
  /** Custom dictionary of accepted words */
  dictionary?: string[];
  /** Contextual information about the writing environment */
  context?: AnalysisContext;
}

/**
 * Contextual information about the writing environment and surrounding text.
 * Helps improve analysis accuracy by providing additional context.
 */
export interface AnalysisContext {
  /** Website domain where the analysis is happening */
  domain?: string;
  /** Type of editor (textarea, contenteditable, rich text, etc.) */
  editorType?: string;
  /** The current sentence being edited */
  activeSentence?: string;
  /** Text content before the current position */
  previousText?: string;
  /** Text content after the current position */
  nextText?: string;
  /** Larger excerpt of surrounding text for context */
  fullTextExcerpt?: string;
}

/**
 * Response from the text analysis API endpoint.
 * Contains detected issues and metadata about the analysis.
 */
export interface AnalyzeResponse {
  /** Array of detected grammar, spelling, clarity, and style issues */
  issues: Issue[];
  /** Metadata about the analysis process */
  metadata?: {
    /** Length of the analyzed text in characters */
    textLength: number;
    /** Total number of issues detected */
    issuesCount: number;
    /** Time taken to process in milliseconds */
    processingTimeMs: number;
    /** Whether contextual information was used */
    contextUsed?: boolean;
    /** Model used for AI analysis */
    model?: string;
    /** Provider used for AI analysis */
    provider?: string;
  };
  /** Error message if analysis failed */
  error?: string;
  /** Informational message about the analysis */
  message?: string;
}

/**
 * Data for rendering a highlighted issue in the editor.
 * Links an issue to its DOM element and text range.
 */
export interface HighlightData {
  /** The issue being highlighted */
  issue: Issue;
  /** The DOM element containing the highlighted text */
  element: HTMLElement;
  /** The Range object representing the text selection */
  range: Range;
}

/**
 * Request payload for rewriting text with a specific tone.
 * Used when the user wants to change the style of selected text.
 */
export interface RewriteRequest {
  /** The text content to rewrite */
  text: string;
  /** Desired tone for the rewrite */
  tone: 'formal' | 'casual' | 'professional' | 'friendly' | 'concise' | 'detailed' | 'persuasive' | 'neutral';
  /** API key for the LLM provider */
  apiKey?: string;
  /** Specific model to use for rewriting */
  model?: string;
  /** Selected LLM provider */
  provider?: LLMProvider;
  /** Custom base URL for the API */
  baseUrl?: string;
}

/**
 * Response from the text rewriting API endpoint.
 * Contains the original and rewritten text.
 */
export interface RewriteResponse {
  /** The original input text */
  original: string;
  /** The rewritten text with applied tone */
  rewritten: string;
  /** The tone that was applied */
  tone: string;
  /** Error message if rewriting failed */
  error?: string;
}

/**
 * Request payload for text autocomplete/next-word suggestions.
 * Provides context for predicting what the user might type next.
 */
export interface AutocompleteRequest {
  /** The current text content */
  text: string;
  /** Cursor position in the text */
  cursor: number;
  /** API key for the LLM provider */
  apiKey?: string;
  /** Specific model to use */
  model?: string;
  /** Selected LLM provider */
  provider?: LLMProvider;
  /** Custom base URL for the API */
  baseUrl?: string;
  /** Contextual information about the writing environment */
  context?: AnalysisContext;
}

/**
 * Response from the autocomplete API endpoint.
 * Contains a suggested text continuation and metadata.
 */
export interface AutocompleteResponse {
  /** The suggested text to insert */
  suggestion: string;
  /** Confidence score from 0 to 1 */
  confidence: number;
  /** Start position for text replacement */
  replaceStart: number;
  /** End position for text replacement */
  replaceEnd: number;
  /** Source of the suggestion: heuristic patterns or LLM */
  source: 'heuristic' | 'llm';
  /** Error message if autocomplete failed */
  error?: string;
}

/**
 * Snapshot of editor state for context-aware analysis.
 * Captured when the user interacts with highlighted issues.
 */
export interface EditorContext {
  /** Current text content in the editor */
  text: string;
  /** Currently detected issues in the text */
  issues: Issue[];
  /** Tab ID where the editor is located (for extension messaging) */
  sourceTabId?: number;
  /** Timestamp when the context was captured (Unix epoch ms) */
  capturedAt: number;
}

/**
 * Snapshot of selected text for rewrite operations.
 * Used to track the source of rewrite requests.
 */
export interface RewriteContext {
  /** The text selected by the user for rewriting */
  selectedText: string;
  /** Tab ID where the selection was made */
  sourceTabId?: number;
  /** Timestamp when the context was captured (Unix epoch ms) */
  capturedAt: number;
}

/**
 * Types of analytics events tracked for usage statistics.
 * Used to understand feature adoption and identify issues.
 */
export type AnalyticsEventType =
  | 'analysis_runs'
  | 'issues_found'
  | 'suggestions_applied'
  | 'suggestions_ignored'
  | 'autocomplete_shown'
  | 'autocomplete_accepted'
  | 'rewrite_opened'
  | 'rewrite_applied';

/**
 * Summary of analytics data aggregated over time.
 * Provides insights into usage patterns and feature adoption.
 */
export interface AnalyticsSummary {
  /** Total counts for each event type */
  totals: Record<AnalyticsEventType, number>;
  /** Event counts grouped by domain */
  domains: Record<string, number>;
  /** Event counts grouped by AI provider */
  providers: Record<string, number>;
  /** Timestamp of last update (Unix epoch ms) */
  lastUpdatedAt?: number;
}
