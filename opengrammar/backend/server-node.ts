import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { RuleBasedAnalyzer } from './src/analyzer-simple.js';
import { PROVIDERS } from './src/shared-types.js';

const app = new Hono();

// Middleware
app.use('/*', logger());
app.use('/*', cors());

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'nodejs',
    version: '2.0.0',
  });
});

// List available providers
app.get('/providers', (c) => {
  return c.json({
    providers: PROVIDERS,
  });
});

// Get models for a provider
app.post('/models', async (c) => {
  try {
    const { provider } = await c.req.json().catch(() => ({}));
    const providerConfig = PROVIDERS.find(p => p.id === provider);
    return c.json({
      provider,
      models: providerConfig?.models || [],
    });
  } catch (error) {
    console.error('Failed to fetch models:', error);
    return c.json({ models: [] });
  }
});

// Main analysis endpoint - rule-based only (fast and reliable)
app.post('/analyze', async (c) => {
  const startTime = Date.now();

  try {
    const body = await c.req.json();
    const { text, apiKey, dictionary } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return c.json({ error: 'Invalid request: text is required' }, 400);
    }

    if (text.length > 50000) {
      return c.json({ error: 'Text exceeds maximum length of 50,000 characters' }, 413);
    }

    console.log(`[Analyze] Text length: ${text.length}`);

    // Run rule-based analysis
    const issues = RuleBasedAnalyzer.analyze(text, {
      dictionary: dictionary || [],
    });

    const duration = Date.now() - startTime;

    console.log(`[Analyze] Found ${issues.length} issues in ${duration}ms`);

    return c.json({
      issues,
      metadata: {
        textLength: text.length,
        issuesCount: issues.length,
        processingTimeMs: duration,
      },
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return c.json({
      error: 'Failed to analyze text',
      message: error instanceof Error ? error.message : 'Unknown error',
      issues: [],
    }, 500);
  }
});

// Tone rewriting endpoint (requires API key)
app.post('/rewrite', async (c) => {
  try {
    const { text, tone, apiKey } = await c.req.json();

    if (!text || !tone) {
      return c.json({ error: 'Text and tone are required' }, 400);
    }

    if (!apiKey) {
      return c.json({ 
        error: 'API key required for rewriting',
        original: text,
        rewritten: text,
        tone,
      });
    }

    // LLM rewriting would go here
    return c.json({
      original: text,
      rewritten: text,
      tone,
    });
  } catch (error) {
    console.error('Rewrite error:', error);
    return c.json({
      error: 'Failed to rewrite text',
      message: error instanceof Error ? error.message : 'Unknown error',
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

const port = 8787;
console.log(`\n🪶 OpenGrammar Backend starting on http://localhost:${port}\n`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`✅ Server ready on http://localhost:${info.port}`);
});
