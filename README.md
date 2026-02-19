# 🪶 OpenGrammar

**Your privacy-first, open-source writing assistant.**

OpenGrammar is a powerful, self-hostable browser extension that helps you write clearly and confidently everywhere on the web. It's built to feel like the premium writing assistants you know, but with a critical difference: **you control your data, and it can run completely for free.**

---

## 🌟 Why OpenGrammar?

Most popular grammar assistants require you to send every keystroke to their servers and charge a hefty monthly fee for advanced features. OpenGrammar changes that:

1.  **Zero Cost Option:** The core engine runs locally in your browser, checking for passive voice, repetition, and readability without needing a server or an internet connection.
2.  **Bring Your Own AI:** Want advanced, context-aware grammar corrections? Just paste in your own API key (like OpenAI, Groq, or OpenRouter). You pay only fractions of a cent for what you actually use, directly to the AI provider.
3.  **Absolute Privacy:** We don't have a database. We don't have user accounts. Your API key never leaves your browser. If you use the AI features, your text is sent securely to a stateless edge function, processed, and immediately forgotten.
4.  **Open Source & Self-Hosted:** You can deploy the backend to Cloudflare Workers or Vercel Edge for free in one command. You own the infrastructure.

## ✨ Features

-   **Works Everywhere:** Seamlessly integrates into text inputs, textareas, and rich text editors (like Gmail, Google Docs, Notion, and Reddit).
-   **Blazing Fast:** Built with modern web technologies (React, Vite, Manifest V3) for minimal performance impact.
-   **Dual-Engine Architecture:**
    -   *Rule-Based (Free & Offline):* Catches passive voice, repeated words, and overly long sentences.
    -   *AI-Powered (Requires API Key):* Advanced grammar, spelling, clarity, and stylistic suggestions using models like GPT-4 or open-source alternatives via OpenRouter.
-   **Intuitive UI:** Familiar red, yellow, and blue underlines with click-to-apply suggestions.
-   **Customizable:** Toggle the extension on or off per website, choose your preferred AI model, and manage your privacy settings.

---

## 🚀 Getting Started (For Users)

*Note: Since this is an open-source developer project, it is not yet published on the Chrome Web Store. You will need to load it manually.*

1.  **Download the Extension:** Download the latest release from the [Releases page] (or build it from source following the Developer guide below).
2.  **Open Extensions Page:** In Chrome, go to `chrome://extensions/`.
3.  **Enable Developer Mode:** Toggle the switch in the top right corner.
4.  **Load Unpacked:** Click the "Load unpacked" button and select the `opengrammar/extension/dist` folder you downloaded.
5.  **Configure:** Click the OpenGrammar icon in your browser toolbar. If you want advanced AI features, paste your OpenAI or OpenRouter API key here. It is saved locally on your device.

---

## 💻 Developer Guide: Build & Deploy

Want to build OpenGrammar from scratch or deploy your own backend? Here is how.

### Prerequisites

-   Node.js (v18 or newer)
-   npm, pnpm, or yarn

### 1. Set up the Backend (Serverless Edge API)

The backend is a lightweight API that securely handles the AI requests. It's designed to run on Cloudflare Workers (or Vercel Edge), which are incredibly fast and offer generous free tiers.

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
# Open src/background/index.ts and replace the BACKEND_URL with your deployed URL from step 1 (or leave as localhost for local testing).

# Build the extension
npm run build
```

This will create a `dist/` folder. Load this folder into Chrome following the "Getting Started (For Users)" instructions above.

---

## 🤝 Contributing

OpenGrammar is a community effort! Whether you want to add new local grammar rules, improve the highlighting logic in rich text editors, or fix bugs, we welcome your contributions. Please check out our `ROADMAP.md` for inspiration.

## 📄 License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.
