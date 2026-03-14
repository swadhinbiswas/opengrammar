# 🚀 Quick Start

Get OpenGrammar up and running in 5 minutes!

---

## ⚡ 5-Minute Setup

### Step 1: Get Your API Key (Optional but Recommended)

For the best grammar checking experience, you'll need an API key. We recommend **Groq** for its free tier:

1. Visit [Groq Console](https://console.groq.com)
2. Sign up / Log in
3. Go to **API Keys** → **Create API Key**
4. Copy your key (starts with `gsk_`)

**Free Tier:** 100 requests/day - enough for most users!

### Step 2: Build the Extension

```bash
# Clone the repository
git clone https://github.com/swadhinbiswas/opengrammar.git
cd opengrammar/opengrammar/extension

# Install dependencies
bun install

# Build the extension
bun run build
```

### Step 3: Load in Your Browser

#### Chrome / Brave / Edge
1. Open `chrome://extensions/` (or `brave://extensions/` / `edge://extensions/`)
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `opengrammar/extension/dist` folder
5. ✅ Extension loaded! You'll see the OpenGrammar icon

#### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Navigate to `opengrammar/extension/dist`
4. Select `manifest.json`
5. ✅ Extension loaded!

### Step 4: Configure

1. Click the OpenGrammar icon in your toolbar
2. Click **Settings** (gear icon)
3. Enter your API key (from Step 1)
4. Select Provider: **Groq**
5. Select Model: **llama-3.1-70b-versatile**
6. Backend URL: `http://localhost:8787` (for local testing)

### Step 5: Start Writing!

1. Open any text box (Gmail, Google Docs, Notion, etc.)
2. Type something with a grammar error: `me and him went to store`
3. You'll see a **red underline** under the error
4. Click it to see the suggestion: `he and I went to store`
5. Click **Apply** to fix it!

---

## 🎯 What's Next?

| I want to... | Do this... |
|--------------|------------|
| Deploy to production | Read [Backend Deployment](05-backend-deployment.md) |
| Use local AI (offline) | Read [Ollama Setup](07-ai-providers.md#ollama-local) |
| Rewrite text in different tones | Read [Tone Rewriting](10-tone-rewriting.md) |
| See all features | Read [Using OpenGrammar](09-using-opengrammar.md) |

---

## 🛠️ Quick Commands

### Start Local Backend
```bash
cd opengrammar/opengrammar/backend
bun install
bun run dev
# Runs on http://localhost:8787
```

### Build Extension
```bash
cd opengrammar/opengrammar/extension
bun run build
```

### Test Backend
```bash
curl http://localhost:8787/health
```

---

## ❓ Need Help?

- **Something not working?** Check [Troubleshooting](18-troubleshooting.md)
- **Have questions?** Visit [GitHub Discussions](https://github.com/swadhinbiswas/opengrammar/discussions)
- **Found a bug?** Open [GitHub Issues](https://github.com/swadhinbiswas/opengrammar/issues)

---

**Congratulations! You're ready to write better with OpenGrammar! ✨**
