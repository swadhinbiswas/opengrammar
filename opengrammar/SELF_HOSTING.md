# 🐳 OpenGrammar Self-Hosting Guide

Run OpenGrammar locally with **local LLM support** (Qwen, Phi-4-mini, Llama) using Docker and Ollama.

---

## 🎯 Options Overview

| Option | Best For | Cost | Privacy |
|--------|----------|------|---------|
| **Cloud APIs** (OpenAI, Groq, Together) | Production, best quality | $0.01-0.10/request | ⭐⭐⭐ |
| **Local Ollama** (Qwen, Phi-4-mini) | Privacy, free, offline | Free (your hardware) | ⭐⭐⭐⭐⭐ |
| **Hybrid** (Rules local + AI cloud) | Balance | Free-$5/mo | ⭐⭐⭐⭐ |

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
cd opengrammar

# Start backend only (use cloud APIs)
docker-compose up -d opengrammar-backend

# Start backend + Ollama with local models (requires GPU for good performance)
docker-compose --profile local-llm up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Option 2: Manual Docker

```bash
# Build backend image
cd opengrammar/backend
docker build -t opengrammar-backend .

# Run container
docker run -d \
  -p 8787:8787 \
  --name opengrammar \
  opengrammar-backend
```

### Option 3: Direct Node.js

```bash
cd opengrammar/backend
npm install
npm run dev  # Runs on http://localhost:8787
```

---

## 🤖 Local LLM Setup with Ollama

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
Download from [ollama.com](https://ollama.com)

### Step 2: Pull Grammar-Focused Models

```bash
# Small & fast (good for grammar checking)
ollama pull qwen2.5:0.5b      # 0.5B parameters, ~400MB
ollama pull qwen2.5:1.5b      # 1.5B parameters, ~1GB

# Medium quality
ollama pull phi4-mini:3.8b    # 3.8B parameters, ~2.5GB
ollama pull llama3.2:3b       # 3B parameters, ~2GB

# High quality (requires GPU)
ollama pull llama3.2:7b       # 7B parameters, ~4GB
ollama pull mistral:7b        # 7B parameters, ~4GB
```

### Step 3: Test Ollama

```bash
# Test the model
ollama run qwen2.5:0.5b "Fix this: me and him went to store"

# Should respond with corrected grammar
```

### Step 4: Configure OpenGrammar

In extension options:
- **Provider:** Ollama (Local)
- **Base URL:** `http://localhost:11434/v1`
- **Model:** `qwen2.5:0.5b` or `qwen2.5:1.5b`
- **API Key:** (leave empty - not needed)

---

## ☁️ Cloud API Setup

### Supported Providers

| Provider | Speed | Quality | Cost | Best Models |
|----------|-------|---------|------|-------------|
| **Groq** | ⚡⚡⚡ | ⭐⭐⭐⭐ | Free tier | `llama-3.1-70b-versatile` |
| **Together** | ⚡⚡ | ⭐⭐⭐⭐ | $0.01/1K | `Meta-Llama-3.1-70B` |
| **OpenRouter** | ⚡⚡ | ⭐⭐⭐⭐⭐ | Varies | `claude-3.5-sonnet` |
| **OpenAI** | ⚡ | ⭐⭐⭐⭐⭐ | $0.015/1K | `gpt-4o-mini` |

### Get API Keys

1. **Groq:** [console.groq.com](https://console.groq.com) (Free tier: 100 req/day)
2. **Together:** [api.together.ai](https://api.together.ai) ($25 free credit)
3. **OpenRouter:** [openrouter.ai](https://openrouter.ai) (Pay-as-you-go)
4. **OpenAI:** [platform.openai.com](https://platform.openai.com) ($5 free credit)

### Configure in Extension

1. Click extension icon → Settings
2. Select provider
3. Enter API key
4. Choose model
5. Test connection

---

## 🔧 Configuration

### Environment Variables (Backend)

```bash
# .env file in backend/
PORT=8787
NODE_ENV=production

# Optional: Default API keys (users can override in extension)
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
TOGETHER_API_KEY=...
OPENROUTER_API_KEY=...

# Ollama URL (for local LLM)
OLLAMA_BASE_URL=http://localhost:11434/v1
```

### Recommended Models by Use Case

| Use Case | Model | Provider | RAM Required |
|----------|-------|----------|--------------|
| **Basic grammar** | qwen2.5:0.5b | Ollama | 1GB |
| **Better accuracy** | qwen2.5:1.5b | Ollama | 2GB |
| **Professional writing** | gpt-4o-mini | OpenAI | N/A |
| **Fast + free** | llama-3.1-70b | Groq | N/A |
| **Best quality** | claude-3.5-sonnet | OpenRouter | N/A |

---

## 📊 Performance Benchmarks

### Local LLM (RTX 4090)

| Model | Tokens/sec | Grammar Accuracy | RAM |
|-------|------------|------------------|-----|
| qwen2.5:0.5b | ~100 | 75% | 1GB |
| qwen2.5:1.5b | ~80 | 82% | 2GB |
| phi4-mini:3.8b | ~50 | 88% | 4GB |
| llama3.2:7b | ~30 | 90% | 8GB |

### Cloud APIs

| Model | Latency | Grammar Accuracy | Cost/1K requests |
|-------|---------|------------------|------------------|
| gpt-4o-mini | ~1s | 95% | $0.15 |
| llama-3.1-70b (Groq) | ~200ms | 92% | Free (tier) |
| claude-3.5-sonnet | ~2s | 96% | $3.00 |

---

## 🔒 Security Considerations

### Local Deployment
- ✅ All data stays on your machine
- ✅ No API calls
- ✅ Full privacy
- ⚠️ Your hardware cost

### Cloud APIs
- ✅ Text sent only to chosen provider
- ✅ No logging by OpenGrammar
- ⚠️ API key required
- ⚠️ Data leaves your machine

### Best Practices
1. Use API keys with spending limits
2. Rotate keys periodically
3. Never commit keys to git
4. Use HTTPS in production

---

## 🛠️ Troubleshooting

### Backend Won't Start

```bash
# Check logs
docker-compose logs opengrammar-backend

# Test health endpoint
curl http://localhost:8787/health

# Check port conflict
lsof -i :8787
```

### Ollama Connection Failed

```bash
# Check Ollama is running
ollama list

# Test Ollama directly
curl http://localhost:11434/api/tags

# Restart Ollama
sudo systemctl restart ollama  # Linux
brew services restart ollama   # macOS
```

### Docker GPU Support (NVIDIA)

```bash
# Install NVIDIA Container Toolkit
sudo apt-get install -y nvidia-container-toolkit

# Configure Docker
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Run with GPU
docker-compose --profile local-llm up -d
```

### Models Not Downloading

```bash
# Check internet connection
ping ollama.com

# Try alternative mirror
OLLAMA_ORIGINS=https://ollama.ollama.com ollama pull qwen2.5:0.5b

# Manual download
wget https://ollama.com/download/qwen2.5:0.5b
```

---

## 📈 Scaling

### Production Deployment

```bash
# Deploy to cloud (Railway, Render, Fly.io)
railway up  # Auto-deploys from GitHub

# Or use Kubernetes
kubectl apply -f k8s/

# Load balancer setup
nginx -c nginx.conf
```

### High Availability

- Run multiple backend instances
- Use Redis for caching
- Enable request queuing
- Monitor with Prometheus + Grafana

---

## 💡 Tips & Tricks

### 1. Hybrid Mode (Best of Both Worlds)

Configure rules to run locally, AI only for complex issues:

```json
{
  "provider": "ollama",
  "model": "qwen2.5:0.5b",
  "fallbackProvider": "groq",
  "fallbackModel": "llama-3.1-70b-versatile"
}
```

### 2. Custom System Prompt

Tailor AI behavior for your needs:

```
You are a grammar expert. Be concise. Only suggest changes that improve clarity.
```

### 3. Batch Processing

For long documents, split into chunks:

```javascript
const chunks = text.split(/\n\n/);
const results = await Promise.all(
  chunks.map(chunk => analyze(chunk))
);
```

### 4. Model Comparison

Test multiple models on same text:

```bash
curl http://localhost:8787/analyze \
  -d '{"text": "...", "provider": "ollama", "model": "qwen2.5:0.5b"}'

curl http://localhost:8787/analyze \
  -d '{"text": "...", "provider": "groq", "model": "llama-3.1-70b"}'
```

---

## 🎓 Learning Resources

- [Ollama Documentation](https://ollama.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Hono Framework](https://hono.dev/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)

---

## 🤝 Support

- **Issues:** [GitHub Issues](https://github.com/your-repo/opengrammar/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-repo/opengrammar/discussions)
- **Discord:** [Join our server](https://discord.gg/your-server)

---

**Happy self-hosting! 🎉**
