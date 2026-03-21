# Code Review Guidelines

This document outlines the code review process and expectations for OpenGrammar contributors.

## Review Process

### For Contributors

1. **Before Submitting**
   - Run all tests locally: `make test`
   - Run linter: `make lint`
   - Format code: `npm run format`
   - Self-review your changes
   - Update documentation if needed

2. **PR Description**
   - Clearly describe the problem being solved
   - Explain the solution approach
   - List any breaking changes
   - Include testing steps
   - Add screenshots for UI changes

3. **Responding to Feedback**
   - Acknowledge all review comments
   - Address concerns promptly
   - Ask clarifying questions if needed
   - Update code based on feedback
   - Re-request review after changes

### For Reviewers

1. **Review Timeline**
   - Acknowledge PRs within 24 hours
   - Complete review within 48 hours
   - Mark as "Changes Requested" or "Approved"

2. **Review Focus Areas**
   - Code correctness
   - Test coverage
   - Performance implications
   - Security considerations
   - Documentation completeness
   - Adherence to project conventions

## Code Quality Standards

### TypeScript

```typescript
// ✅ Good: Explicit types, clear naming
interface UserPreferences {
  apiKey: string;
  provider: LLMProvider;
  enabledFeatures: FeatureFlag[];
}

// ❌ Avoid: Implicit any, vague names
interface Props {
  data: any;
  stuff: string[];
}
```

### Error Handling

```typescript
// ✅ Good: Specific error handling
try {
  const result = await analyzeText(text);
  return { success: true, data: result };
} catch (error) {
  if (error instanceof APIError) {
    logger.error('API failed', { error, textLength: text.length });
    return { success: false, error: error.message };
  }
  throw error;
}

// ❌ Avoid: Silent failures
try {
  await doSomething();
} catch (e) {
  // empty catch
}
```

### Testing

```typescript
// ✅ Good: Descriptive test names, clear assertions
describe('RuleBasedAnalyzer', () => {
  it('should detect repeated words in text', () => {
    const issues = RuleBasedAnalyzer.analyze('This is is a test');
    
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0].type).toBe('grammar');
    expect(issues[0].original).toBe('is is');
  });
});

// ❌ Avoid: Vague tests
it('works', () => {
  const result = test();
  expect(result).toBeTruthy();
});
```

### Performance

```typescript
// ✅ Good: Efficient loops, memoization
const issueMap = new Map<string, Issue>();
for (const issue of issues) {
  const key = getIssueKey(issue);
  if (!issueMap.has(key)) {
    issueMap.set(key, issue);
  }
}

// ❌ Avoid: O(n²) operations
for (const issue1 of issues) {
  for (const issue2 of issues) {
    if (issue1.id === issue2.id) {
      // ...
    }
  }
}
```

## Review Checklist

### Functionality
- [ ] Code solves the stated problem
- [ ] No regressions introduced
- [ ] Edge cases handled
- [ ] Error scenarios covered

### Code Quality
- [ ] Follows TypeScript best practices
- [ ] Consistent with existing code style
- [ ] No code duplication
- [ ] Functions are focused and testable

### Testing
- [ ] New tests for new functionality
- [ ] Existing tests updated if needed
- [ ] Test coverage is adequate
- [ ] Tests are deterministic

### Documentation
- [ ] JSDoc comments for exported items
- [ ] README updated for user-facing changes
- [ ] CHANGELOG entry added
- [ ] Code comments explain "why", not "what"

### Security
- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] No new security vulnerabilities
- [ ] API keys handled securely

### Performance
- [ ] No unnecessary re-renders
- [ ] Efficient algorithms used
- [ ] Memory leaks avoided
- [ ] Async operations handled properly

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast adequate
- [ ] ARIA labels added

## Common Review Comments

### Nitpicks (Non-blocking)
- `nit: Consider using const instead of let`
- `style: Add space after comma`
- `naming: Maybe rename this variable for clarity`

### Suggestions (Optional)
- `suggestion: You could simplify this with a map`
- `enhancement: Consider adding a test for edge case X`

### Requests (Blocking)
- `request: Please add error handling here`
- `required: This needs test coverage`
- `concern: This might cause a performance issue`

## Conflict Resolution

If reviewers disagree:

1. Discuss in PR comments
2. Seek input from maintainers
3. Consider creating a follow-up issue
4. Defer to project maintainer for final decision

## Approval Requirements

### Minor Changes (Docs, Tests)
- 1 approval from any contributor

### Bug Fixes
- 1 approval from maintainer
- All tests passing

### New Features
- 2 approvals (1 from maintainer)
- All tests passing
- Documentation updated

### Breaking Changes
- 2 approvals from maintainers
- Migration guide provided
- All tests passing
- Deprecation notices added

## Tools

### Automated Checks
- ESLint for code quality
- Prettier for formatting
- TypeScript compiler for type checking
- GitHub Actions for CI/CD

### Manual Review
- Code diff review
- Local testing
- Performance profiling (if needed)

## Recognition

Reviewers who consistently provide high-quality reviews will be:
- Acknowledged in release notes
- Considered for maintainer status
- Featured in contributor spotlight

---

Thank you for helping maintain code quality in OpenGrammar!
