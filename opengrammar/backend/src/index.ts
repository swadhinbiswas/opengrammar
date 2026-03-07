import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { RuleBasedAnalyzer, LLMAnalyzer } from './analyzer.js';
import OpenAI from 'openai';
import type {
  AnalysisContext,
  AnalyzeRequest,
  AnalyzeResponse,
  AutocompleteRequest,
  LLMProvider,
  Issue,
} from './shared-types.js';
import { PROVIDERS } from './shared-types.js';

const app = new Hono();

// Middleware
app.use('/*', logger());
app.use('/*', cors());

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: (c.env as any)?.ENV || 'unknown',
    version: '2.0.0',
  });
});

// List available providers
app.get('/providers', (c) => {
  return c.json({
    providers: PROVIDERS,
  });
});

// Get models for a specific provider
app.post('/models', async (c) => {
  try {
    const { provider, apiKey, baseUrl } = await c.req.json();

    if (!provider) {
      return c.json({ error: 'Provider is required' }, 400);
    }

    // Get default models from config
    const providerConfig = PROVIDERS.find(p => p.id === provider);
    const defaultModels = providerConfig?.models || [];

    // Try to fetch live models, but don't fail if it doesn't work
    let models = defaultModels;
    
    // Only try to fetch live models if API key is provided (except for Ollama)
    if ((apiKey && apiKey !== 'ollama') || provider === 'ollama') {
      try {
        const liveModels = await LLMAnalyzer.getModels(provider, apiKey, baseUrl);
        if (liveModels.length > 0) {
          models = liveModels;
        }
      } catch (fetchError) {
        // Silently use default models if fetch fails
        console.debug(`Using default models for ${provider}`);
      }
    }

    return c.json({
      provider,
      models: models,
    });
  } catch (error) {
    console.error('Failed to fetch models:', error);
    // Return default models for the provider
    const { provider } = await c.req.json().catch(() => ({}));
    const providerConfig = PROVIDERS.find(p => p.id === provider);
    return c.json({
      provider,
      models: providerConfig?.models || [],
    });
  }
});

// Main analysis endpoint
app.post('/analyze', async (c) => {
  const startTime = Date.now();
  
  try {
    const body: AnalyzeRequest = await c.req.json();
    const { text, apiKey, model, provider, baseUrl, context } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return c.json({ error: 'Invalid request: text is required' }, 400);
    }

    if (text.length > 50000) {
      return c.json({ error: 'Text exceeds maximum length of 50,000 characters' }, 413);
    }

    // Run rule-based analysis (always)
    const ruleIssues = RuleBasedAnalyzer.analyze(text);
    let issues = enrichIssues(ruleIssues, 'rule', text, context);

    // Run LLM analysis if API key provided or using local Ollama
    if (apiKey || provider === 'ollama') {
      try {
        const llmProvider = (provider || 'openai') as LLMProvider;
        const llmIssues = await LLMAnalyzer.analyze(
          text, 
          apiKey || '', 
          model || 'gpt-3.5-turbo',
          llmProvider,
          baseUrl,
          context
        );
        issues = [...issues, ...enrichIssues(llmIssues, 'llm', text, context)];
      } catch (llmError) {
        console.error('LLM analysis failed:', llmError);
        // Continue with rule-based results only
      }
    }

    issues = dedupeAndRankIssues(issues, text, context);

    const duration = Date.now() - startTime;
    
    const response: AnalyzeResponse = {
      issues,
      metadata: {
        textLength: text.length,
        issuesCount: issues.length,
        processingTimeMs: duration,
        ...(context && { contextUsed: true }),
        ...(model && { model }),
        ...(provider && { provider }),
      },
    };

    return c.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    return c.json({ 
      error: 'Failed to analyze text', 
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Autocomplete / next-word suggestions
app.post('/autocomplete', async (c) => {
  try {
    const body: AutocompleteRequest = await c.req.json();
    const { text, cursor, apiKey, model, provider, baseUrl, context } = body;

    if (typeof text !== 'string') {
      return c.json({ error: 'Text is required' }, 400);
    }

    const safeCursor = Math.max(0, Math.min(cursor ?? text.length, text.length));
    const providerId = (provider || 'openai') as LLMProvider;

    if (apiKey || providerId === 'ollama') {
      const completion = await getLlmAutocomplete(text, safeCursor, apiKey || '', model, providerId, baseUrl, context);
      return c.json(completion);
    }

    return c.json(getHeuristicAutocomplete(text, safeCursor));
  } catch (error) {
    console.error('Autocomplete error:', error);
    return c.json({
      suggestion: '',
      confidence: 0,
      replaceStart: 0,
      replaceEnd: 0,
      source: 'heuristic',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Tone rewriting endpoint
app.post('/rewrite', async (c) => {
  try {
    const { text, tone, apiKey, model, provider, baseUrl } = await c.req.json();

    if (!text || !tone) {
      return c.json({ error: 'Text and tone are required' }, 400);
    }

    const providerBaseUrl = baseUrl || getProviderBaseUrl(provider || 'openai');
    
    const openai = new (await import('openai')).OpenAI({
      apiKey: apiKey || 'ollama',
      baseURL: providerBaseUrl,
    });

    const toneInstructions: Record<string, string> = {
      formal: 'Make the text more formal and professional',
      casual: 'Make the text more casual and conversational',
      professional: 'Make the text more professional and business-appropriate',
      friendly: 'Make the text friendlier and warmer',
      concise: 'Make the text more concise and direct',
      detailed: 'Make the text more detailed and elaborate',
      persuasive: 'Make the text more persuasive and compelling',
      neutral: 'Keep the text neutral and objective',
    };

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: `You are a writing assistant. ${toneInstructions[tone] || 'Improve the writing'}. Return ONLY the rewritten text, no explanations.` 
        },
        { role: 'user', content: text }
      ],
      model: model || 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const rewrittenText = completion.choices[0]?.message?.content || text;

    return c.json({
      original: text,
      rewritten: rewrittenText,
      tone,
    });
  } catch (error) {
    console.error('Rewrite error:', error);
    return c.json({ 
      error: 'Failed to rewrite text',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ 
    error: 'Internal server error',
    message: err.message 
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

function getProviderBaseUrl(provider: string): string {
  const urls: Record<string, string> = {
    openai: 'https://api.openai.com/v1',
    openrouter: 'https://openrouter.ai/api/v1',
    groq: 'https://api.groq.com/openai/v1',
    together: 'https://api.together.xyz/v1',
    ollama: 'http://localhost:11434/v1',
    custom: '',
  };
  return urls[provider as string] ?? urls.openai;
}

function enrichIssues(issues: Issue[], source: Issue['source'], text: string, context?: AnalysisContext): Issue[] {
  return issues.map((issue) => {
    const confidence = getConfidence(issue, source, context);
    const priority = getPriority(issue, confidence, text, context);
    return {
      ...issue,
      source,
      confidence,
      priority,
      id: issue.id || `${source}-${issue.type}-${issue.offset}-${issue.original}`,
    };
  });
}

function dedupeAndRankIssues(issues: Issue[], text: string, context?: AnalysisContext): Issue[] {
  const deduped = new Map<string, Issue>();

  for (const issue of issues) {
    const key = `${issue.type}|${issue.offset}|${issue.original.toLowerCase()}|${issue.suggestion.toLowerCase()}`;
    const existing = deduped.get(key);
    if (!existing || (issue.priority || 0) > (existing.priority || 0)) {
      deduped.set(key, issue);
    }
  }

  return Array.from(deduped.values()).sort((a, b) => {
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    const confidenceDiff = (b.confidence || 0) - (a.confidence || 0);
    if (confidenceDiff !== 0) return confidenceDiff;
    return a.offset - b.offset;
  });
}

function getConfidence(issue: Issue, source: Issue['source'], context?: AnalysisContext): number {
  const baseByType: Record<Issue['type'], number> = {
    spelling: 0.96,
    grammar: 0.9,
    clarity: 0.82,
    style: 0.78,
  };

  let confidence = baseByType[issue.type];

  if (source === 'llm') confidence -= 0.04;
  if (/consider/i.test(issue.suggestion) || /consider/i.test(issue.reason)) confidence -= 0.08;
  if (issue.original.length <= 2) confidence -= 0.05;
  if (context?.activeSentence && context.activeSentence.includes(issue.original)) confidence += 0.03;

  return Math.max(0.5, Math.min(0.99, Number(confidence.toFixed(2))));
}

function getPriority(issue: Issue, confidence: number, text: string, context?: AnalysisContext): number {
  const severityWeight: Record<Issue['type'], number> = {
    spelling: 1,
    grammar: 0.95,
    clarity: 0.8,
    style: 0.72,
  };

  let priority = confidence * 100 * severityWeight[issue.type];

  const occurrenceCount = issue.original ? text.toLowerCase().split(issue.original.toLowerCase()).length - 1 : 1;
  if (occurrenceCount > 1) priority += Math.min(occurrenceCount * 2, 8);
  if (context?.fullTextExcerpt && context.fullTextExcerpt.toLowerCase().includes(issue.original.toLowerCase())) {
    priority += 4;
  }

  return Number(priority.toFixed(2));
}

async function getLlmAutocomplete(
  text: string,
  cursor: number,
  apiKey: string,
  model: string | undefined,
  provider: LLMProvider,
  baseUrl?: string,
  context?: AnalysisContext,
) {
  const openai = new OpenAI({
    apiKey: apiKey || 'ollama',
    baseURL: baseUrl || getProviderBaseUrl(provider),
  });

  const prefix = text.slice(0, cursor);
  const suffix = text.slice(cursor);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a writing assistant. Predict the next short continuation for the user. Return ONLY JSON with keys suggestion and confidence. Keep suggestion under 12 words and do not repeat the existing text.'
      },
      {
        role: 'user',
        content: JSON.stringify({
          prefix: prefix.slice(-400),
          suffix: suffix.slice(0, 120),
          context,
        }),
      },
    ],
    model: model || 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    max_tokens: 80,
    temperature: 0.5,
  });

  const content = completion.choices[0]?.message?.content || '{"suggestion":"","confidence":0.5}';
  const parsed = JSON.parse(content.replace(/^```json\s*/, '').replace(/\s*```$/, ''));

  return {
    suggestion: typeof parsed.suggestion === 'string' ? parsed.suggestion.trim() : '',
    confidence: typeof parsed.confidence === 'number' ? Math.max(0, Math.min(1, parsed.confidence)) : 0.72,
    replaceStart: cursor,
    replaceEnd: cursor,
    source: 'llm' as const,
  };
}

function getHeuristicAutocomplete(text: string, cursor: number) {
  const prefix = text.slice(0, cursor);
  const trimmed = prefix.trimEnd();
  const lower = trimmed.toLowerCase();

  const patternSuggestions: Array<{ pattern: RegExp; suggestion: string }> = [
    { pattern: /thank you for$/i, suggestion: ' your time.' },
    { pattern: /i look forward to$/i, suggestion: ' hearing from you.' },
    { pattern: /please let me know if$/i, suggestion: ' you have any questions.' },
    { pattern: /in conclusion[,]?$/i, suggestion: ' this approach provides a stronger outcome.' },
    { pattern: /for example[,]?$/i, suggestion: ' this can improve clarity and consistency.' },
    { pattern: /i hope you are$/i, suggestion: ' doing well.' },
  ];

  for (const entry of patternSuggestions) {
    if (entry.pattern.test(lower)) {
      return {
        suggestion: entry.suggestion,
        confidence: 0.66,
        replaceStart: cursor,
        replaceEnd: cursor,
        source: 'heuristic' as const,
      };
    }
  }

  const endsWithSentence = /[.!?]$/.test(trimmed);
  return {
    suggestion: endsWithSentence ? ' This helps keep the writing clear.' : '',
    confidence: endsWithSentence ? 0.42 : 0,
    replaceStart: cursor,
    replaceEnd: cursor,
    source: 'heuristic' as const,
  };
}

export default app;
