# 🤖 AI Provider Setup Guide

Configure AI providers for advanced grammar checking and tone rewriting.

---

## 📋 Overview

OpenGrammar supports **6 AI providers**, giving you flexibility in cost, quality, and privacy.

| Provider | Speed | Quality | Cost | Best For |
|----------|-------|---------|------|----------|
| **Groq** | ⚡⚡⚡ | ⭐⭐⭐⭐ | Free tier | Fast & free |
| **OpenAI** | ⚡⚡ | ⭐⭐⭐⭐⭐ | $$ | Best quality |
| **OpenRouter** | ⚡⚡ | ⭐⭐⭐⭐⭐ | Varies | Model variety |
| **Together AI** | ⚡⚡ | ⭐⭐⭐⭐ | $ | Open-source |
| **Ollama** | ⚡⚡⚡ | ⭐⭐⭐ | Free | Privacy, offline |
| **Custom** | - | - | - | Your own API |

---

## 🎯 Quick Setup

### Step 1: Choose Your Provider

**For Free Usage:**
- Provider: **Groq**
- Free tier: 100 requests/day
- Quality: Excellent (Llama 3.1 70B)

**For Best Quality:**
- Provider: **OpenAI**
- Model: GPT-4o-mini
- Cost: ~$0.15 per 1K requests

**For Privacy:**
- Provider: **Ollama (Local)**
- 100% offline
- Free (your hardware)

### Step 2: Get API Key

Follow the guide for your chosen provider below.

### Step 3: Configure Extension

1. Click OpenGrammar icon
2. Click **Settings** (gear icon)
3. Select **Provider** from dropdown
4. Enter **API Key**
5. Select **Model**
6. Click **Save**

---

## ⚡ Groq (Recommended - Free)

### Overview
- **Free Tier:** 100 requests/day
- **Speed:** Fastest (LPU technology)
- **Quality:** Excellent (Llama 3.1 70B)
- **Setup Time:** 2 minutes

### Step 1: Create Account
1. Visit [Groq Console](https://console.groq.com)
2. Click **Sign Up**
3. Complete registration

### Step 2: Get API Key
1. Go to **API Keys** in left sidebar
2. Click **Create API Key**
3. Give it a name (e.g., "OpenGrammar")
4. Copy the key (starts with `gsk_`)
5. ⚠️ **Save it now** - you can't see it again!

### Step 3: Configure in Extension
1. Click OpenGrammar icon → Settings
2. Provider: **Groq**
3. API Key: `gsk_xxx` (paste your key)
4. Model: **llama-3.1-70b-versatile**
5. Click **Save**

### Available Models
| Model | Speed | Quality | Best For |
|-------|-------|---------|----------|
| `llama-3.1-70b-versatile` | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | **Recommended** |
| `llama-3.1-8b-instant` | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Fast checks |
| `gemma2-9b-it` | ⚡⚡⚡ | ⭐⭐⭐⭐ | Balanced |
| `mixtral-8x7b-32768` | ⚡⚡ | ⭐⭐⭐⭐⭐ | Complex writing |

### Testing
```bash
# Test Groq API
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer gsk_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-70b-versatile",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### Troubleshooting
- **Error: Invalid API key** - Check key starts with `gsk_`
- **Error: Rate limit** - Free tier is 100/day, wait 24 hours
- **Error: Model not found** - Use exact model name

---

## 🟢 OpenAI (Best Quality)

### Overview
- **Quality:** Best available
- **Speed:** Good
- **Cost:** $0.15 per 1K requests (GPT-4o-mini)
- **Setup Time:** 5 minutes

### Step 1: Create Account
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Click **Sign Up**
3. Complete registration
4. Add phone number (required)

### Step 2: Add Credits
1. Go to **Settings** → **Billing**
2. Click **Add payment method**
3. Add minimum $5 credit (recommended)

### Step 3: Get API Key
1. Go to **API Keys** section
2. Click **Create new secret key**
3. Give it a name (e.g., "OpenGrammar")
4. Copy the key (starts with `sk-`)
5. ⚠️ **Save it now** - can't see it again!

### Step 4: Configure in Extension
1. Click OpenGrammar icon → Settings
2. Provider: **OpenAI**
3. API Key: `sk-xxx` (paste your key)
4. Model: **gpt-4o-mini** (recommended)
5. Click **Save**

### Available Models
| Model | Speed | Quality | Cost/1K | Best For |
|-------|-------|---------|---------|----------|
| `gpt-4o-mini` | ⚡⚡ | ⭐⭐⭐⭐⭐ | $0.15 | **Recommended** |
| `gpt-4o` | ⚡ | ⭐⭐⭐⭐⭐⭐ | $2.50 | Premium quality |
| `gpt-3.5-turbo` | ⚡⚡⚡ | ⭐⭐⭐⭐ | $0.05 | Budget option |

### Cost Estimates
- **Light user** (50 checks/day): ~$0.25/month
- **Medium user** (200 checks/day): ~$1/month
- **Heavy user** (1000 checks/day): ~$5/month

### Testing
```bash
# Test OpenAI API
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer sk-xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Fix: me and him went"}]
  }'
```

---

## 🌐 OpenRouter (100+ Models)

### Overview
- **Models:** 100+ (Claude, Llama, Mistral, etc.)
- **Cost:** Pay-per-use, varies by model
- **Speed:** Good
- **Setup Time:** 5 minutes

### Step 1: Create Account
1. Visit [OpenRouter](https://openrouter.ai)
2. Click **Sign In**
3. Sign in with Google or GitHub

### Step 2: Get API Key
1. Go to **Keys** section
2. Click **Create Key**
3. Give it a name
4. Copy the key

### Step 3: Add Credits
1. Go to **Credits** section
2. Add minimum $5 credit
3. Choose payment method

### Step 4: Configure in Extension
1. Click OpenGrammar icon → Settings
2. Provider: **OpenRouter**
3. API Key: (paste your key)
4. Model: **anthropic/claude-3.5-sonnet** (recommended)
5. Click **Save**

### Popular Models
| Model | Provider | Quality | Cost/1K | Best For |
|-------|----------|---------|---------|----------|
| `anthropic/claude-3.5-sonnet` | Anthropic | ⭐⭐⭐⭐⭐⭐ | $3.00 | Best overall |
| `meta-llama/llama-3.1-70b` | Meta | ⭐⭐⭐⭐⭐ | $0.40 | Great value |
| `mistralai/mistral-large` | Mistral | ⭐⭐⭐⭐⭐ | $2.00 | European AI |
| `google/gemini-pro` | Google | ⭐⭐⭐⭐⭐ | $0.25 | Google quality |

### Testing
```bash
# Test OpenRouter API
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-3.5-sonnet",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

---

## 🔷 Together AI (Open-Source)

### Overview
- **Models:** Open-source (Llama, Mistral, etc.)
- **Cost:** Very cheap ($0.01-0.10 per 1K)
- **Speed:** Fast
- **Setup Time:** 5 minutes

### Step 1: Create Account
1. Visit [Together AI](https://api.together.ai)
2. Click **Sign Up**
3. Complete registration

### Step 2: Get API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Copy the key

### Step 3: Add Credits
1. Go to **Billing** section
2. Add credits (minimum $5)
3. Get $25 free credit on signup

### Step 4: Configure in Extension
1. Click OpenGrammar icon → Settings
2. Provider: **Together AI**
3. API Key: (paste your key)
4. Model: **meta-llama/Meta-Llama-3.1-70B-Instruct**
5. Click **Save**

### Available Models
| Model | Quality | Cost/1K | Best For |
|-------|---------|---------|----------|
| `meta-llama/Meta-Llama-3.1-70B-Instruct` | ⭐⭐⭐⭐⭐ | $0.40 | **Recommended** |
| `mistralai/Mixtral-8x7B-Instruct` | ⭐⭐⭐⭐⭐ | $0.60 | Complex tasks |
| `Qwen/Qwen2.5-72B-Instruct` | ⭐⭐⭐⭐⭐ | $0.40 | Alternative |

---

## 🦙 Ollama (Local - Offline)

### Overview
- **Privacy:** 100% local, offline
- **Cost:** Free (your hardware)
- **Speed:** Depends on hardware
- **Setup Time:** 15 minutes

### Prerequisites
- 4GB+ RAM (for smaller models)
- 8GB+ RAM (for larger models)
- NVIDIA GPU (optional, for acceleration)

### Step 1: Install Ollama

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**macOS:**
```bash
brew install ollama
```

**Windows:**
1. Download from [ollama.com](https://ollama.com)
2. Run installer

### Step 2: Start Ollama Service
```bash
# Start Ollama (runs in background)
ollama serve
```

### Step 3: Pull Models
```bash
# Small & fast (recommended for grammar)
ollama pull qwen2.5:0.5b      # 400MB, very fast
ollama pull qwen2.5:1.5b      # 1GB, balanced

# Medium quality
ollama pull phi4-mini:3.8b    # 2.5GB, great quality
ollama pull llama3.2:3b       # 2GB, good balance

# High quality (requires GPU)
ollama pull llama3.2:7b       # 4GB, requires 8GB+ RAM
ollama pull mistral:7b        # 4GB, requires 8GB+ RAM
```

### Step 4: Test Ollama
```bash
# Test the model
ollama run qwen2.5:1.5b "Fix this: me and him went to store"
```

Expected output:
```
"He and I went to the store."
```

### Step 5: Configure in Extension
1. Click OpenGrammar icon → Settings
2. Provider: **Ollama (Local)**
3. Base URL: `http://localhost:11434/v1`
4. Model: `qwen2.5:1.5b` (or your chosen model)
5. API Key: (leave empty - not needed)
6. Click **Save**

### Model Recommendations

| Use Case | Model | RAM | Speed | Quality |
|----------|-------|-----|-------|---------|
| **Basic grammar** | qwen2.5:0.5b | 1GB | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ |
| **Better accuracy** | qwen2.5:1.5b | 2GB | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ |
| **Professional writing** | phi4-mini:3.8b | 4GB | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| **Best quality** | llama3.2:7b | 8GB | ⚡⚡ | ⭐⭐⭐⭐⭐ |

### GPU Acceleration (NVIDIA)
```bash
# Install NVIDIA Container Toolkit
sudo apt-get install -y nvidia-container-toolkit

# Configure Docker
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Ollama will automatically use GPU
ollama run llama3.2:7b
```

### Troubleshooting
- **Error: Connection refused** - Make sure Ollama is running: `ollama serve`
- **Error: Model not found** - Pull the model: `ollama pull qwen2.5:1.5b`
- **Slow performance** - Use smaller model or enable GPU

---

## 🔧 Custom Provider

### Overview
Use your own API endpoint or any OpenAI-compatible API.

### Configuration
1. Click OpenGrammar icon → Settings
2. Provider: **Custom**
3. Base URL: `https://your-api.com/v1`
4. API Key: (your API key)
5. Model: (your model name)
6. Click **Save**

### Example: LocalAI
```bash
# Run LocalAI with Docker
docker run -p 8080:8080 localai/localai

# Configure in extension
Provider: Custom
Base URL: http://localhost:8080/v1
Model: llama-3.1-70b
```

### Example: LM Studio
```bash
# LM Studio runs locally
# Configure in extension
Provider: Custom
Base URL: http://localhost:1234/v1
Model: local-model
```

---

## 📊 Provider Comparison

### Speed Comparison
```
Groq (Llama-70B)        ████████████████████ 200ms
OpenAI (GPT-4o-mini)    ██████████ 1s
Together (Llama-70B)    ████████████ 800ms
OpenRouter (Claude)     ██████████████████ 2s
Ollama (Qwen-1.5B)      ██████████████ 500ms (local)
```

### Quality Comparison
```
OpenAI (GPT-4o)         ████████████████████ 96%
OpenRouter (Claude)     ████████████████████ 96%
OpenAI (GPT-4o-mini)    ██████████████████ 95%
Groq (Llama-70B)        ████████████████ 92%
Ollama (Phi-4-mini)     ██████████████ 88%
Ollama (Qwen-1.5B)      ████████████ 82%
```

### Cost Comparison (per 1K requests)
```
Ollama (Local)          $0.00 (free)
Groq (Free tier)        $0.00 (100/day free)
Together (Llama-70B)    $0.40
OpenAI (GPT-4o-mini)    $0.15
OpenRouter (Claude)     $3.00
```

---

## 🎯 Provider Selection Guide

### Choose Groq If:
- ✅ You want free usage
- ✅ You need fast responses
- ✅ You're okay with 100 requests/day limit
- ✅ You want good quality

### Choose OpenAI If:
- ✅ You want the best quality
- ✅ You don't mind paying
- ✅ You need reliability
- ✅ You want GPT-4 level intelligence

### Choose OpenRouter If:
- ✅ You want model variety
- ✅ You want to try Claude
- ✅ You want flexibility
- ✅ You need specific models

### Choose Together AI If:
- ✅ You want cheap open-source
- ✅ You like Llama models
- ✅ You want good value
- ✅ You need fast inference

### Choose Ollama If:
- ✅ Privacy is your priority
- ✅ You have good hardware
- ✅ You want offline access
- ✅ You don't want API costs

---

## 🔄 Switching Providers

You can switch providers anytime:

1. Click OpenGrammar icon
2. Click **Settings**
3. Change **Provider** dropdown
4. Enter new API key (if required)
5. Select new **Model**
6. Click **Save**

Your settings are saved automatically.

---

## 📚 Related Documentation

- [Backend Deployment](05-backend-deployment.md) - Deploy your backend
- [Docker Self-Hosting](06-docker-self-hosting.md) - Run locally
- [Troubleshooting](18-troubleshooting.md) - Common issues

---

**Your AI provider is now configured! Start writing better! ✨**
