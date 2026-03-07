# 📚 Contributing Grammar Rules

We want to build the most comprehensive open-source library of grammar and style rules. This guide explains how you can contribute new rules to OpenGrammar.

## How Rules Work

OpenGrammar uses a "Rule-Based Engine" for fast, offline analysis. These rules are defined using **Regular Expressions (RegEx)**.

The rules are located in: `opengrammar/backend/src/analyzer-simple.ts`

### Structure of a Rule

Each rule consists of:
1. **Pattern:** A RegEx to find the issue.
2. **Suggestion:** The text that should replace the error.
3. **Reason:** An explanation of why this is an error.

### Example: Common Misspelling

```typescript
{
  pattern: /\bteh\b/gi,
  suggestion: 'the',
  reason: 'Misspelled word. The correct spelling is "the".'
}
```

## How to Contribute a Rule

You don't need to be an expert developer to contribute!

### Option 1: Open an Issue (Non-Developers)
If you know a common mistake but don't want to touch the code:
1. Go to the **Issues** tab.
2. Choose the **"Grammar Rule Suggestion"** template.
3. Provide the incorrect text, the correction, and the reason.

### Option 2: Submit a Pull Request (Developers)
1. Open `opengrammar/backend/src/analyzer-simple.ts`.
2. Find the relevant category (e.g., `checkBasicGrammar`, `checkCommonMisspellings`).
3. Add your rule to the array.
4. Run `bun x tsc` to ensure no syntax errors.
5. Submit your PR!

## Categories of Rules Needed

We are looking for rules in the following categories:

### 1. Common Misspellings
Words that are frequently typed incorrectly (e.g., "recieve" → "receive").

### 2. Confused Words
Words that sound similar but have different meanings (e.g., "affect" vs "effect").

### 3. Redundant Phrases
Wordy phrases that can be simplified (e.g., "at this point in time" → "now").

### 4. Style & Clarity
Rules that help make writing more professional (e.g., avoiding excessive use of "very").

### 5. Punctuation & Spacing
Common errors with commas, apostrophes, and double spaces.

---

**Thank you for helping us make OpenGrammar better for everyone!**
