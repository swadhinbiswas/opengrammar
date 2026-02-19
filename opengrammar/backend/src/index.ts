import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RuleBasedAnalyzer, LLMAnalyzer } from './analyzer';
import { AnalyzeRequest, AnalyzeResponse } from './shared-types';

const app = new Hono();

app.use('/*', cors());

app.post('/analyze', async (c) => {
  try {
    const body: AnalyzeRequest = await c.req.json();
    const { text, apiKey, model } = body;

    let issues = RuleBasedAnalyzer.analyze(text);

    if (apiKey) {
      const llmIssues = await LLMAnalyzer.analyze(text, apiKey, model);
      issues = [...issues, ...llmIssues];
    }

    const response: AnalyzeResponse = {
      issues,
    };

    return c.json(response);
  } catch (error) {
    return c.json({ error: 'Failed to analyze text' }, 500);
  }
});

export default app;
