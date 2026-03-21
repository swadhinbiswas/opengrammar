# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of OpenGrammar seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **swadhinbiswas.cse@gmail.com**

You should receive a response within 48 hours acknowledging your report. After the initial reply, we will keep you informed of the progress toward a fix and announcement.

### What to Include

Please include the following information in your report:

- A description of the vulnerability
- Steps to reproduce the issue
- Affected versions
- Any potential impact
- If possible, suggestions for addressing the issue

### Security Best Practices We Follow

1. **No Data Storage**: OpenGrammar does not store any user data on servers. All text analysis happens locally or is processed statelessly.

2. **API Key Security**: User API keys are stored locally in browser storage and never transmitted to our servers. They are only sent directly to the chosen LLM provider.

3. **Stateless Processing**: When using the self-hosted backend, no text data is stored or logged. All processing is stateless and ephemeral.

4. **Open Source**: All code is open source and auditable by the community.

5. **Minimal Permissions**: The browser extension requests only the minimum permissions necessary to function.

### Security Recommendations for Users

1. **Use Your Own API Keys**: Always use your own API keys from trusted providers.
2. **Self-Host When Possible**: For maximum privacy, deploy your own backend instance.
3. **Review Permissions**: Regularly review the extension's permissions in your browser.
4. **Keep Updated**: Always use the latest version of OpenGrammar for security fixes.

### Known Security Considerations

- When using cloud-based LLM providers (OpenAI, Groq, etc.), your text is sent to their servers for processing. This is inherent to using AI-powered features.
- For completely offline operation, use only the rule-based analyzer without an API key.
- The extension requires access to all websites to detect and highlight grammar issues in text inputs.

## Bug Bounty Program

Currently, we do not have a formal bug bounty program. However, we greatly appreciate responsible disclosure and will acknowledge contributors who help improve our security (with permission).

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2). Critical security fixes may be released immediately with prior notification to major users.

---

Thank you for helping keep OpenGrammar and our users safe!
