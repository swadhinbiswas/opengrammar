# 🚀 Quick Start with Groq API

## Step 1: Get Your Free Groq API Key

1. Visit: https://console.groq.com
2. Sign up / Log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy your API key (starts with `gsk_`)

**Free Tier Limits:**
- 100 requests/day
- Fast inference (LPU technology)
- Access to Llama 3.1 70B, Mixtral, Gemma, etc.

---

## Step 2: Configure Backend

1. **Edit `.env` file:**
   ```bash
   cd opengrammar/backend
   nano .env  # or use your favorite editor
   ```

2. **Add your Groq API key:**
   ```env
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

3. **Save the file**

---

## Step 3: Test Groq Integration

### Option A: Test with Test Script

```bash
cd opengrammar/backend
node test-groq.js
```

**Expected Output:**
```
🧪 Testing Groq Grammar Check API...

Input text: me and him went to the store and buyed some milks

Sending request to Groq...

✅ Success! Response:
{
  "issues": [
    {
      "type": "grammar",
      "original": "me and him",
      "suggestion": "he and I",
      "reason": "Subject pronoun error"
    },
    {
      "type": "spelling",
      "original": "buyed",
      "suggestion": "bought",
      "reason": "Irregular verb form"
    }
  ]
}

✅ Found 2 issues:
...
```

### Option B: Start Backend Server

```bash
npm run dev
```

Server will start on `http://localhost:8787`

---

## Step 4: Configure Extension

1. **Click extension icon** in Chrome

2. **Select Provider:** Groq

3. **Enter API Key:** (same key from Step 1)

4. **Select Model:** `llama-3.1-70b-versatile` (recommended)

5. **Verify Connection:** Green dot should appear

---

## Step 5: Test Grammar Checking

1. **Open any text box** (Gmail, Google Docs, etc.)

2. **Type text with errors:**
   ```
   me and him went to store and buyed milks
   ```

3. **Wait 1 second** - Grammar highlights should appear

4. **Click highlight** to see suggestions

5. **Click "Apply"** to fix the error

---

## 🎯 Recommended Groq Models

| Model | Speed | Quality | Best For |
|-------|-------|---------|----------|
| **llama-3.1-70b-versatile** | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | General grammar checking |
| **llama-3.1-8b-instant** | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Fast, simple checks |
| **mixtral-8x7b-32768** | ⚡⚡ | ⭐⭐⭐⭐⭐ | Complex writing |
| **gemma2-9b-it** | ⚡⚡⚡ | ⭐⭐⭐⭐ | Balanced performance |

---

## 🔧 Troubleshooting

### Error: "Invalid API key"
- Check your API key in `.env` file
- Make sure there are no spaces
- Key should start with `gsk_`

### Error: "Rate limit exceeded"
- Groq free tier: 100 requests/day
- Wait 24 hours or upgrade plan

### Backend won't start
```bash
# Check if Groq SDK is installed
npm install

# Check TypeScript
npx tsc --noEmit

# Restart server
npm run dev
```

### No grammar highlights
- Verify backend is running: `curl http://localhost:8787/health`
- Check extension settings → Provider should be "Groq"
- Check browser console for errors (F12)

---

## 📊 API Usage

### Check Usage Dashboard
Visit: https://console.groq.com/usage

### Monitor in Real-Time
```bash
# Backend logs
npm run dev

# Watch for API calls
# Look for: "LLM Analysis Error (groq):" in console
```

---

## 💡 Tips

1. **Use `.env` for testing** - Don't commit API keys to git
2. **Start with llama-3.1-70b** - Best balance of speed/quality
3. **Test with test-groq.js first** - Easier to debug
4. **Monitor usage** - Free tier resets daily
5. **Upgrade when ready** - Paid plans available

---

## 🎉 You're Ready!

Your OpenGrammar backend is now powered by **Groq's blazing-fast LPU inference**!

**Next Steps:**
1. Test with real text in browser
2. Try different Groq models
3. Compare with other providers (OpenAI, Ollama)
4. Deploy to production when ready

---

**Need Help?**
- Groq Docs: https://console.groq.com/docs
- OpenGrammar Docs: `TESTING_GUIDE.md`, `SELF_HOSTING.md`
