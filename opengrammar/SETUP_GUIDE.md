# 🪶 OpenGrammar - Setup & Usage Guide

## Quick Start

### 1. Start the Backend Server

The backend server provides the grammar checking API. Run it using Node.js:

```bash
cd opengrammar/backend
npx tsx server-node.ts
```

The server will start on `http://localhost:8787`

**Verify it's working:**
```bash
curl http://localhost:8787/health
```

You should see:
```json
{"status":"healthy","timestamp":"...","environment":"nodejs","version":"2.0.0"}
```

### 2. Build and Load the Extension

```bash
cd opengrammar/extension
npm run build
```

This creates a `dist/` folder with the built extension.

**Load in Chrome:**

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `opengrammar/extension/dist` folder
5. The OpenGrammar extension should now appear in your extensions list

### 3. Configure the Extension

1. Click the OpenGrammar icon in your browser toolbar
2. Make sure "Enable OpenGrammar" is toggled ON
3. The Backend URL should be set to `http://localhost:8787` (or your deployed URL)
4. The status should show "Connected" with a green dot

### 4. Test It!

1. Open the test page: `file:///home/swadhin/fGrammerly/test-grammar.html`
2. Or go to any website with text inputs (Gmail, Google Docs, etc.)
3. Type some text with grammar errors, for example:
   - "Teh quick brown fox" (spelling error)
   - "Me and him went" (grammar error)
   - "We dont care" (missing apostrophe)
   - "Their going to love this" (their/they're confusion)

4. You should see **wavy red underlines** under the errors
5. Click on an underlined word to see the suggestion
6. Click "Apply" to fix the error

---

## Features

### Grammarly-Style Underlines

- **Red underline**: Spelling and grammar errors
- **Amber underline**: Clarity issues
- **Blue underline**: Style suggestions

### Interactive Tooltips

Click on any underlined text to see:
- The type of error
- Explanation of the issue
- Original text vs. suggestion
- "Apply" button to fix
- "Ignore" button to dismiss

### Supported Input Types

- ✅ Text inputs (`<input type="text">`)
- ✅ Textareas (`<textarea>`)
- ✅ Content editable divs (`contenteditable="true"`)
- ✅ Rich text editors (Gmail, Google Docs, Notion, etc.)

### Grammar Rules

The extension checks for:

**Spelling:**
- Common misspellings (teh → the, alot → a lot)
- Missing apostrophes (dont → don't)

**Grammar:**
- Subject/object pronouns (me and him → he and I)
- Incorrect past tense (runned → ran, writed → wrote)
- Their/there/they're confusion
- Your/you're confusion
- Its/it's confusion

**Style:**
- Passive voice detection
- Weak words (very good → excellent)
- Redundant phrases (absolutely essential → essential)

**Clarity:**
- Long sentences (>35 words)

---

## Troubleshooting

### Extension Not Working?

1. **Check if backend is running:**
   ```bash
   curl http://localhost:8787/health
   ```

2. **Check browser console:**
   - Press F12 to open DevTools
   - Look for OpenGrammar logs
   - Common errors:
     - "Cannot connect to grammar service" → Backend not running
     - "Backend error" → Check backend logs

3. **Check if extension is enabled:**
   - Click the extension icon
   - Make sure "Enable OpenGrammar" is ON
   - Check the status shows "Connected"

### Highlights Not Showing?

1. **For input/textarea:** A red badge appears in the top-right corner showing the number of errors
2. **For contenteditable:** Wavy underlines should appear directly under errors
3. **Try retyping:** The extension checks after you stop typing (800ms delay)

### False Positives?

1. Click "Ignore" on the suggestion to dismiss it
2. Add words to your custom dictionary in the Options page
3. Disable the extension for specific domains in Options

---

## Deployment Options

### Local Development (Current)
```bash
# Terminal 1: Backend
cd opengrammar/backend
npx tsx server-node.ts

# Terminal 2: Extension (auto-rebuilds)
cd opengrammar/extension
npm run dev
```

### Production Deployment

Deploy the backend to a cloud provider:

**Option 1: Cloudflare Workers**
```bash
cd opengrammar/backend
npx wrangler deploy
```

**Option 2: Vercel**
```bash
cd opengrammar/backend
npm run deploy:vercel
```

**Option 3: Docker (with Ollama for local LLM)**
```bash
cd opengrammar
docker-compose up -d
```

After deploying, update the Backend URL in the extension settings.

---

## API Reference

### POST /analyze

Check text for grammar and spelling errors.

**Request:**
```json
{
  "text": "Teh quick brown fox"
}
```

**Response:**
```json
{
  "issues": [
    {
      "type": "spelling",
      "original": "Teh",
      "suggestion": "the",
      "reason": "Misspelled word...",
      "offset": 0,
      "length": 3
    }
  ],
  "metadata": {
    "textLength": 19,
    "issuesCount": 1,
    "processingTimeMs": 5
  }
}
```

### GET /health

Check server health.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-01T16:00:00.000Z",
  "environment": "nodejs",
  "version": "2.0.0"
}
```

---

## What's Fixed

The recent updates fixed these issues:

1. ✅ **Grammarly-style wavy underlines** - Now properly shows colored underlines under errors
2. ✅ **Click-to-apply suggestions** - Tooltips work with Apply/Ignore buttons
3. ✅ **Memory leak fixed** - Removed catastrophic regex patterns that caused crashes
4. ✅ **Better content detection** - Improved detection of editable elements
5. ✅ **Proper highlighting** - Text is now properly wrapped with highlight spans
6. ✅ **Node.js backend** - Runs without Cloudflare Workers

---

## Next Steps

1. **Test on real websites:** Try Gmail, Google Docs, Twitter, etc.
2. **Add API key for AI checking:** Get an OpenAI/Groq key for advanced grammar checking
3. **Customize settings:** Visit Options page to configure per-domain settings
4. **Contribute:** Check ROADMAP.md for planned features

---

## Support

- **Issues:** Create a GitHub issue
- **Documentation:** See README.md, ROADMAP.md, FEATURES_IMPLEMENTATION.md
- **Logs:** Check `/tmp/opengrammar.log` for backend logs

Happy writing! ✍️
