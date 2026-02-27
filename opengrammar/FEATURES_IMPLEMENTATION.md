# 🚀 OpenGrammar Feature Implementation Guide

This document provides implementation details for Phase 2, 3, and 4 features.

---

## ✅ Phase 2: Enhanced UX (Completed)

### 1. Tone & Style Adjustments ✓
**Status:** Implemented  
**Files:** `extension/src/rewrite/`

**Features:**
- 8 tone options (formal, casual, professional, friendly, concise, detailed, persuasive, neutral)
- Context menu integration (right-click → Rewrite)
- Keyboard shortcut (Ctrl+Shift+R)
- Side-by-side comparison UI
- Apply/Copy buttons

**Usage:**
```javascript
// Select text → Right-click → "Rewrite with OpenGrammar"
// Or press Ctrl+Shift+R
```

### 2. Writing Statistics ✓
**Status:** Implemented  
**Files:** `extension/src/stats/`

**Metrics:**
- Word count, character count, sentence count, paragraph count
- Flesch Reading Ease Score
- Flesch-Kincaid Grade Level
- Automated Readability Index (ARI)
- Vocabulary diversity
- Reading/speaking time estimates
- Issue breakdown by type

**Usage:**
```javascript
// Access via popup → Statistics tab
// Or future: keyboard shortcut
```

### 3. Custom Prompts for AI ✓
**Status:** Implemented (Library)  
**Files:** `extension/src/prompts/`

**Preset Prompts:**
- Fix Grammar
- Make Formal/Casual
- Simplify
- Expand
- Summarize
- British English
- Persuade

**Next Steps:**
- Add UI for prompt selection in rewrite popup
- Allow users to create custom prompts
- Save favorite prompts to storage

---

## 🔨 Phase 3: Advanced Features (Implementation Guide)

### 4. Better Google Docs Support

**Implementation Steps:**

1. **Create Google Docs-specific content script:**
```typescript
// extension/src/content/google-docs.ts
export class GoogleDocsHandler {
  private editorElement: HTMLElement | null = null;
  
  findEditor() {
    // Google Docs uses a complex iframe structure
    const iframe = document.querySelector('.docs-texteventtarget-iframe');
    if (iframe) {
      const doc = (iframe as HTMLIFrameElement).contentDocument;
      this.editorElement = doc?.querySelector('.kix-appview-editor');
    }
  }
  
  extractText() {
    // Google Docs stores content in paragraph spans
    const paragraphs = this.editorElement?.querySelectorAll('.kix-paragraphrenderer');
    return Array.from(paragraphs || []).map(p => p.textContent).join('\n');
  }
}
```

2. **Update manifest for iframe access:**
```json
"content_scripts": [
  {
    "matches": ["https://docs.google.com/*"],
    "js": ["src/content/google-docs.ts"],
    "all_frames": true
  }
]
```

3. **Handle Google Docs-specific events:**
- Listen for `docs-chapter-renderer` events
- Monitor selection changes in iframe
- Position highlights relative to editor viewport

**Estimated Effort:** 2-3 days

---

### 5. Autocomplete & Prediction

**Implementation:**

1. **Add autocomplete API endpoint:**
```typescript
// backend/src/index.ts
app.post('/autocomplete', async (c) => {
  const { text, cursor, apiKey, model } = await c.req.json();
  
  // Get last 50 characters before cursor
  const context = text.substring(Math.max(0, cursor - 50), cursor);
  
  const prompt = `Continue this text naturally (max 20 words):
  
Context: ${context}...

Continuation:`;
  
  // Call LLM with max_tokens=20
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model,
    max_tokens: 20,
    temperature: 0.8,
  });
  
  return c.json({
    suggestion: completion.choices[0].message.content?.trim(),
  });
});
```

2. **Add content script autocomplete UI:**
```typescript
// extension/src/content/autocomplete.ts
export class AutocompletePopup {
  private popup: HTMLElement | null = null;
  
  showSuggestion(suggestion: string, position: { top: number; left: number }) {
    this.popup = document.createElement('div');
    this.popup.className = 'opengrammar-autocomplete';
    this.popup.innerHTML = `
      <span class="ghost-text">${text}</span>
      <span class="suggestion">${suggestion}</span>
    `;
    // Position at cursor
  }
  
  accept() {
    // Insert suggestion at cursor
  }
}
```

3. **Debounce API calls (300ms after typing stops)**

**Estimated Effort:** 3-4 days

---

### 6. Contextual Understanding

**Implementation:**

1. **Add context window to analysis:**
```typescript
// backend/src/analyzer.ts
export async function analyzeWithContext(
  text: string,
  context: {
    previousParagraphs: string[];
    documentType?: string;
    tone?: string;
  }
) {
  const prompt = `Analyze this text considering the context:

Previous context: ${context.previousParagraphs.join(' ')}
Document type: ${context.documentType || 'general'}

Text to analyze: ${text}

Consider consistency with previous content and overall tone.`;

  // Call LLM with context
}
```

2. **Store document context in background:**
```typescript
// extension/src/background/index.ts
const documentContexts = new Map<string, {
  text: string;
  timestamp: number;
  tone?: string;
}>();

// Keep last 5000 characters per domain
chrome.tabs.onActivated.addListener((tab) => {
  // Load context for this tab
});
```

**Estimated Effort:** 2-3 days

---

### 7. Reading Time Estimates ✓
**Status:** Already implemented in Writing Statistics

**Current Features:**
- Reading time (200 wpm)
- Speaking time (150 wpm)

**Enhancements:**
- Add detailed breakdown (by paragraph)
- Show progress indicator while reading
- Add customizable reading speed

---

### 8. Vocabulary Diversity Metrics ✓
**Status:** Already implemented in Writing Statistics

**Current Features:**
- Unique word count
- Vocabulary diversity percentage
- Average word length

**Enhancements:**
- Track most used words
- Suggest synonyms for overused words
- Show vocabulary level (basic, intermediate, advanced)

---

## 🌐 Phase 4: Expansion (Implementation Guide)

### 9. Firefox Support

**Steps:**

1. **Create Firefox-specific manifest:**
```json
// extension/manifest-firefox.json
{
  "browser_specific_settings": {
    "gecko": {
      "id": "opengrammar@example.com",
      "strict_min_version": "109.0"
    }
  },
  // Rest same as Chrome manifest
}
```

2. **Adjust Chrome-specific APIs:**
```typescript
// Use browser polyfill
import browser from 'webextension-polyfill';

// Replace chrome.* with browser.*
browser.storage.sync.get(...);
browser.contextMenus.create(...);
```

3. **Add Firefox build script:**
```json
// package.json
"scripts": {
  "build:firefox": "vite build --mode firefox"
}
```

4. **Test in Firefox:**
- Load temporary add-on in about:debugging
- Submit to Firefox Add-ons

**Estimated Effort:** 1-2 days

---

### 10. Safari Support

**Steps:**

1. **Use Xcode to create Safari Web Extension:**
```bash
xcrun safari-web-extension-converter extension/dist/ \
  --project-location ./safari \
  --bundle-identifier com.opengrammar.safari
```

2. **Adjust manifest for Safari:**
- Some Chrome APIs not supported
- May need native app for full functionality

3. **Create macOS app wrapper:**
- Swift app to host extension
- Notarize for App Store distribution

**Estimated Effort:** 3-5 days

---

### 11. Desktop Apps

**Implementation:**

1. **Use Electron for cross-platform desktop app:**
```bash
npm install electron
```

2. **Create Electron main process:**
```typescript
// desktop/main.ts
import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  win.loadURL('https://opengrammar.app');
}

app.whenReady().then(createWindow);
```

3. **Integrate with system-wide text inputs:**
- Use native messaging for system-wide support
- Create keyboard shortcut for global access

**Estimated Effort:** 5-7 days

---

### 12. Developer API

**Implementation:**

1. **Add API key management:**
```typescript
// backend/src/index.ts
app.post('/api/v1/analyze', async (c) => {
  const apiKey = c.req.header('Authorization')?.replace('Bearer ', '');
  
  // Validate API key against database
  const user = await validateApiKey(apiKey);
  if (!user) {
    return c.json({ error: 'Invalid API key' }, 401);
  }
  
  // Process request
  const { text } = await c.req.json();
  const issues = RuleBasedAnalyzer.analyze(text);
  
  return c.json({ issues });
});
```

2. **Add rate limiting:**
```typescript
import { rateLimit } from 'hono-rate-limit';

app.use('/api/*', rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
}));
```

3. **Create API documentation:**
```markdown
# OpenGrammar API

## POST /api/v1/analyze

Analyze text for grammar and style issues.

### Request
```json
{
  "text": "string",
  "options": {
    "checkGrammar": true,
    "checkStyle": true
  }
}
```

### Response
```json
{
  "issues": [...],
  "metadata": {...}
}
```
```

4. **Add SDK packages:**
```bash
npm publish @opengrammar/js
pip publish opengrammar
```

**Estimated Effort:** 3-4 days

---

## 📊 Priority & Timeline

| Feature | Priority | Effort | Dependencies |
|---------|----------|--------|--------------|
| Google Docs Support | High | 2-3 days | None |
| Autocomplete | High | 3-4 days | None |
| Firefox Support | Medium | 1-2 days | None |
| Developer API | Medium | 3-4 days | Backend updates |
| Contextual Understanding | Medium | 2-3 days | Storage updates |
| Desktop Apps | Low | 5-7 days | None |
| Safari Support | Low | 3-5 days | macOS required |

**Total Estimated Effort:** 19-28 days

---

## 🎯 Next Steps

1. **Immediate (Week 1):**
   - [ ] Add UI for custom prompts in rewrite popup
   - [ ] Implement Google Docs support
   - [ ] Add autocomplete feature

2. **Short-term (Week 2-3):**
   - [ ] Build Firefox extension
   - [ ] Add contextual understanding
   - [ ] Create developer API

3. **Long-term (Month 2+):**
   - [ ] Build desktop apps
   - [ ] Safari extension
   - [ ] Advanced AI features

---

**Contributing:** Pick a feature from the list above and create a PR! Each feature includes implementation details to get you started.
