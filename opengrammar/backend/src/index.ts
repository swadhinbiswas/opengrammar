import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { RuleBasedAnalyzer, LLMAnalyzer } from './analyzer.js';
import type { AnalyzeRequest, AnalyzeResponse, LLMProvider } from './shared-types.js';
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
    const { text, apiKey, model, provider, baseUrl } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return c.json({ error: 'Invalid request: text is required' }, 400);
    }

    if (text.length > 50000) {
      return c.json({ error: 'Text exceeds maximum length of 50,000 characters' }, 413);
    }

    // Run rule-based analysis (always)
    let issues = RuleBasedAnalyzer.analyze(text);

    // Run LLM analysis if API key provided or using local Ollama
    if (apiKey || provider === 'ollama') {
      try {
        const llmProvider = (provider || 'openai') as LLMProvider;
        const llmIssues = await LLMAnalyzer.analyze(
          text, 
          apiKey || '', 
          model || 'gpt-3.5-turbo',
          llmProvider,
          baseUrl
        );
        issues = [...issues, ...llmIssues];
      } catch (llmError) {
        console.error('LLM analysis failed:', llmError);
        // Continue with rule-based results only
      }
    }

    const duration = Date.now() - startTime;
    
    const response: AnalyzeResponse = {
      issues,
      metadata: {
        textLength: text.length,
        issuesCount: issues.length,
        processingTimeMs: duration,
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

export default app;
