export interface CustomPrompt {
  id: string;
  name: string;
  prompt: string;
  icon: string;
  category: 'general' | 'grammar' | 'style' | 'creative' | 'professional';
}

export const DEFAULT_PROMPTS: CustomPrompt[] = [
  {
    id: 'fix-grammar',
    name: 'Fix Grammar',
    prompt: 'Fix all grammar and spelling errors in this text. Keep the original meaning and style.',
    icon: '✓',
    category: 'grammar',
  },
  {
    id: 'make-formal',
    name: 'Make Formal',
    prompt: 'Rewrite this text to sound more formal and professional. Use proper business language.',
    icon: '🎩',
    category: 'professional',
  },
  {
    id: 'make-casual',
    name: 'Make Casual',
    prompt: 'Rewrite this text to sound more casual and conversational. Use friendly, relaxed language.',
    icon: '😊',
    category: 'style',
  },
  {
    id: 'simplify',
    name: 'Simplify',
    prompt: 'Simplify this text. Use shorter sentences and easier words while keeping the meaning.',
    icon: '✂️',
    category: 'style',
  },
  {
    id: 'expand',
    name: 'Expand',
    prompt: 'Expand this text with more details and examples. Make it more comprehensive.',
    icon: '📝',
    category: 'creative',
  },
  {
    id: 'summarize',
    name: 'Summarize',
    prompt: 'Summarize this text in 2-3 sentences. Capture the main points concisely.',
    icon: '📋',
    category: 'general',
  },
  {
    id: 'translate-uk',
    name: 'British English',
    prompt: 'Convert this text to British English spelling and usage.',
    icon: '🇬🇧',
    category: 'grammar',
  },
  {
    id: 'persuade',
    name: 'Make Persuasive',
    prompt: 'Rewrite this text to be more persuasive and compelling. Use persuasive language techniques.',
    icon: '💪',
    category: 'professional',
  },
];

export function getSystemPromptForPrompt(customPrompt: string): string {
  return `You are a helpful writing assistant. ${customPrompt}

Return ONLY the rewritten text, no explanations or commentary.`;
}
