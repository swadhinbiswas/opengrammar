# 🔧 Troubleshooting Guide

Solve common OpenGrammar issues with this comprehensive troubleshooting guide.

---

## 📋 Quick Fixes

### Extension Not Working

**Problem:** Extension installed but not detecting errors

**Quick Fix:**
```bash
# 1. Reload extension
chrome://extensions/ → Click reload icon on OpenGrammar

# 2. Refresh the page
Press F5 or Ctrl+R

# 3. Check backend
curl http://localhost:8787/health
```

---

## 🔍 Common Issues

### Issue 1: No Grammar Highlights

**Symptoms:**
- Typing text with errors
- No red/amber/blue underlines appear
- Extension icon shows no error count

**Possible Causes & Solutions:**

#### Cause 1: Extension Disabled
**Solution:**
1. Click extension icon
2. Check "Enable OpenGrammar" is ON
3. Toggle if needed

#### Cause 2: Site Disabled
**Solution:**
1. Right-click extension → Options
2. Go to Site-Specific Settings
3. Check if current site is disabled
4. Enable if needed

#### Cause 3: Backend Not Running
**Solution:**
```bash
# Check backend status
curl http://localhost:8787/health

# Start backend
cd opengrammar/opengrammar/backend
bun run dev
```

#### Cause 4: Text Too Short
**Solution:**
- Extension only checks text with 5+ characters
- Type more text to trigger checking

#### Cause 5: Wrong Input Type
**Solution:**
- Extension works on: `<input>`, `<textarea>`, `[contenteditable]`
- Doesn't work on: PDFs, images, non-editable text

---

### Issue 2: Backend Connection Failed

**Symptoms:**
- Red status indicator in extension
- "Cannot connect to backend" error
- No AI suggestions

**Solutions:**

#### Check Backend URL
1. Click extension → Settings
2. Verify Backend URL:
   - Local: `http://localhost:8787`
   - Cloudflare: `https://yourname.workers.dev`
   - Vercel: `https://yourapp.vercel.app`
   - Railway: `https://yourapp.railway.app`

#### Test Backend
```bash
# Test health endpoint
curl http://localhost:8787/health

# Expected response:
# {"status":"healthy","timestamp":"..."}
```

#### Check CORS
If using custom backend:
```typescript
// Ensure CORS is configured
app.use('*', cors({
  origin: ['chrome-extension://*', 'moz-extension://*']
}));
```

#### Restart Backend
```bash
# Stop backend (Ctrl+C)
# Restart
bun run dev
```

---

### Issue 3: AI Not Working

**Symptoms:**
- Rule-based checks work
- AI suggestions don't appear
- "API key invalid" error

**Solutions:**

#### Check API Key
1. Click extension → Settings
2. Verify API key is entered
3. Check for typos (no spaces)
4. Ensure key starts with correct prefix:
   - Groq: `gsk_`
   - OpenAI: `sk-`
   - OpenRouter: `sk-or-`

#### Test API Key
```bash
# Test Groq key
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer gsk_xxx" \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.1-70b-versatile","messages":[{"role":"user","content":"test"}]}'

# Test OpenAI key
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer sk-xxx" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"test"}]}'
```

#### Check Provider Selection
1. Settings → Provider
2. Ensure correct provider selected
3. Model matches provider

#### Check Rate Limits
- Groq free tier: 100 requests/day
- If exceeded, wait 24 hours or upgrade

---

### Issue 4: Extension Crashes

**Symptoms:**
- Extension closes unexpectedly
- Popup doesn't open
- Options page blank

**Solutions:**

#### Clear Extension Data
1. `chrome://extensions/`
2. Click "Details" on OpenGrammar
3. Click "Clear storage" or "Reset"
4. Reload extension

#### Check Browser Console
1. Right-click extension popup → Inspect
2. Check Console tab for errors
3. Copy error messages
4. Search in documentation or create issue

#### Rebuild Extension
```bash
cd opengrammar/opengrammar/extension

# Clean build
rm -rf dist node_modules
bun install
bun run build

# Reload in chrome://extensions/
```

#### Try Incognito Mode
1. Open incognito window
2. Enable extension for incognito:
   - `chrome://extensions/` → Details → "Allow in Incognito"
3. Test in incognito

---

### Issue 5: Rewrite Not Working

**Symptoms:**
- Right-click menu doesn't show rewrite option
- Rewrite popup doesn't open
- Rewrite returns error

**Solutions:**

#### Check Text Selection
- Ensure text is actually selected
- Try selecting different text
- Minimum 5 characters

#### Check Keyboard Shortcut
```bash
# Windows/Linux: Ctrl+Shift+R
# Mac: Cmd+Shift+R

# If not working, check shortcut:
chrome://extensions/shortcuts
```

#### Verify Backend
```bash
# Test rewrite endpoint
curl -X POST http://localhost:8787/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text":"hey","tone":"formal"}'
```

#### Check Provider
- Rewrite requires AI provider
- Ensure API key is valid
- Try different provider

---

### Issue 6: Slow Performance

**Symptoms:**
- Slow grammar checking
- Laggy typing
- Delayed suggestions

**Solutions:**

#### Reduce Text Length
- Split long documents
- Check in chunks
- Use rule-based only for long texts

#### Disable AI Temporarily
1. Settings → Provider
2. Select "Rule-Based Only"
3. Faster, offline checking

#### Clear Browser Cache
```bash
# Chrome: Ctrl+Shift+Delete
# Clear cached images and files
# Reload extension
```

#### Check System Resources
- Open Task Manager (Shift+Esc in Chrome)
- Check memory usage
- Close unused tabs
- Restart browser

---

### Issue 7: False Positives

**Symptoms:**
- Correct words flagged as errors
- Technical terms marked wrong
- Names highlighted

**Solutions:**

#### Add to Dictionary
1. Click highlighted word
2. Click "Add to Dictionary"
3. Word won't be flagged again

#### Bulk Add Words
1. Options → Custom Dictionary
2. Click "Add Word"
3. Enter multiple words
4. Or import from file

#### Disable Specific Rules
(Advanced)
1. Options → Grammar Rules
2. Disable specific rule categories
3. Save settings

---

### Issue 8: Settings Not Saving

**Symptoms:**
- Settings reset after closing
- API key disappears
- Changes don't persist

**Solutions:**

#### Check Storage Permissions
1. `chrome://extensions/`
2. OpenGrammar → Details
3. Ensure storage permission enabled

#### Clear and Reset
1. Options → Data Management
2. Click "Reset All Settings"
3. Reconfigure settings
4. Save and reload

#### Export/Import
1. Export current settings (if possible)
2. Reset to defaults
3. Import settings back

#### Check Browser Storage
```bash
# Clear browser data
chrome://settings/clearBrowserData

# Clear "Cookies and other site data"
# Clear "Cached images and files"
```

---

## 🔍 Debug Mode

### Enable Debug Logging

#### Backend Debug Mode
```bash
# Set DEBUG environment variable
export DEBUG=true

# Start backend
bun run dev

# Or with inline variable
DEBUG=true bun run dev
```

#### Extension Debug Mode
1. Open any webpage
2. Press F12 → Open DevTools
3. Go to Console tab
4. Look for OpenGrammar logs

### Common Log Messages

| Message | Meaning | Action |
|---------|---------|--------|
| `Grammar check skipped` | Text too short or not editable | Normal, no action needed |
| `Backend connection issue` | Can't reach backend | Check backend URL and status |
| `LLM Analysis Error` | AI provider error | Check API key and provider |
| `Settings saved` | Settings updated | Normal, success message |
| `Rate limit exceeded` | Too many requests | Wait and retry |

---

## 🧪 Testing Checklist

Use this to verify everything works:

```
Extension Installation
☐ Extension appears in chrome://extensions/
☐ Extension icon visible in toolbar
☐ Popup opens when clicking icon
☐ Options page loads

Backend Connection
☐ Backend health endpoint responds
☐ Status indicator shows green
☐ Providers list loads
☐ Models list loads

Grammar Checking
☐ Typing in text box triggers check
☐ Red underlines appear for errors
☐ Clicking underline shows tooltip
☐ Apply button works
☐ Ignore button works
☐ Add to Dictionary works

AI Features
☐ API key saves correctly
☐ Provider selection works
☐ AI suggestions appear
☐ No error messages

Tone Rewriting
☐ Right-click menu appears
☐ Rewrite popup opens
☐ Tone selection works
☐ Rewrite generates results
☐ Apply/Copy buttons work

Settings
☐ All settings save
☐ Settings persist after reload
☐ Export/Import works
☐ Reset works
```

---

## 🆘 Still Having Issues?

### Collect Debug Information

Before asking for help, gather:

1. **Extension Version**
   ```
   chrome://extensions/ → Note version number
   ```

2. **Browser Version**
   ```
   chrome://settings/help → Copy version
   ```

3. **Backend Logs**
   ```bash
   cd backend
   bun run dev 2>&1 | tee backend.log
   ```

4. **Browser Console**
   ```
   F12 → Console → Copy errors
   ```

5. **Test Results**
   ```bash
   curl http://localhost:8787/health
   curl http://localhost:8787/providers
   ```

### Get Help

1. **Check Documentation**
   - Read relevant docs
   - Search for similar issues

2. **GitHub Issues**
   - Search existing issues
   - Create new issue with debug info

3. **GitHub Discussions**
   - Ask questions
   - Share experiences

4. **Discord/Community**
   - Join community server
   - Ask in appropriate channel

---

## 📚 Related Documentation

- [Quick Start](01-quick-start.md) - Setup guide
- [Browser Setup](04-browser-extension-setup.md) - Installation
- [AI Providers](07-ai-providers.md) - Provider configuration
- [FAQ](19-faq.md) - Frequently asked questions

---

**Still stuck? Create a GitHub issue with your debug information!** 🐛
