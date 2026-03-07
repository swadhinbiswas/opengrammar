<div align="center">
  <img src="logo.svg" alt="OpenGrammar Logo" width="120" height="120">
  
  # 🪶 OpenGrammar

  **Your privacy-first, open-source writing assistant.**  
  *The free, self-hostable Grammarly alternative.*

  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/swadhinbiswas/opengrammar?utm_source=oss&utm_medium=github&utm_campaign=swadhinbiswas%2Fopengrammar&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)](https://coderabbit.ai)
  [![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

---

OpenGrammar is a powerful, self-hostable browser extension that helps you write clearly and confidently everywhere on the web. It's built to feel like the premium writing assistants you know, but with a critical difference: **you control your data, and it can run completely for free.**

## 🌟 Why OpenGrammar?

Most popular grammar assistants require you to send every keystroke to their servers and charge a hefty monthly fee for advanced features. OpenGrammar changes that:

1. **Zero Cost Option:** The core engine runs locally in your browser, checking for passive voice, repetition, and readability without needing a server or an internet connection.
2. **Bring Your Own AI:** Want advanced, context-aware grammar corrections? Just paste in your own API key (like OpenAI, Groq, or OpenRouter). You pay only fractions of a cent for what you actually use, directly to the AI provider.
3. **Absolute Privacy:** We don't have a database. We don't have user accounts. Your API key never leaves your browser. If you use the AI features, your text is sent securely to a stateless edge function, processed, and immediately forgotten.
4. **Open Source & Self-Hosted:** You can deploy the backend to Cloudflare Workers or Vercel Edge for free in one command. You own the infrastructure.

## ✨ Features

- **Works Everywhere:** Seamlessly integrates into text inputs, textareas, and rich text editors (like Gmail, Google Docs, Notion, and Reddit).
- **Blazing Fast:** Built with modern web technologies (React, Vite, Manifest V3) for minimal performance impact.
- **Dual-Engine Architecture:**
  - *Rule-Based (Free & Offline):* Catches passive voice, repeated words, and overly long sentences.
  - *AI-Powered (Requires API Key):* Advanced grammar, spelling, clarity, and stylistic suggestions using models like GPT-4, Groq, Together, or open-source alternatives via OpenRouter and Ollama.
- **Tone & Style Rewriting:** Right-click context menus or shortcuts to quickly rewrite text in 8 different tones (Formal, Casual, Professional, etc.).
- **Writing Statistics:** Built-in dashboard for readability scores, reading time, and vocabulary diversity.
- **Intuitive UI:** Familiar red, yellow, and blue underlines with click-to-apply suggestions.

## 🚀 Getting Started (For Users)

*Note: Since this is an open-source developer project, it is not yet published on the Chrome Web Store. You will need to load it manually.*

1. **Download the Extension:** Download the latest release or clone this repository.
2. **Open Extensions Page:** In Chrome, go to `chrome://extensions/`.
3. **Enable Developer Mode:** Toggle the switch in the top right corner.
4. **Load Unpacked:** Click the "Load unpacked" button and select the `opengrammar/extension/dist` folder you built or downloaded.
5. **Configure:** Click the OpenGrammar icon in your browser toolbar. Paste your OpenAI, Groq, or OpenRouter API key to enable advanced AI capabilities.

## 💻 Developer Guide: Build & Deploy

Want to build OpenGrammar from scratch or deploy your own backend? Here is how.

### Prerequisites

- Node.js (v18 or newer)
- npm, pnpm, or yarn

### 1. Set up the Backend (Serverless Edge API)

The backend is a lightweight API that securely handles the AI requests.

```bash
# Navigate to the backend folder
cd opengrammar/backend

# Install dependencies
npm install

# Run locally for testing (runs on http://localhost:8787)
npm run dev

# Deploy to Cloudflare Workers (requires a free Cloudflare account)
npx wrangler deploy
```
*After deploying, copy the provided URL (e.g., `https://opengrammar.yourname.workers.dev`).*

### 2. Set up the Chrome Extension

```bash
# Navigate to the extension folder
cd opengrammar/extension

# Install dependencies
npm install

# IMPORTANT: Link your Backend
# Open src/background/index.ts and replace the BACKEND_URL with your deployed URL from step 1.

# Build the extension
npm run build
```

This will create a `dist/` folder. Load this folder into Chrome following the user instructions above.

## 🤝 Contributing & Help Needed

**We need your help to make OpenGrammar the best open-source writing assistant!**

One of our primary goals is to build the most comprehensive library of local (offline) grammar and style rules. You don't need to be a developer to help—if you have a good eye for grammar, you can contribute!

- **📚 Add Grammar Rules:** Help us expand our `analyzer-simple.ts` with more regex-based rules for common mistakes, style improvements, and clarity checks. See [GRAMMAR_RULES.md](./GRAMMAR_RULES.md) for a guide on how to add them.
- **🐛 Report Bugs:** Found a website where the highlighting is wonky? Open an issue!
- **💡 Suggest Features:** Have an idea for a cool new feature? Let's discuss it in the Discussions tab.

Please check out our [CONTRIBUTING.md](./CONTRIBUTING.md) and `ROADMAP.md` for more details.

## 📄 License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.
