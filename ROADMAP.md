# 🗺️ OpenGrammar Roadmap

Our vision is to build the most capable, privacy-respecting, and customizable writing assistant in the world. OpenGrammar is designed to be a completely open-source alternative to premium grammar tools.

This roadmap outlines the major phases of development, from the initial MVP to advanced features and broader platform support. It is a living document and will evolve based on community feedback and technological advancements.

---

## 🎯 Phase 1: Foundation & MVP (Current)

The goal of this phase is to establish a solid, functional, and secure base architecture that proves the concept of a privacy-first, dual-engine writing assistant.

*   [x] **Chrome Extension Skeleton:** Manifest V3 setup with React and Vite.
*   [x] **Serverless Backend:** A stateless Hono API deployable to edge networks (Cloudflare/Vercel).
*   [x] **Dual Engine:**
    *   [x] Local rule-based checks (passive voice, repetition).
    *   [x] AI-powered checks (OpenAI compatibility) with a strict JSON response format.
*   [x] **Privacy:** Secure local storage for API keys (`chrome.storage.sync`); no backend logging or databases.
*   [x] **Core UI:** Basic popup for configuration (toggling, setting API key/model).
*   [x] **Content Script MVP:** Text extraction and basic visual highlighting for `input`, `textarea`, and standard `contenteditable` elements.

---

## 🚀 Phase 2: Enhanced User Experience & Accuracy (Next Steps)

This phase focuses on making the extension feel natural, responsive, and highly accurate across a wider variety of modern web applications.

*   **Advanced Highlighting Engine:**
    *   Improve the robustness of highlighting inside complex `contenteditable` editors (like Google Docs, Notion, and rich text webmail).
    *   Implement reliable inline underlines that move correctly when text is edited or scrolled.
*   **Interactive Tooltips:**
    *   Develop a polished, floating UI when hovering over an issue.
    *   Enable "Click to Apply" functionality to instantly replace the original text with the suggested correction.
    *   Allow users to "Ignore" a suggestion or "Add to Dictionary" for false positives.
*   **Smarter Local Rules:**
    *   Expand the local, non-AI rule engine using lightweight natural language processing (NLP) libraries (like `compromise` or a small WASM-based parser) to catch more errors offline and for free.
*   **Custom Prompts:** Allow advanced users to customize the system prompt sent to the AI (e.g., "Make my writing sound more professional" or "Translate to UK English").

---

## 🧠 Phase 3: Advanced Capabilities & Context

Here, we will leverage the AI engine to provide deeper insights and more powerful writing assistance beyond basic grammar and spelling.

*   **Tone & Style Adjustments:** Options to rewrite a selected paragraph for a specific tone (e.g., Confident, Friendly, Formal, Concise).
*   **Autocomplete & Prediction:** Suggest the next few words or sentences as the user types, similar to advanced editor features.
*   **Contextual Understanding:** Allow the AI to consider the surrounding text (or even the page context, if permitted by the user) to provide more accurate suggestions, rather than just analyzing isolated sentences.
*   **Writing Statistics:** Provide users with insights into their writing habits (e.g., vocabulary diversity, average readability score) processed entirely locally.

---

## 🌐 Phase 4: Expansion & Ecosystem

The final phase aims to bring OpenGrammar to every platform where people write.

*   **Cross-Browser Support:**
    *   Port the extension to Firefox (using WebExtensions API).
    *   Port the extension to Safari.
*   **Desktop Applications:** Create standalone desktop apps for Windows, macOS, and Linux that integrate with system-wide text inputs.
*   **Developer API:** Offer a documented, self-hostable API so other developers can integrate the OpenGrammar engine into their own applications.
*   **Community Rule Marketplace:** A repository where the community can share and install custom rule sets or AI prompts for specific domains (e.g., legal writing, medical writing, creative fiction).

---

## 🤝 How to Help

We need developers, designers, and testers to make this roadmap a reality. If you're interested in contributing, please pick an issue from our GitHub repository or start a discussion!
