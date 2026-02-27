# 🔧 Quick Troubleshooting Guide

## Issue: Extension Closes/Crashes

### ✅ Fixed in Latest Version

**What was fixed:**
- Better error handling in content script
- Reduced error notifications
- Silent handling of non-critical errors

**Update and reload:**
```bash
# Rebuild extension
cd opengrammar/extension && npm run build

# Reload in Chrome:
# chrome://extensions/ → Click reload icon on OpenGrammar
```

---

## Issue: Invalid Model Error

### ❌ Problem: Using Invalid Groq Model

**Invalid model:** `openai/gpt-oss-120b` (not a real Groq model)

### ✅ Solution: Use Valid Groq Models

**Valid Groq Models:**
- `llama-3.1-70b-versatile` ✅ (Recommended)
- `llama-3.1-8b-instant` ✅ (Fast)
- `gemma2-9b-it` ✅
- `mixtral-8x7b-32768` ✅

**How to fix:**
1. Click extension icon
2. Select **Groq** provider
3. Choose model: `llama-3.1-70b-versatile`
4. Enter your Groq API key
5. Save settings

---

## Issue: No Grammar Highlights

### Possible Causes:

1. **Backend not running**
   ```bash
   # Start backend
   cd opengrammar/backend
   npm run dev
   ```

2. **Wrong backend URL**
   - Click extension icon
   - Backend URL should be: `http://localhost:8787`
   - Green dot = Connected ✅

3. **Extension disabled for site**
   - Check options page → Site-specific settings
   - Make sure current site is not disabled

4. **Text too short**
   - Extension only checks text with 5+ characters

---

## Issue: API Key Not Working

### For Groq:

1. **Get API key from:** https://console.groq.com
2. **Key format:** Should start with `gsk_`
3. **Free tier:** 100 requests/day
4. **Enter in extension:**
   - Click icon → API Key field
   - Paste key starting with `gsk_`

### Test API Key:
```bash
cd opengrammar/backend
node test-groq.js
# Should show: ✅ Success!
```

---

## Issue: Model Dropdown Shows Wrong Models

### ✅ Fixed: Model lists now match providers

**Groq models:**
- llama-3.1-70b-versatile
- llama-3.1-8b-instant
- gemma2-9b-it
- mixtral-8x7b-32768

**If models don't update:**
1. Reload extension in chrome://extensions/
2. Clear browser cache
3. Re-open popup

---

## Issue: "2 notes selected" Error

### Cause:
Text selection handling issue

### ✅ Fixed:
- Better null checks in background script
- Safer tab messaging
- Error handling for missing tabs

### Workaround (if issue persists):
1. Reload extension
2. Refresh the page
3. Try selecting text again

---

## Quick Test Checklist

Test if everything works:

```bash
# 1. Backend running?
curl http://localhost:8787/health
# Expected: {"status":"healthy",...}

# 2. Extension loaded?
# Check chrome://extensions/ → OpenGrammar enabled

# 3. Test grammar check
# Type in text box: "me and him went"
# Expected: Red underline appears

# 4. Test rewrite
# Select text → Right-click → "Rewrite with OpenGrammar"
# Expected: Rewrite popup opens
```

---

## Debug Mode

### Enable Debug Logging:

**Backend:**
```bash
cd opengrammar/backend
DEBUG=true npm run dev
```

**Extension Console:**
1. Open any page
2. Press F12 → Console
3. Look for OpenGrammar logs

### Common Log Messages:

| Message | Meaning |
|---------|---------|
| `Grammar check skipped` | Normal - text too short or not editable |
| `Backend connection issue` | Backend not running or wrong URL |
| `LLM Analysis Error` | API key invalid or rate limit |
| `Settings saved` | ✅ Settings updated successfully |

---

## Reset Everything

If nothing works, reset:

```bash
# 1. Clear extension settings
# Extension icon → Settings → Reset All Settings

# 2. Reload extension
# chrome://extensions/ → Reload OpenGrammar

# 3. Restart backend
# Ctrl+C → npm run dev

# 4. Re-test
# Type: "me and him went to store"
# Expected: Grammar highlights appear
```

---

## Still Having Issues?

### Collect Debug Info:

1. **Extension version:**
   - chrome://extensions/ → Note version number

2. **Backend logs:**
   ```bash
   cd opengrammar/backend
   npm run dev 2>&1 | tee backend.log
   ```

3. **Browser console:**
   - F12 → Console → Copy errors

4. **Test results:**
   ```bash
   curl http://localhost:8787/health
   curl http://localhost:8787/providers
   ```

### Get Help:

- Check `TESTING_GUIDE.md` for detailed testing
- Check `GROQ_SETUP.md` for Groq-specific issues
- Check `FEATURES_IMPLEMENTATION.md` for feature details

---

**Last Updated:** After commit `5eb7975` (Error handling improvements)
