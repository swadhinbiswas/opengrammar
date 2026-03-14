# 🌐 Browser Extension Setup Guide

Install and configure OpenGrammar on Chrome, Brave, Edge, and Firefox.

---

## 📋 Supported Browsers

| Browser | Version | Status |
|---------|---------|--------|
| **Google Chrome** | 88+ | ✅ Fully Supported |
| **Brave** | 1.20+ | ✅ Fully Supported |
| **Microsoft Edge** | 88+ | ✅ Fully Supported |
| **Mozilla Firefox** | 90+ | ✅ Supported (Temporary) |
| **Opera** | 74+ | ✅ Supported |
| **Vivaldi** | 3.6+ | ✅ Supported |

---

## 🔧 Installation

### Google Chrome

#### Step 1: Build the Extension
```bash
# Navigate to extension folder
cd opengrammar/opengrammar/extension

# Install dependencies
bun install

# Build for production
bun run build
```

This creates a `dist/` folder with the built extension.

#### Step 2: Load in Chrome
1. Open Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `opengrammar/extension/dist` folder
6. Click **Select**

✅ **Extension loaded!** You'll see the OpenGrammar icon in your toolbar.

#### Step 3: Pin to Toolbar (Optional)
1. Click the puzzle piece icon (Extensions) in toolbar
2. Find OpenGrammar in the list
3. Click the pin icon 📌

---

### Brave Browser

#### Step 1: Build the Extension
Same as Chrome:
```bash
cd opengrammar/opengrammar/extension
bun install
bun run build
```

#### Step 2: Load in Brave
1. Open Brave
2. Navigate to `brave://extensions/`
3. Enable **Developer mode** (top-right)
4. Click **Load unpacked**
5. Select `opengrammar/extension/dist` folder
6. Click **Select**

✅ **Extension loaded!**

#### Step 3: Pin to Toolbar
1. Click the puzzle piece icon
2. Pin OpenGrammar

---

### Microsoft Edge

#### Step 1: Build the Extension
Same as Chrome:
```bash
cd opengrammar/opengrammar/extension
bun install
bun run build
```

#### Step 2: Load in Edge
1. Open Edge
2. Navigate to `edge://extensions/`
3. Enable **Developer mode** (left sidebar)
4. Click **Load unpacked**
5. Select `opengrammar/extension/dist` folder
6. Click **Select Folder**

✅ **Extension loaded!**

#### Step 3: Pin to Toolbar
1. Click the puzzle piece icon
2. Pin OpenGrammar

---

### Mozilla Firefox

⚠️ **Note:** Firefox support is temporary. The extension must be reloaded each time you restart Firefox.

#### Step 1: Build the Extension
```bash
cd opengrammar/opengrammar/extension
bun install
bun run build
```

#### Step 2: Load in Firefox
1. Open Firefox
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on**
4. Navigate to `opengrammar/extension/dist`
5. Select `manifest.json`
6. Click **Open**

✅ **Extension loaded!**

⚠️ **Important:** This extension will be unloaded when you close Firefox. You'll need to reload it each session.

---

### Opera

#### Step 1: Enable Chrome Extensions
1. Open Opera
2. Go to Settings
3. Enable "Allow extensions from other stores"

#### Step 2: Install Chrome Extension Loader
1. Visit Opera Add-ons
2. Search for "Install Chrome Extensions"
3. Add to Opera

#### Step 3: Load OpenGrammar
1. Navigate to `chrome://extensions/`
2. Enable Developer mode
3. Load unpacked → `opengrammar/extension/dist`

---

### Vivaldi

#### Step 1: Load in Vivaldi
1. Open Vivaldi
2. Navigate to `vivaldi://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select `opengrammar/extension/dist`

---

## ⚙️ Initial Configuration

### Step 1: Open Settings
1. Click the OpenGrammar icon in your toolbar
2. Click the **Settings** (gear) icon

### Step 2: Configure Backend URL
1. Find **Backend URL** field
2. Enter your backend URL:
   - Local: `http://localhost:8787`
   - Cloudflare: `https://opengrammar.yourname.workers.dev`
   - Vercel: `https://opengrammar-backend.vercel.app`
   - Railway: `https://your-app.railway.app`
   - Render: `https://opengrammar-backend.onrender.com`
   - Docker: `http://localhost:8787`

### Step 3: Configure AI Provider
1. Select **Provider** from dropdown:
   - **Groq** (Recommended - Free tier)
   - **OpenAI** (Best quality)
   - **OpenRouter** (100+ models)
   - **Together AI** (Open-source)
   - **Ollama** (Local, offline)
   - **Custom** (Your own API)

2. Enter your **API Key** (if required)
3. Select **Model** from dropdown

### Step 4: Test Connection
1. Look for the **status indicator**
2. 🟢 Green = Connected
3. 🔴 Red = Not connected

### Step 5: Save Settings
Click **Save** to apply changes.

---

## 🎯 Provider Recommendations

### For Free Usage
**Provider:** Groq
- **API Key:** Get free key at [console.groq.com](https://console.groq.com)
- **Model:** `llama-3.1-70b-versatile`
- **Limits:** 100 requests/day free

### For Best Quality
**Provider:** OpenAI
- **API Key:** Get at [platform.openai.com](https://platform.openai.com)
- **Model:** `gpt-4o-mini`
- **Cost:** ~$0.15 per 1K requests

### For Privacy (Offline)
**Provider:** Ollama (Local)
- **API Key:** (none required)
- **Model:** `qwen2.5:1.5b`
- **Setup:** See [Docker Self-Hosting](06-docker-self-hosting.md)

### For Model Variety
**Provider:** OpenRouter
- **API Key:** Get at [openrouter.ai](https://openrouter.ai)
- **Models:** 100+ options (Claude, Llama, etc.)
- **Cost:** Pay-per-use

---

## 🔍 Verifying Installation

### Test 1: Check Extension Icon
1. Click the OpenGrammar icon
2. Popup should open
3. You should see settings and status

### Test 2: Check Grammar
1. Open any text box (Gmail, Google Docs, etc.)
2. Type: `me and him went to store`
3. You should see a **red underline** under "me and him"

### Test 3: Check Backend Connection
1. Click extension icon
2. Look for status indicator
3. Should be green with "Connected"

### Test 4: Test Rewrite Feature
1. Select any text on a webpage
2. Right-click
3. Choose **Rewrite with OpenGrammar**
4. Rewrite popup should open

---

## 🛠️ Extension Features

### Popup Menu
Accessed by clicking the toolbar icon:
- **Enable/Disable Toggle** - Turn extension on/off
- **Error Count** - Shows detected issues
- **Settings** - Open settings page
- **Statistics** - View writing stats
- **Backend Status** - Connection indicator

### Settings Page
Right-click extension icon → **Options**:

#### General Settings
- Enable OpenGrammar
- Check as you type
- Show notifications
- Keyboard shortcuts

#### AI Settings
- Provider selection
- API key management
- Model selection
- Custom base URL
- Backend health check

#### Site-Specific Settings
- Disable on specific domains
- Per-domain AI settings
- Domain whitelist

#### Custom Dictionary
- Add custom words
- Import/export dictionary
- Manage false positives

#### Ignored Issues
- View ignored suggestions
- Clear all ignored issues
- Manage per-domain ignores

#### Data Management
- Export all settings
- Import settings backup
- Reset to defaults

---

## 🎨 User Interface

### Color-Coded Underlines

| Color | Meaning | Example |
|-------|---------|---------|
| **Red** | Grammar/Spelling | "teh" → "the" |
| **Amber** | Clarity Issues | Long, confusing sentences |
| **Blue** | Style Suggestions | Passive voice, weak words |

### Interactive Tooltips
Click any underlined text to see:
- Issue type icon
- Original text
- Suggested fix
- Explanation
- Action buttons (Apply, Ignore, Add to Dictionary)

### Rewrite Popup
Accessed via right-click or `Ctrl+Shift+R`:
- Selected text preview
- 8 tone buttons
- Rewrite button
- Apply/Copy buttons
- Close button

---

## 🔄 Updating the Extension

### Manual Update
```bash
# Rebuild extension
cd opengrammar/opengrammar/extension
bun run build

# Reload in browser
# chrome://extensions/ → Click reload icon on OpenGrammar
```

### Automatic Updates
Since this is a locally-loaded extension, it won't auto-update. You need to:
1. Rebuild manually
2. Reload in extensions page

---

## 🆘 Troubleshooting

### Extension Not Showing
**Problem:** Can't find OpenGrammar icon

**Solution:**
1. Check `chrome://extensions/` (or browser equivalent)
2. Make sure extension is enabled
3. Click the puzzle piece icon → Pin OpenGrammar

### No Grammar Highlights
**Problem:** Typing errors but no underlines appear

**Solution:**
1. Check extension is enabled (icon badge visible)
2. Verify site is not in disabled domains
3. Check backend is running: `curl http://localhost:8787/health`
4. Reload the page
5. Check browser console (F12) for errors

### Backend Not Connecting
**Problem:** Red status indicator, "Not connected" error

**Solution:**
1. Verify backend URL in settings
2. Test backend: `curl your-backend-url/health`
3. Check CORS configuration
4. Restart backend service
5. Check firewall settings

### Extension Crashes
**Problem:** Extension closes or stops working

**Solution:**
1. Reload extension in extensions page
2. Clear browser cache
3. Check browser console for errors
4. Rebuild extension
5. Try in incognito mode (enable in extensions page)

### Rewrite Not Working
**Problem:** Right-click menu doesn't appear

**Solution:**
1. Make sure text is selected
2. Check extension is enabled
3. Reload the page
4. Check browser permissions
5. Try keyboard shortcut: `Ctrl+Shift+R`

### Settings Not Saving
**Problem:** Settings reset after closing

**Solution:**
1. Check browser storage permissions
2. Clear browser data for extension
3. Try in a fresh browser profile
4. Export settings before resetting

---

## 📊 Browser-Specific Notes

### Chrome
- ✅ Best compatibility
- ✅ All features work
- ⚠️ Requires Developer mode for local loading

### Brave
- ✅ Same as Chrome (Chromium-based)
- ✅ Privacy features don't interfere
- ⚠️ May need to disable Shields for some sites

### Edge
- ✅ Full Chromium compatibility
- ✅ All features work
- ⚠️ Some Microsoft-specific UI differences

### Firefox
- ⚠️ Temporary loading only
- ⚠️ Must reload each session
- ✅ All core features work
- ⚠️ Some Chrome APIs not available

### Opera
- ✅ Chrome extension compatibility
- ⚠️ May need additional setup
- ✅ All features work

### Vivaldi
- ✅ Full Chromium compatibility
- ✅ All features work
- ✅ Easy extension management

---

## 📚 Related Documentation

- [Quick Start](01-quick-start.md) - Get started in 5 minutes
- [Backend Deployment](05-backend-deployment.md) - Deploy your backend
- [AI Provider Setup](07-ai-providers.md) - Configure AI providers
- [Using OpenGrammar](09-using-opengrammar.md) - Daily usage guide

---

**Your extension is now installed and ready! Start writing better! ✨**
