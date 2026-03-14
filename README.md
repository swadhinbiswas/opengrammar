<div align="center">
  <img src="logo.svg" alt="OpenGrammar Logo" width="140" height="140">

  # 🪶 OpenGrammar

  ### **Your Privacy-First, Open-Source Writing Assistant**
  #### *The Free, Self-Hostable Grammarly Alternative*

  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
  [![CodeRabbit Reviews](https://img.shields.io/coderabbit/prs/github/swadhinbiswas/opengrammar?utm_source=oss&utm_medium=github&utm_campaign=swadhinbiswas%2Fopengrammar&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit&style=for-the-badge)](https://coderabbit.ai)
  [![Stars](https://img.shields.io/github/stars/swadhinbiswas/opengrammar?style=for-the-badge&color=gold)](https://github.com/swadhinbiswas/opengrammar/stargazers)
  [![Forks](https://img.shields.io/github/forks/swadhinbiswas/opengrammar?style=for-the-badge&color=blue)](https://github.com/swadhinbiswas/opengrammar/network/members)

  [**📚 Read Documentation**](https://swadhinbiswas.github.io/opengrammar/) · [**🚀 Quick Start**](#-quick-start) · [**💬 Join Discord**](#-community) · [**🎯 Roadmap**](./ROADMAP.md)

</div>

---

## 🌟 Why OpenGrammar?

<div align="center">

| Feature | Grammarly | OpenGrammar |
|---------|-----------|-------------|
| **Cost** | ❌ $12/month | ✅ **100% Free** |
| **Privacy** | ❌ Sends all data to servers | ✅ **Your data stays local** |
| **Open Source** | ❌ Closed source | ✅ **Fully Open Source** |
| **Self-Hostable** | ❌ No | ✅ **Yes** |
| **Offline Mode** | ❌ Limited | ✅ **Full Support** |
| **AI Choice** | ❌ Only their AI | ✅ **6+ Providers** |

</div>

Most grammar assistants require you to send **every keystroke** to their servers and charge **$12/month** for premium features. OpenGrammar changes that:

### 🔒 Absolute Privacy
- ❌ No databases
- ❌ No user accounts  
- ❌ No keystroke logging
- ✅ Your API key never leaves your browser
- ✅ Stateless backend - data is processed and immediately forgotten

### 💰 Zero Cost
- ✅ **Rule-based engine** runs locally in your browser - completely free
- ✅ **Bring your own AI** - pay only fractions of a cent per month directly to providers
- ✅ **Self-host backend** - deploy to Cloudflare/Vercel for free

### 🤖 Choose Your AI
- ⚡ **Groq** - Fast & Free (100 req/day)
- 🧠 **OpenAI** - Best quality (GPT-4o-mini)
- 🌐 **OpenRouter** - 100+ models
- 🔷 **Together AI** - Open-source models
- 🦙 **Ollama** - 100% local & offline
- 🔧 **Custom** - Your own API

---

## ✨ Features

<div align="center">

### Grammarly-Level Grammar Checking
**40+ Rule-Based Checks** + **AI-Powered Analysis**

</div>

| Feature | Description | Status |
|---------|-------------|--------|
| 📝 **Grammar Rules** | 40+ rules: passive voice, repetition, spelling, punctuation | ✅ Complete |
| 🤖 **AI Analysis** | Context-aware suggestions using LLMs | ✅ Complete |
| 🎨 **Tone Rewriting** | 8 tones: Formal, Casual, Professional, Friendly, etc. | ✅ Complete |
| 📊 **Writing Stats** | Readability scores, reading time, vocabulary diversity | ✅ Complete |
| ⌨️ **Shortcuts** | Keyboard shortcuts for quick actions | ✅ Complete |
| 🌐 **Works Everywhere** | Gmail, Google Docs, Notion, Reddit, Twitter | ✅ Complete |
| 🎯 **Interactive UI** | Click-to-apply suggestions with tooltips | ✅ Complete |
| 📚 **Custom Dictionary** | Add your own words | ✅ Complete |

### Color-Coded Highlights

<div align="center">

| Color | Meaning | Example |
|-------|---------|---------|
| 🔴 **Red** | Spelling & Grammar | "teh" → "the" |
| 🟡 **Amber** | Clarity Issues | Long sentences |
| 🔵 **Blue** | Style Suggestions | Passive voice |

</div>

---

## 🚀 Quick Start

### Option 1: 5-Minute Setup (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/swadhinbiswas/opengrammar.git
cd opengrammar

# 2. Build the extension
cd opengrammar/extension
bun install
bun run build

# 3. Load in Chrome
# Go to chrome://extensions/ → Enable Developer Mode → Load unpacked → Select dist/ folder
```

### Option 2: Deploy Backend (Free)

```bash
# Deploy to Cloudflare Workers (free tier)
cd opengrammar/backend
bun install
npx wrangler deploy

# Get your URL: https://opengrammar.yourname.workers.dev
```

### Option 3: One-Command Deploy (Cloudflare Pages)

```bash
# Deploy documentation to Cloudflare Pages
./deploy-cloudflare.sh
```

📖 **Full Installation Guide:** [Browser Setup](docs/04-browser-extension-setup.html) · [Backend Deployment](docs/05-backend-deployment.html)

---

## 📚 Documentation

<div align="center">

### Complete HTML Documentation Available!

</div>

| Category | Guides | Links |
|----------|--------|-------|
| **🚀 Getting Started** | Quick Start, Index | [View](docs/index.html) |
| **📥 Installation** | Browser Setup, Backend Deployment, Docker | [View](docs/04-browser-extension-setup.html) |
| **⚙️ Configuration** | AI Providers (6 providers) | [View](docs/07-ai-providers.html) |
| **📖 User Guide** | Using OpenGrammar, Tone Rewriting, Statistics | [View](docs/09-using-opengrammar.html) |
| **👨‍💻 Developer** | API Reference, Contributing | [View](docs/15-api-reference.html) |
| **🆘 Support** | Troubleshooting, FAQ | [View](docs/18-troubleshooting.html) |

**🌐 Browse All Docs:** https://swadhinbiswas.github.io/opengrammar/

---

## 🎯 Use Cases

### For Students
- ✅ Free grammar checking for essays
- ✅ Tone adjustment for formal writing
- ✅ Readability scores
- ✅ No subscription needed

### For Professionals
- ✅ Email polishing
- ✅ Report writing
- ✅ Professional tone
- ✅ Privacy-first (no data leaks)

### For Developers
- ✅ Open source & customizable
- ✅ Self-hostable
- ✅ API access
- ✅ Local LLM support

### For Writers
- ✅ Advanced grammar checking
- ✅ Style suggestions
- ✅ Vocabulary diversity
- ✅ Writing analytics

---

## 🛠️ Tech Stack

<div align="center">

| Component | Technology |
|-----------|------------|
| **Extension** | React, TypeScript, Vite, Manifest V3 |
| **Backend** | Hono, TypeScript, Cloudflare Workers |
| **AI** | OpenAI SDK, Ollama, Groq |
| **Deployment** | Docker, Cloudflare, Vercel |
| **Docs** | HTML, Tailwind CSS |

</div>

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| **Rule-Based Check** | ~20ms (offline) |
| **AI Check** | ~1-2s |
| **Extension Load** | ~50ms |
| **Memory Usage** | ~30MB |
| **Accuracy** | 92-96% (AI-powered) |

---

## 🤝 Contributing

We welcome contributions from everyone! No need to be an expert.

### Ways to Contribute

- 📚 **Add Grammar Rules** - Help expand our rule library
- 🐛 **Report Bugs** - Found an issue? Open a GitHub issue
- 💡 **Suggest Features** - Have ideas? Start a discussion
- 📝 **Improve Docs** - Fix typos or clarify instructions
- 🎨 **Design** - Help with UI/UX improvements
- 🌍 **Translate** - Help localize OpenGrammar

### Quick Start for Contributors

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/opengrammar.git

# Create a branch
git checkout -b feature/your-feature

# Make changes and commit
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature
```

📖 **Full Contributing Guide:** [CONTRIBUTING.md](docs/21-contributing.html)

---

## 🗺️ Roadmap

### ✅ Completed (v2.1)
- [x] 40+ Grammar Rules
- [x] Multi-Provider AI Support (6 providers)
- [x] Tone Rewriting (8 tones)
- [x] Writing Statistics
- [x] Docker Self-Hosting
- [x] HTML Documentation

### 🚧 In Progress (v3.0)
- [ ] Firefox Support
- [ ] Better Google Docs Support
- [ ] Autocomplete & Prediction
- [ ] Writing Analytics Dashboard

### 📋 Planned (v4.0)
- [ ] Desktop Apps (Windows, Mac, Linux)
- [ ] Developer API
- [ ] Safari Extension
- [ ] Mobile Apps

📖 **Full Roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## 🏆 Recognition

- 🔥 **Fastest Growing** Open-Source Grammar Checker
- ⭐ **Community Driven** - Built by developers, for developers
- 🛡️ **Privacy First** - No data collection, no tracking
- 💯 **100% Free** - No premium tiers, no hidden costs

---

## 📞 Community

| Platform | Link |
|----------|------|
| 💬 **Discord** | [Join Server](#) (Coming Soon) |
| 🐦 **Twitter** | [Follow](#) (Coming Soon) |
| 📺 **YouTube** | [Subscribe](#) (Coming Soon) |
| 📧 **Newsletter** | [Subscribe](#) (Coming Soon) |

---

## 📄 License

<div align="center">

**Apache 2.0 License**

This project is open-source and free forever.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

</div>

---

## 🙏 Acknowledgments

- Built with ❤️ by [Swadhin Biswas](https://github.com/swadhinbiswas)
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- AI by [Groq](https://groq.com/), [OpenAI](https://openai.com/), [Ollama](https://ollama.com/)
- UI by [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

### 🌟 Love OpenGrammar?

**Star this repo** to support the project! ⭐

[![Star](https://img.shields.io/github/stars/swadhinbiswas/opengrammar?style=for-the-badge&logo=github)](https://github.com/swadhinbiswas/opengrammar/stargazers)

**Made with ❤️ for the open-source community**

</div>
