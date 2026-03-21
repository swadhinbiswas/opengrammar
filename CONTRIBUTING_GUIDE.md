# Contributing Guide

Thank you for your interest in contributing to OpenGrammar! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Adding Grammar Rules](#adding-grammar-rules)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Documentation](#documentation)

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Be respectful and inclusive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/opengrammar.git
   cd opengrammar
   ```
3. **Set up upstream** to sync with the original repository
   ```bash
   git remote add upstream https://github.com/swadhinbiswas/opengrammar.git
   ```

## Development Setup

### Prerequisites

- Node.js 18 or newer
- npm, pnpm, or yarn
- Git

### Install Dependencies

```bash
# Using Makefile (recommended)
make install

# Or manually
cd opengrammar/extension && npm install
cd ../backend && npm install
```

### Start Development Servers

```bash
# Start all development servers
make dev

# Or start individually
make dev-extension  # Extension on port 5173
make dev-backend    # Backend on port 8787
```

### Load Extension in Chrome

1. Build the extension: `make build-extension`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `opengrammar/extension/dist` folder

## Making Changes

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `chore/description` - Maintenance tasks
- `refactor/description` - Code refactoring
- `test/description` - Test additions/changes

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `chore`: Maintenance
- `refactor`: Code refactoring
- `test`: Tests
- `ci`: CI/CD changes

**Example:**
```
feat(analyzer): add passive voice detection

- Implement regex-based passive voice detection
- Add tests for common passive constructions
- Update documentation

Closes #123
```

## Adding Grammar Rules

### Rule-Based Analyzer

Grammar rules are defined in `opengrammar/backend/src/analyzer-simple.ts`.

#### Adding a Simple Rule

```typescript
private static checkYourNewRule(text: string): Issue[] {
  const issues: Issue[] = [];
  
  const pattern = /\byour-pattern\b/gi;
  const matches = text.matchAll(pattern);
  
  for (const match of matches) {
    if (match[0] && match.index !== undefined) {
      issues.push({
        type: 'grammar', // or 'spelling', 'clarity', 'style'
        original: match[0],
        suggestion: 'your suggestion',
        reason: 'Explanation of why this is an issue.',
        offset: match.index,
        length: match[0].length,
      });
    }
  }
  
  return issues;
}
```

#### Register the Rule

Add your rule to the `analyze` method:

```typescript
static analyze(text: string): Issue[] {
  const issues: Issue[] = [];
  
  // ... existing rules ...
  issues.push(...this.checkYourNewRule(text));
  
  return issues;
}
```

### AI-Powered Rules

For context-aware suggestions, the LLM analyzer in `analyzer.ts` handles complex grammar checking.

## Testing

### Running Tests

```bash
# Run all tests
make test

# Run backend tests only
cd opengrammar/backend && npm test
```

### Writing Tests

Create test files alongside the code they test:

```typescript
// analyzer.test.ts
import { RuleBasedAnalyzer } from './analyzer-simple';

describe('RuleBasedAnalyzer', () => {
  it('should detect repeated words', () => {
    const issues = RuleBasedAnalyzer.analyze('This is is a test');
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0].type).toBe('grammar');
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update your branch** with latest main
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure tests pass**
   ```bash
   make test
   make lint
   ```

3. **Update documentation** if needed

4. **Push to your fork**
   ```bash
   git push origin your-branch
   ```

5. **Create a Pull Request** on GitHub
   - Use a clear title
   - Describe the changes
   - Reference any related issues
   - Add screenshots if UI changes

### PR Checklist

- [ ] Tests pass locally
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] Changes are atomic and focused

## Documentation

### Code Documentation

- Add JSDoc comments to all exported functions and types
- Document parameters, return values, and errors
- Include examples for complex functionality

### User Documentation

- Update README.md for user-facing changes
- Add to CHANGELOG.md
- Update SETUP_GUIDE.md if setup changes

### API Documentation

Document API endpoints in `docs/api.md`:

```markdown
## POST /analyze

Analyze text for grammar and style issues.

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Text to analyze |
| apiKey | string | No | LLM API key |

### Response

[Example response]
```

## Getting Help

- **Discussions**: Ask questions in GitHub Discussions
- **Issues**: Report bugs in GitHub Issues
- **Email**: Contact maintainers for sensitive matters

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to OpenGrammar! 🎉
