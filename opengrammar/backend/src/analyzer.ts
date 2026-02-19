import { Issue } from './shared-types';
import OpenAI from 'openai';

export class RuleBasedAnalyzer {
  static analyze(text: string): Issue[] {
    const issues: Issue[] = [];

    // 1. Passive Voice Detection
    // Simple regex for passive voice - can be improved
    const passiveRegex = /\b(am|are|is|was|were|be|been|being)\s+(\w+(?:ed|en))\b/gi;
    let match;
    while ((match = passiveRegex.exec(text)) !== null) {
      issues.push({
        type: 'style',
        original: match[0],
        suggestion: `Consider active voice`,
        reason: 'Passive voice can make sentences weaker.',
        offset: match.index,
        length: match[0].length,
      });
    }

    // 2. Repetition Detection
    const repetitionRegex = /\b(\w+)\s+\1\b/gi;
    while ((match = repetitionRegex.exec(text)) !== null) {
      issues.push({
        type: 'grammar',
        original: match[0],
        suggestion: match[1],
        reason: 'Repeated word.',
        offset: match.index,
        length: match[0].length,
      });
    }

    // 3. Readability (Long Sentences)
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    let currentIndex = 0;
    sentences.forEach((sentence) => {
      const words = sentence.trim().split(/\s+/).length;
      if (words > 30) {
        issues.push({
          type: 'clarity',
          original: sentence.substring(0, 20) + '...', 
          suggestion: 'Split into shorter sentences',
          reason: 'This sentence is very long and might be hard to read.',
          offset: currentIndex, 
          length: sentence.length,
        });
      }
      currentIndex += sentence.length;
    });

    return issues;
  }
}

export class LLMAnalyzer {
  static async analyze(text: string, apiKey: string, model: string = 'gpt-3.5-turbo'): Promise<Issue[]> {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://openrouter.ai/api/v1', // Default to OpenRouter for flexibility
    });

    const prompt = `
SYSTEM:
You are an open-source grammar and writing assistant.

RULES:
- Do NOT rewrite text unless asked
- Do NOT change meaning
- Be concise
- Output VALID JSON ONLY
- No markdown
- No explanations outside JSON

TASK:
Analyze the text and return grammar, spelling, clarity, and style issues.

JSON FORMAT:
{
  "issues": [
    {
      "type": "grammar | spelling | clarity | style",
      "original": "string",
      "suggestion": "string",
      "reason": "string"
    }
  ]
}

TEXT:
${text}
`;

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: model,
        response_format: { type: 'json_object' },
      });

      let content = completion.choices[0].message.content;
      if (!content) return [];

      // Strip markdown code block if present
      content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');

      const result = JSON.parse(content);
      
      // Map LLM issues to our internal format, calculating offsets
      return result.issues.map((issue: any) => {
        const index = text.indexOf(issue.original);
        return {
          ...issue,
          offset: index !== -1 ? index : 0,
          length: issue.original.length,
        };
      });

    } catch (error) {
      console.error('LLM Analysis Error:', error);
      return [];
    }
  }
}
