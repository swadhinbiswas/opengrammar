# 🗺️ OpenGrammar Roadmap

Our vision is to build the most capable, privacy-respecting, and customizable writing assistant in the world. OpenGrammar is designed to be a completely open-source alternative to premium grammar tools.

This roadmap outlines the major phases of development, from the initial MVP to advanced features and broader platform support. It is a living document and will evolve based on community feedback and technological advancements.

---

## ✅ Phase 1: Foundation & MVP (Completed)

The goal of this phase was to establish a solid, functional, and secure base architecture.

*   [x] **Chrome Extension Skeleton:** Manifest V3 setup with React and Vite.
*   [x] **Serverless Backend:** A stateless Hono API deployable to edge networks (Cloudflare/Vercel).
*   [x] **Dual Engine:**
    *   [x] Local rule-based checks (40+ rules: passive voice, repetition, spacing, apostrophes, clichés, etc.)
    *   [x] AI-powered checks (OpenAI/OpenRouter/Groq/Together/Ollama compatible)
*   [x] **Privacy:** Secure local storage for API keys (`chrome.storage.sync`); no backend logging or databases.
*   [x] **Core UI:** Basic popup for configuration (toggling, setting API key/model).
*   [x] **Content Script MVP:** Text extraction and basic visual highlighting for `input`, `textarea`, and standard `contenteditable` elements.
*   [x] **Interactive Tooltips:** Click-to-apply suggestions with ignore and dictionary features.
*   [x] **Comprehensive Options Page:** Site-specific settings, dictionary management, data export/import.
*   [x] **Docker Self-Hosting:** Complete Docker setup with Ollama support for local LLM.
*   [x] **Multi-Provider Support:** 6 AI providers (OpenAI, Groq, OpenRouter, Together, Ollama, Custom).

---

## ✅ Phase 2: Enhanced User Experience (Completed)

This phase focused on making the extension feature-rich and highly customizable.

*   [x] **Tone & Style Rewriting:**
    *   [x] 8 tone options (formal, casual, professional, friendly, concise, detailed, persuasive, neutral)
    *   [x] Context menu integration (right-click → Rewrite)
    *   [x] Keyboard shortcut (Ctrl+Shift+R / Cmd+Shift+R)
    *   [x] Side-by-side text comparison UI
*   [x] **Writing Statistics Dashboard:**
    *   [x] Word count, character count, sentence count, paragraph count
    *   [x] Flesch Reading Ease Score
    *   [x] Flesch-Kincaid Grade Level
    *   [x] Automated Readability Index (ARI)
    *   [x] Vocabulary diversity percentage
    *   [x] Reading/speaking time estimates
    *   [x] Issue breakdown by type
*   [x] **Custom Prompts for AI:**
    *   [x] 8 preset prompts (Fix Grammar, Make Formal, Simplify, Summarize, etc.)
    *   [x] Prompt categories (grammar, style, creative, professional)
    *   [x] Extensible system for user-defined prompts
*   [ ] **Better Google Docs Support:** (See implementation guide)
*   [ ] **Advanced Highlighting Engine:**
    *   [ ] Improve robustness inside complex `contenteditable` editors
    *   [ ] Implement reliable inline underlines that move correctly

---

## 🚀 Phase 3: Advanced Capabilities (Planned)

Here we will leverage the AI engine to provide deeper insights and more powerful writing assistance.

*   [ ] **Autocomplete & Prediction:**
    *   [ ] Suggest next few words as user types
    *   [ ] Context-aware completions
    *   [ ] Configurable suggestion length
*   [ ] **Contextual Understanding:**
    *   [ ] Consider previous paragraphs for consistency
    *   [ ] Document-wide tone analysis
    *   [ ] Track terminology and style preferences
*   [x] **Reading Time Estimates:** (Completed in Phase 2)
*   [x] **Vocabulary Diversity Metrics:** (Completed in Phase 2)
*   [ ] **Writing Analytics:**
    *   [ ] Track writing habits over time
    *   [ ] Most used words analysis
    *   [ ] Sentence length distribution
    *   [ ] Weekly/monthly reports
*   [ ] **Smart Suggestions:**
    *   [ ] Synonym recommendations for overused words
    *   [ ] Transition word suggestions
    *   [ ] Genre-specific recommendations

---

## 🌐 Phase 4: Expansion & Ecosystem (Planned)

The final phase aims to bring OpenGrammar to every platform where people write.

*   [ ] **Cross-Browser Support:**
    *   [ ] Firefox extension (WebExtensions API)
    *   [ ] Safari extension (Safari Web Extension Converter)
    *   [ ] Edge extension (Chromium-based)
*   [ ] **Desktop Applications:**
    *   [ ] Electron-based app for Windows, macOS, Linux
    *   [ ] System-wide text input integration
    *   [ ] Native messaging for full system access
*   [ ] **Developer API:**
    *   [ ] Public REST API with authentication
    *   [ ] Rate limiting and usage tiers
    *   [ ] SDK packages (npm, pip)
    *   [ ] API documentation portal
*   [ ] **Community Ecosystem:**
    *   [ ] Custom rule marketplace
    *   [ ] Shared prompt library
    *   [ ] Language packs for non-English support
    *   [ ] Plugin system for extensibility

---

## 📊 Feature Status Summary

| Feature | Status | Version |
|---------|--------|---------|
| Grammar Checking | ✅ Complete | v1.0 |
| Multi-Provider AI | ✅ Complete | v2.0 |
| Local LLM (Ollama) | ✅ Complete | v2.0 |
| Interactive Tooltips | ✅ Complete | v1.0 |
| Options Page | ✅ Complete | v1.0 |
| Tone Rewriting | ✅ Complete | v2.1 |
| Writing Statistics | ✅ Complete | v2.1 |
| Custom Prompts | ✅ Complete | v2.1 |
| Google Docs Support | 🚧 In Progress | - |
| Autocomplete | 📋 Planned | v3.0 |
| Firefox Support | 📋 Planned | v3.0 |
| Desktop Apps | 📋 Planned | v4.0 |
| Developer API | 📋 Planned | v4.0 |

---

## 🤝 How to Help

We need developers, designers, and testers to make this roadmap a reality!

### Contribution Areas

1.  **Core Features:** Pick a feature from Phase 3 or 4 and implement it
2.  **Bug Fixes:** Check the GitHub issues tab
3.  **Documentation:** Improve guides, add tutorials
4.  **Testing:** Test on different browsers and websites
5.  **Translations:** Help localize OpenGrammar for other languages

### Getting Started

1.  Fork the repository
2.  Check `FEATURES_IMPLEMENTATION.md` for implementation guides
3.  Create a feature branch
4.  Submit a pull request

If you're interested in contributing, please start a discussion on GitHub or join our Discord server!

---

## 📅 Release Timeline

| Version | Target | Features |
|---------|--------|----------|
| v2.1 | Current | Tone rewriting, statistics, custom prompts |
| v3.0 | Q2 2026 | Autocomplete, Firefox support, Google Docs |
| v3.5 | Q3 2026 | Contextual understanding, writing analytics |
| v4.0 | Q4 2026 | Desktop apps, Developer API, Safari support |

*Timeline is approximate and may change based on community contributions.*
