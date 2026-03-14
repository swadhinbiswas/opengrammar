# ❓ Frequently Asked Questions (FAQ)

Common questions about OpenGrammar answered.

---

## 📖 Table of Contents

1. [General Questions](#general-questions)
2. [Installation & Setup](#installation--setup)
3. [Features & Usage](#features--usage)
4. [Privacy & Security](#privacy--security)
5. [AI Providers](#ai-providers)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)

---

## 🎯 General Questions

### What is OpenGrammar?

OpenGrammar is a free, open-source browser extension that helps you write clearly and confidently. It's a privacy-first alternative to Grammarly that runs in your browser and can work completely offline.

### Is OpenGrammar really free?

**Yes!** OpenGrammar is 100% free and open-source. You can:
- Use the rule-based grammar checker for free (offline)
- Bring your own API key for AI features (pay only what you use)
- Self-host the backend for free
- Modify and distribute the code

### How is OpenGrammar different from Grammarly?

| Feature | Grammarly | OpenGrammar |
|---------|-----------|-------------|
| **Cost** | $12/month for premium | Free |
| **Privacy** | Sends data to servers | Your data stays local |
| **Open Source** | No | Yes |
| **Offline Mode** | Limited | Full offline support |
| **AI Providers** | Only Grammarly's AI | Choose from 6+ providers |
| **Self-Hosting** | No | Yes |

### What browsers are supported?

OpenGrammar works on all Chromium-based browsers:
- ✅ Google Chrome (88+)
- ✅ Brave (1.20+)
- ✅ Microsoft Edge (88+)
- ✅ Opera (74+)
- ✅ Vivaldi (3.6+)

Firefox support is available but temporary (must reload each session).

### Is OpenGrammar open-source?

**Yes!** The entire codebase is open-source under the Apache 2.0 license. You can:
- View the source code on GitHub
- Contribute improvements
- Fork and modify
- Self-host your own version

---

## 📥 Installation & Setup

### How do I install OpenGrammar?

1. Clone the repository or download the release
2. Build the extension: `bun run build`
3. Load unpacked in your browser
4. Configure settings

See [Browser Extension Setup](04-browser-extension-setup.md) for detailed instructions.

### Do I need to deploy a backend?

**No, but it's recommended.** You have options:

**Option 1: Local Backend (Recommended for testing)**
- Run backend on your computer
- Free, full control
- Requires Node.js

**Option 2: Cloud Backend (Recommended for production)**
- Deploy to Cloudflare Workers, Vercel, etc.
- Free tiers available
- Access from anywhere

**Option 3: Rule-Based Only**
- No backend needed
- Works offline
- Basic grammar checking only

### Is technical knowledge required?

**Basic setup:** Minimal technical knowledge needed
- Follow step-by-step guides
- Copy-paste commands
- Configure in UI

**Advanced setup:** Some technical knowledge helpful
- Deploying to cloud platforms
- Running local servers
- Configuring API keys

### How long does setup take?

- **Quick setup:** 5-10 minutes
- **With cloud deployment:** 15-20 minutes
- **With local LLM:** 30 minutes

---

## 🎨 Features & Usage

### What features are included?

**Grammar Checking:**
- 40+ grammar rules
- Spelling correction
- Punctuation checks
- Style suggestions

**AI Features:**
- Advanced grammar checking
- Tone rewriting (8 tones)
- Context understanding
- Writing statistics

**Privacy Features:**
- Local rule-based checking
- Self-hostable backend
- No data retention
- Bring your own API key

### Does it work offline?

**Yes!** The rule-based grammar checker works completely offline without any internet connection. AI features require internet for cloud providers, but you can use local LLMs (Ollama) for offline AI.

### What websites does it work on?

OpenGrammar works on most websites with text inputs:
- ✅ Gmail
- ✅ Google Docs
- ✅ Notion
- ✅ Twitter/X
- ✅ Facebook
- ✅ LinkedIn
- ✅ Reddit
- ✅ Any custom text box

Some sites may need to be manually enabled in settings.

### Can I use it on mobile?

Currently, OpenGrammar is designed for **desktop browsers only**. Mobile browser extensions have limited support. We're working on mobile support in future releases.

### How do I disable it on certain sites?

1. Click extension icon
2. Toggle "Enable on this site" OFF
3. Or go to Options → Site-Specific Settings
4. Add domains to disable list

### Can I add custom words?

**Yes!** Use the Custom Dictionary:
1. Right-click extension → Options
2. Go to Custom Dictionary
3. Add your words
4. Words won't be flagged as errors

---

## 🔒 Privacy & Security

### Is my data safe?

**Yes!** OpenGrammar is designed with privacy in mind:

**Rule-Based Checking:**
- 100% local in your browser
- No data leaves your computer
- Works offline

**AI Checking:**
- Text sent directly to your chosen provider
- Backend is stateless (doesn't store data)
- No databases or user accounts
- API keys stored locally in browser

### Do you store my API keys?

**No.** API keys are:
- Stored in your browser's local storage (encrypted by Chrome)
- Never sent to OpenGrammar servers
- Only used to authenticate with AI providers
- Under your complete control

### What data is sent to AI providers?

When using AI features:
- Your text is sent to the provider (OpenAI, Groq, etc.)
- Provider processes the text
- Returns suggestions
- Text is **not stored** by the provider (check their policies)

### Can I run everything locally?

**Yes!** Complete local setup:
1. Run backend locally (Docker or Node.js)
2. Use Ollama for local LLM
3. Everything stays on your computer
4. 100% offline, 100% private

### Is the code auditable?

**Yes!** Being open-source means:
- Anyone can review the code
- Security researchers can audit
- Community can verify privacy claims
- Transparent development

---

## 🤖 AI Providers

### Which AI provider should I use?

**For free usage:** Groq
- 100 requests/day free
- Fast inference
- Good quality (Llama 3.1 70B)

**For best quality:** OpenAI
- GPT-4o-mini model
- Highest accuracy
- Low cost (~$0.15/1K requests)

**For privacy:** Ollama
- Run models locally
- No API calls
- Complete privacy

**For variety:** OpenRouter
- Access to 100+ models
- Claude, Llama, Mistral, etc.
- Pay-per-use

### Do I need an API key?

**For rule-based checking:** No API key needed

**For AI features:** Yes, but you have options:
- Get free Groq key (100/day free)
- Use your existing OpenAI key
- Run Ollama locally (no key needed)

### How much does it cost?

**Free options:**
- Groq: 100 requests/day free
- Ollama: Free (your hardware)
- Rule-based: Completely free

**Paid options:**
- OpenAI GPT-4o-mini: ~$0.15 per 1K requests
- Typical user: $0.50-2/month
- Heavy user: $5-10/month

### Can I switch providers?

**Yes!** You can switch providers anytime:
1. Click extension → Settings
2. Change provider dropdown
3. Enter new API key (if needed)
4. Save settings

### What if I hit rate limits?

**Groq free tier:** 100 requests/day
- Wait 24 hours for reset
- Or upgrade to paid plan

**Other providers:** Check their limits
- Most have free tiers
- Upgrade if needed
- Use rule-based as fallback

---

## 🔧 Troubleshooting

### Why isn't it working?

**Most common issues:**

1. **Extension not enabled**
   - Check chrome://extensions/
   - Enable OpenGrammar

2. **Backend not running**
   - Start backend: `bun run dev`
   - Check health: `curl localhost:8787/health`

3. **Site disabled**
   - Check Options → Site-Specific Settings
   - Enable current site

4. **No API key**
   - Add API key in Settings
   - Or use rule-based only

See [Troubleshooting Guide](18-troubleshooting.md) for detailed help.

### Why is it slow?

**Possible causes:**
- AI provider latency (try Groq for speed)
- Long text (check in chunks)
- Slow internet connection
- Backend on free tier (upgrade or self-host)

### Why are there false positives?

**Reasons:**
- Technical terms not in dictionary
- Proper nouns (names, places)
- Industry jargon
- Made-up words

**Solution:** Add words to Custom Dictionary

### How do I report a bug?

1. Go to [GitHub Issues](https://github.com/swadhinbiswas/opengrammar/issues)
2. Search for similar issues
3. Create new issue with:
   - Description
   - Steps to reproduce
   - Expected behavior
   - Screenshots (if helpful)
   - Debug information

---

## 🤝 Contributing

### How can I contribute?

**Non-developers:**
- Report bugs
- Suggest features
- Improve documentation
- Share with others

**Developers:**
- Fix bugs
- Add features
- Improve performance
- Add grammar rules
- Write tests

### Do I need to be an expert?

**No!** All skill levels welcome:
- Beginners: Fix typos, improve docs
- Intermediate: Add grammar rules
- Advanced: New features, optimizations

### How do I add grammar rules?

See [Grammar Rules Guide](16-grammar-rules.md):
1. Open `backend/src/analyzer-simple.ts`
2. Add regex pattern
3. Add suggestion and reason
4. Test and submit PR

### Is there a reward for contributing?

**Intrinsic rewards:**
- Help thousands of users
- Improve your coding skills
- Build your portfolio
- Join open-source community

**No monetary rewards** - this is a community project

---

## 📊 Technical Questions

### What technology stack is used?

**Extension:**
- React + TypeScript
- Vite (bundler)
- Manifest V3
- Tailwind CSS

**Backend:**
- Hono (web framework)
- TypeScript
- Cloudflare Workers / Node.js
- OpenAI SDK

**Infrastructure:**
- Docker for self-hosting
- GitHub Actions for CI/CD
- GitHub Pages for docs

### Can I use it programmatically?

**Yes!** The backend provides a REST API:
```bash
curl -X POST http://localhost:8787/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "your text"}'
```

See [API Reference](15-api-reference.md) for details.

### Can I integrate with other tools?

**Yes!** Options include:
- VS Code extension (future)
- Desktop app (Electron)
- Mobile app (React Native)
- API integration in your apps

### What's the roadmap?

See [ROADMAP.md](../ROADMAP.md):
- ✅ v2.1: Tone rewriting, statistics
- 🚧 v3.0: Firefox support, autocomplete
- 📋 v4.0: Desktop apps, Developer API

---

## 💰 Cost Questions

### Is there a premium version?

**No!** OpenGrammar is completely free. No premium tier, no subscriptions, no hidden costs.

### How do you make money?

**We don't.** This is a community open-source project:
- Built by volunteers
- Funded by users (API costs)
- Free to use forever

### Will it stay free?

**Yes!** The project is committed to staying free:
- Apache 2.0 license
- Community-driven
- No monetization plans

---

## 📚 More Questions?

### Where can I find more information?

**Documentation:**
- [Quick Start](01-quick-start.md)
- [User Guide](09-using-opengrammar.md)
- [API Reference](15-api-reference.md)
- [Troubleshooting](18-troubleshooting.md)

**Community:**
- [GitHub Discussions](https://github.com/swadhinbiswas/opengrammar/discussions)
- [GitHub Issues](https://github.com/swadhinbiswas/opengrammar/issues)
- [Discord Server](link-to-discord)

### Still have questions?

**Ask in GitHub Discussions!**
- Community is friendly
- Developers respond quickly
- Others may have same questions

---

**Last Updated:** March 2026  
**Version:** 2.1.0
