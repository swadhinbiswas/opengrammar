# Contributing to OpenGrammar

First off, thank you for considering contributing to OpenGrammar! It's people like you that make OpenGrammar such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct.

## How Can I Contribute?

### Reporting Bugs

- **Check if it has already been reported** by searching through GitHub issues.
- If you can't find an open issue addressing the problem, **open a new one** using the Bug Report template.

### Suggesting Enhancements

- **Check if it has already been suggested** by searching through GitHub issues.
- **Open a new issue** using the Feature Request template.

### Pull Requests

1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies** using Bun: `bun install`.
3. **Make your changes**.
4. **Ensure the code passes all checks**: Run `bun x tsc` in the relevant directories.
5. **Issue a Pull Request** with a clear description of your changes.

## Development Setup

We use **Bun** as our primary runtime and package manager.

```bash
# Backend
cd opengrammar/backend
bun install
bun dev

# Extension
cd opengrammar/extension
bun install
bun run dev
```

## Community

If you have questions or want to discuss ideas, feel free to open a GitHub Discussion!
