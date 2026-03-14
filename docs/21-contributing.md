# 🤝 Contributing to OpenGrammar

Thank you for your interest in contributing to OpenGrammar! This guide will help you get started.

---

## 📋 Table of Contents

1. [Ways to Contribute](#ways-to-contribute)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Submitting Pull Requests](#submitting-pull-requests)
6. [Code Style](#code-style)
7. [Adding Grammar Rules](#adding-grammar-rules)
8. [Documentation](#documentation)
9. [Community](#community)

---

## 🎯 Ways to Contribute

### Non-Developers

**Everyone can contribute!** You don't need to be a programmer:

1. **Report Bugs**
   - Found something broken?
   - Create a GitHub issue
   - Describe what happened

2. **Suggest Features**
   - Have an idea?
   - Open a GitHub discussion
   - Explain your use case

3. **Improve Documentation**
   - Fix typos
   - Clarify instructions
   - Add examples
   - Translate to other languages

4. **Spread the Word**
   - Star the repository
   - Share on social media
   - Tell friends and colleagues
   - Write blog posts

### Developers

**Code contributions welcome!**

1. **Fix Bugs**
   - Check "Issues" tab
   - Look for "bug" label
   - Submit fixes

2. **Add Features**
   - Check "Roadmap"
   - Look for "enhancement" label
   - Implement and submit

3. **Improve Performance**
   - Optimize code
   - Reduce bundle size
   - Improve loading times

4. **Write Tests**
   - Add unit tests
   - Integration tests
   - E2E tests

---

## 🚀 Getting Started

### Prerequisites

**Required:**
- Node.js 18+ or Bun
- Git
- Code editor (VS Code recommended)

**Nice to have:**
- Experience with TypeScript
- Browser extension development knowledge
- React familiarity

### Quick Setup

```bash
# 1. Fork the repository
# Click "Fork" on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/opengrammar.git
cd opengrammar

# 3. Add upstream remote
git remote add upstream https://github.com/swadhinbiswas/opengrammar.git

# 4. Install dependencies
cd opengrammar/opengrammar
bun install

# 5. Start development
bun run dev
```

---

## 💻 Development Setup

### Project Structure

```
opengrammar/
├── backend/              # Serverless API
│   ├── src/
│   │   ├── index.ts     # Main API file
│   │   ├── analyzer.ts  # Grammar analyzer
│   │   └── analyzer-simple.ts  # Rule-based rules
│   ├── package.json
│   └── wrangler.toml
│
├── extension/            # Browser extension
│   ├── src/
│   │   ├── background/  # Service worker
│   │   ├── content/     # Content scripts
│   │   ├── popup/       # Popup UI
│   │   └── options/     # Settings page
│   ├── public/
│   ├── manifest.json
│   └── package.json
│
└── docs/                # Documentation
```

### Development Commands

#### Backend

```bash
cd opengrammar/backend

# Install dependencies
bun install

# Start development server
bun run dev

# Type check
bun x tsc --noEmit

# Build for production
bun run build

# Deploy to Cloudflare
bun x wrangler deploy
```

#### Extension

```bash
cd opengrammar/extension

# Install dependencies
bun install

# Start development (watch mode)
bun run dev

# Build for production
bun run build

# Type check
bun x tsc --noEmit
```

### Testing Your Changes

1. **Build Extension**
   ```bash
   bun run build
   ```

2. **Load in Browser**
   - Open `chrome://extensions/`
   - Enable Developer Mode
   - Click "Load unpacked"
   - Select `extension/dist` folder

3. **Test Features**
   - Type in text boxes
   - Check grammar detection
   - Test tone rewriting
   - Verify settings save

---

## 🔧 Making Changes

### Branch Naming

Use descriptive branch names:
```
feature/add-new-tone
fix/grammar-detection-bug
docs/update-readme
refactor/improve-performance
```

### Commit Messages

Follow conventional commits:
```
feat: add persuasive tone option
fix: correct apostrophe detection
docs: update installation guide
refactor: optimize analyzer performance
test: add unit tests for rewrite API
```

### Making Code Changes

1. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Edit files
   - Add tests
   - Update documentation

3. **Test Locally**
   ```bash
   # Type check
   bun x tsc --noEmit
   
   # Build
   bun run build
   
   # Test in browser
   # Load unpacked extension
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

---

## 📤 Submitting Pull Requests

### Before Submitting

**Checklist:**
- [ ] Code compiles without errors
- [ ] Tests pass (if applicable)
- [ ] Code is formatted
- [ ] Documentation updated
- [ ] Tested in browser
- [ ] No console errors

### Creating PR

1. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open Pull Request**
   - Go to your fork on GitHub
   - Click "Pull requests"
   - Click "New pull request"
   - Select your branch
   - Compare to `main` branch

3. **Fill Out Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   Describe how you tested:
   - [ ] Manual testing in browser
   - [ ] Unit tests added/updated
   - [ ] Tested on Chrome/Brave/Edge

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] No console errors
   - [ ] Documentation updated
   ```

4. **Submit PR**
   - Click "Create pull request"
   - Wait for review
   - Respond to feedback

### PR Review Process

1. **Automated Checks**
   - CI/CD runs tests
   - Type checking
   - Build verification

2. **Maintainer Review**
   - Code quality check
   - Functionality verification
   - Security review

3. **Feedback & Changes**
   - Respond to comments
   - Make requested changes
   - Push updates to branch

4. **Merge**
   - PR approved
   - All checks pass
   - Merged to main

---

## 📝 Code Style

### TypeScript

**General Guidelines:**
```typescript
// Use interfaces for types
interface GrammarIssue {
  type: 'grammar' | 'spelling' | 'style';
  original: string;
  suggestion: string;
  reason: string;
}

// Use arrow functions
const analyze = (text: string): GrammarIssue[] => {
  // Implementation
};

// Use template literals
const message = `Found ${issues.length} issues`;

// Use optional chaining
const length = text?.length ?? 0;
```

**Naming Conventions:**
```typescript
// Variables: camelCase
const grammarRules = [];

// Functions: camelCase
function analyzeText() {}

// Classes: PascalCase
class GrammarAnalyzer {}

// Interfaces: PascalCase
interface AnalyzerConfig {}

// Constants: UPPER_SNAKE_CASE
const MAX_TEXT_LENGTH = 50000;
```

### React/JSX

**Component Structure:**
```typescript
import React, { useState, useEffect } from 'react';

interface Props {
  title: string;
  onSave: (data: any) => void;
}

export const MyComponent: React.FC<Props> = ({ title, onSave }) => {
  const [state, setState] = useState('');
  
  return (
    <div className="container">
      <h1>{title}</h1>
    </div>
  );
};
```

**CSS Classes:**
```typescript
// Use Tailwind CSS classes
<div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
  Content
</div>
```

---

## 📚 Adding Grammar Rules

### Where Rules Live

Rules are in `backend/src/analyzer-simple.ts`

### Rule Structure

```typescript
{
  pattern: /\bteh\b/gi,
  suggestion: 'the',
  reason: 'Misspelled word. The correct spelling is "the".',
  type: 'spelling',
  severity: 'error'
}
```

### Adding a New Rule

**Example: Add "alot" → "a lot"**

```typescript
// In analyzer-simple.ts
checkCommonMisspellings(text: string): GrammarIssue[] {
  const issues: GrammarIssue[] = [];
  
  const rules = [
    {
      pattern: /\balot\b/gi,
      suggestion: 'a lot',
      reason: '"Alot" is not a word. Use "a lot" (two words).',
      type: 'spelling',
      severity: 'error'
    },
    // Add more rules here
  ];
  
  // Rule checking logic
  return issues;
}
```

### Testing Rules

```typescript
// Test the rule
const text = "I have alot of work";
const issues = checkCommonMisspellings(text);
console.log(issues); // Should detect "alot"
```

### Rule Categories

**1. Spelling**
```typescript
{
  pattern: /\brecieve\b/gi,
  suggestion: 'receive',
  reason: 'Misspelled word',
  type: 'spelling'
}
```

**2. Grammar**
```typescript
{
  pattern: /\bme and [a-z]+\b/gi,
  suggestion: 'I and [name]',
  reason: 'Use subject pronoun',
  type: 'grammar'
}
```

**3. Style**
```typescript
{
  pattern: /\bvery good\b/gi,
  suggestion: 'excellent',
  reason: 'Consider a stronger word',
  type: 'style'
}
```

**4. Clarity**
```typescript
{
  pattern: /.{35,}/g,  // Sentences > 35 chars
  suggestion: 'Shorten sentence',
  reason: 'Sentence may be hard to read',
  type: 'clarity'
}
```

---

## 📖 Documentation

### Documentation Structure

```
docs/
├── 00-index.md           # Documentation index
├── 01-quick-start.md     # Quick start guide
├── 04-browser-extension-setup.md
├── 05-backend-deployment.md
├── 06-docker-self-hosting.md
├── 07-ai-providers.md
├── 09-using-opengrammar.md
├── 10-tone-rewriting.md
├── 11-writing-statistics.md
├── 12-keyboard-shortcuts.md
├── 15-api-reference.md
├── 18-troubleshooting.md
├── 19-faq.md
└── 21-contributing.md    # This file
```

### Documentation Guidelines

**Writing Style:**
- Clear and concise
- Use active voice
- Include examples
- Add screenshots when helpful

**Markdown Format:**
```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold** for emphasis
`Code` for commands/paths
> Blockquotes for notes

- Bullet lists
1. Numbered lists

[Links](url)
![Images](url)
```

**Code Blocks:**
````markdown
```bash
# Bash commands
npm install
```

```typescript
// TypeScript code
const value = 42;
```

```json
// JSON examples
{
  "key": "value"
}
```
````

---

## 🌟 Community

### Communication Channels

**GitHub:**
- [Issues](https://github.com/swadhinbiswas/opengrammar/issues) - Bug reports
- [Discussions](https://github.com/swadhinbiswas/opengrammar/discussions) - Questions
- [Pull Requests](https://github.com/swadhinbiswas/opengrammar/pulls) - Code contributions

**Discord:** (if available)
- Join server link
- Introduce yourself
- Ask questions in #help channel

### Code of Conduct

**Be respectful:**
- Welcome all contributors
- No harassment
- Constructive feedback
- Inclusive language

**Report issues:**
- Contact maintainers
- Use private channels for sensitive issues

### Recognition

**Contributors get:**
- Credit in README
- Contributor badge
- Shout-outs in releases
- Community recognition

---

## 🎓 Learning Resources

### Recommended Reading

**Browser Extensions:**
- [Chrome Extensions Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

**TypeScript:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

**React:**
- [React Docs](https://react.dev/)
- [React Patterns](https://reactpatterns.com/)

### Getting Help

**Stuck?**
1. Check existing issues
2. Search documentation
3. Ask in discussions
4. Contact maintainers

**Want to pair program?**
- Reach out to maintainers
- Join community calls
- Participate in hackathons

---

## 🏆 Contributor Recognition

### Contributor Levels

**First Contribution:**
- Welcome message
- Contributor badge
- Merged PR

**Regular Contributor (5+ PRs):**
- Featured in release notes
- Contributor spotlight
- Direct input on features

**Core Contributor (20+ PRs):**
- Write access to repository
- Vote on major decisions
- Represent project

### Hall of Fame

Top contributors featured in:
- README.md
- Release notes
- Project website
- Conference talks

---

## 📞 Contact Maintainers

**For questions:**
- GitHub Discussions
- Discord server
- Email (if listed)

**For sensitive issues:**
- Private message maintainers
- Email security contact
- Report vulnerabilities privately

---

**Thank you for contributing to OpenGrammar! 🎉**

Your contributions make OpenGrammar better for everyone!
