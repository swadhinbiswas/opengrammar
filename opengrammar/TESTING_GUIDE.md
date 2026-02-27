# 🧪 OpenGrammar Testing Guide

## ✅ Build Status
**Extension:** ✅ Builds successfully  
**Backend:** ✅ Type-checks successfully

---

## 📋 Step-by-Step Testing Instructions

### Step 1: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked"
   - Navigate to: `opengrammar/extension/dist`
   - Click "Select"

4. **Verify Extension Loaded**
   - You should see OpenGrammar icon in toolbar
   - Extension version should show v2.0.0+

---

### Step 2: Test Grammar Checking ✍️

1. **Open any text input** (Gmail, Google Docs, text box, etc.)

2. **Type text with errors:**
   ```
   me and him went to the store and buyed some milks. it were very heavy.
   ```

3. **Expected Results:**
   - Red underlines appear under errors
   - Hover over underlines to see tooltips
   - Tooltip shows:
     - Issue type (grammar/spelling/style)
     - Original text
     - Suggestion
     - Three buttons: Apply, Ignore, Add to Dictionary

4. **Test Actions:**
   - Click "Apply" → Text should be corrected
   - Click "Ignore" → Issue should fade out
   - Click "Add to Dictionary" → Word saved for future

---

### Step 3: Test Multi-Provider Support 🔌

1. **Click Extension Icon** → Open popup

2. **Test Provider Selection:**
   - Select different providers from dropdown:
     - OpenAI
     - Groq (Free tier available)
     - OpenRouter
     - Together AI
     - Ollama (Local, no API key needed)
     - Custom

3. **For Testing (Recommended):**
   - **Option A: Use Groq** (Free, fast)
     - Get API key: https://console.groq.com
     - Enter key in popup
     - Model: `llama-3.1-70b-versatile`
   
   - **Option B: Use Ollama** (Local, free, private)
     ```bash
     # Install Ollama first
     curl -fsSL https://ollama.com/install.sh | sh
     ollama pull qwen2.5:1.5b
     ```
     - Provider: Ollama
     - Model: qwen2.5:1.5b
     - API Key: (leave empty)

4. **Verify Connection:**
   - Green dot = Connected ✅
   - Red dot = Not connected ❌

---

### Step 4: Test Tone Rewriting ✨

1. **Select Text on any webpage**

2. **Right-click → "Rewrite with OpenGrammar"**
   - OR press keyboard shortcut: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

3. **Rewrite Popup Opens:**
   - Shows selected text
   - 8 tone buttons (Formal 🎩, Casual 😊, Professional 💼, etc.)

4. **Test Each Tone:**
   - Click a tone (e.g., "Formal")
   - Click "Rewrite" button
   - Wait for AI response
   - See rewritten text

5. **Test Actions:**
   - Click "Apply" → Replaces original text
   - Click "Copy" → Copies to clipboard

---

### Step 5: Test Writing Statistics 📊

**Note:** This feature needs a popup entry point. Currently implemented but needs UI integration.

**To test:**
1. Navigate to `extension/src/stats/index.html` in browser
2. Or create a test page that imports the stats module

**Metrics to verify:**
- Word count ✅
- Character count ✅
- Flesch Reading Ease Score ✅
- Grade Level ✅
- Reading time estimate ✅
- Vocabulary diversity ✅

---

### Step 6: Test Options Page ⚙️

1. **Right-click Extension Icon → Options**
   - OR click "Open Settings" in popup

2. **Test Each Section:**

   **General Settings:**
   - Toggle "Enable OpenGrammar" on/off
   - Toggle "Check as you type"
   - Toggle "Show notifications"

   **AI Settings:**
   - Enter API key
   - Select model from dropdown
   - Enter backend URL
   - Check backend health status

   **Site-Specific Settings:**
   - Add domain: `example.com`
   - Verify it appears in list
   - Remove domain

   **Custom Dictionary:**
   - Add word: `myword`
   - Verify it appears in dictionary list
   - Remove word

   **Ignored Suggestions:**
   - Should show previously ignored issues
   - Click "Clear All Ignored Issues"

   **Data Management:**
   - Click "Export Settings" → Downloads JSON file
   - Click "Import Settings" → Upload JSON file
   - Click "Reset All Settings" → Confirms and resets

---

### Step 7: Test Backend API 🔧

**Start Backend Locally:**
```bash
cd opengrammar/backend
npm install
npm run dev
# Runs on http://localhost:8787
```

**Test Endpoints:**

1. **Health Check:**
   ```bash
   curl http://localhost:8787/health
   # Expected: {"status": "healthy", "timestamp": "...", "environment": "development"}
   ```

2. **List Providers:**
   ```bash
   curl http://localhost:8787/providers
   # Expected: List of 6 providers
   ```

3. **Grammar Analysis:**
   ```bash
   curl -X POST http://localhost:8787/analyze \
     -H "Content-Type: application/json" \
     -d '{"text": "me and him went"}'
   # Expected: List of grammar issues
   ```

4. **Tone Rewriting:**
   ```bash
   curl -X POST http://localhost:8787/rewrite \
     -H "Content-Type: application/json" \
     -d '{"text": "hey whats up", "tone": "formal"}'
   # Expected: {"rewritten": "Hello, how are you?", ...}
   ```

---

### Step 8: Test Docker Deployment 🐳

**Start with Docker:**
```bash
cd opengrammar
docker-compose up -d
```

**Verify Services:**
```bash
docker-compose ps
# Should show: opengrammar-backend (healthy)
```

**Test Backend:**
```bash
curl http://localhost:8787/health
```

**Stop Services:**
```bash
docker-compose down
```

**With Ollama (Local LLM):**
```bash
docker-compose --profile local-llm up -d
```

---

## 🐛 Known Issues & Troubleshooting

### Issue 1: Extension Not Loading
**Solution:**
- Make sure Developer Mode is enabled
- Check `dist/` folder exists and has files
- Try reloading extension

### Issue 2: No Grammar Highlights
**Solution:**
- Check if extension is enabled (icon badge)
- Verify site is not in disabled domains
- Reload the page
- Check browser console for errors

### Issue 3: Backend Not Connecting
**Solution:**
```bash
# Check backend is running
curl http://localhost:8787/health

# Check backend URL in extension options
# Should be: http://localhost:8787
```

### Issue 4: Rewrite Not Working
**Solution:**
- Make sure text is selected
- Check backend is running
- Verify API key is entered (if using cloud provider)
- Check browser console for errors

---

## ✅ Test Checklist

Use this checklist to verify all features:

### Core Features
- [ ] Grammar checking works in text inputs
- [ ] Grammar checking works in textareas
- [ ] Grammar checking works in contenteditable (Gmail, Docs)
- [ ] Tooltips appear on hover
- [ ] Click-to-apply works
- [ ] Ignore functionality works
- [ ] Add to dictionary works

### Multi-Provider
- [ ] Provider dropdown shows all 6 providers
- [ ] Can switch between providers
- [ ] API key storage works
- [ ] Model selection works
- [ ] Connection status shows correctly

### Tone Rewriting
- [ ] Context menu appears on text selection
- [ ] Keyboard shortcut works (Ctrl+Shift+R)
- [ ] Rewrite popup opens
- [ ] All 8 tones selectable
- [ ] Rewrite API call works
- [ ] Apply button works
- [ ] Copy button works

### Options Page
- [ ] General settings save
- [ ] AI settings save
- [ ] Site-specific settings work
- [ ] Dictionary management works
- [ ] Ignored issues management works
- [ ] Export/import works
- [ ] Reset settings works

### Backend
- [ ] Health endpoint works
- [ ] Providers endpoint works
- [ ] Analyze endpoint works
- [ ] Rewrite endpoint works
- [ ] Docker deployment works

---

## 📊 Test Results Template

After testing, fill in this template:

```markdown
## Test Results - [Date]

**Tester:** [Your Name]
**Browser:** Chrome v[version]
**OS:** [Windows/Mac/Linux]

### Core Features
- Grammar Checking: ✅/❌
- Tooltips: ✅/❌
- Multi-Provider: ✅/❌
- Tone Rewriting: ✅/❌
- Options Page: ✅/❌

### Issues Found
1. [Description]
2. [Description]

### Notes
[Any additional notes]
```

---

## 🎯 Next Steps After Testing

1. **If all tests pass:** Ready for beta release!
2. **If issues found:** Create GitHub issues with details
3. **Ready to publish:** Prepare Chrome Web Store submission

---

**Happy Testing! 🚀**

For questions or issues, check the documentation:
- `SELF_HOSTING.md` - Self-hosting guide
- `PRODUCTION.md` - Production deployment
- `FEATURES_IMPLEMENTATION.md` - Feature details
