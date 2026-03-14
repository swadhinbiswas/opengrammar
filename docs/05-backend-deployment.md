# 🌐 Backend Deployment Guide

Deploy OpenGrammar backend to production with any of these platforms.

---

## 📋 Overview

OpenGrammar backend is a lightweight API that handles grammar checking. You can deploy it to any serverless platform or self-host with Docker.

### Deployment Options Comparison

| Platform | Free Tier | Setup Time | Best For |
|----------|-----------|------------|----------|
| **Cloudflare Workers** | 100K req/day | 5 min | Production, global CDN |
| **Vercel** | 100GB-hours/mo | 5 min | Easy deployment |
| **Railway** | $5 credit | 10 min | Always-on, no sleep |
| **Render** | 750 hours/mo | 10 min | Simple web service |
| **Docker** | Free (your hardware) | 15 min | Self-hosting, full control |

---

## ☁️ Cloudflare Workers (Recommended)

### Prerequisites
- Cloudflare account (free)
- Node.js 18+

### Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Configure Environment
```bash
cd opengrammar/opengrammar/backend

# Create .dev.vars for local development
cat > .dev.vars << EOF
DEBUG=true
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
EOF
```

### Step 4: Deploy
```bash
# Deploy to production
wrangler deploy --env production
```

### Step 5: Get Your URL
After deployment, you'll see:
```
Deployed https://opengrammar.yourname.workers.dev
```

### Step 6: Configure Extension
1. Click extension icon → Settings
2. Backend URL: `https://opengrammar.yourname.workers.dev`
3. Save settings

### Environment Variables (Production)
Set these in Cloudflare Dashboard → Workers → Variables:
```bash
GROQ_API_KEY=gsk_xxx
OPENAI_API_KEY=sk_xxx
OPENROUTER_API_KEY=xxx
DEBUG=false
```

---

## ▲ Vercel

### Prerequisites
- Vercel account (free)
- Node.js 18+

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
cd opengrammar/opengrammar/backend
vercel --prod
```

### Step 4: Set Environment Variables
```bash
vercel env add GROQ_API_KEY
vercel env add OPENAI_API_KEY
vercel env add OPENROUTER_API_KEY
```

### Step 5: Get Your URL
```
https://opengrammar-backend.vercel.app
```

### Vercel Configuration
Create `vercel.json` in backend folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

---

## 🚂 Railway

### Prerequisites
- Railway account (free trial)
- GitHub account

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Initialize Project
```bash
cd opengrammar/opengrammar/backend
railway init
```

### Step 4: Deploy
```bash
railway up
```

### Step 5: Set Environment Variables
```bash
railway variables set \
  NODE_ENV=production \
  GROQ_API_KEY=your_key \
  OPENAI_API_KEY=your_key
```

### Step 6: Get Your URL
```bash
railway domain
# Returns: https://your-app.railway.app
```

### Advantages
- ✅ No sleep on free tier
- ✅ Faster wake-up time
- ✅ Better performance than Render free tier
- ✅ Easy scaling

---

## 🎨 Render

### Prerequisites
- Render account (free)
- GitHub account

### Step 1: Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository

### Step 2: Configure Service
```
Name: opengrammar-backend
Region: Choose closest to users
Branch: main
Root Directory: opengrammar/backend
Runtime: Node
Build Command: npm install
Start Command: npx tsx src/index.ts
```

### Step 3: Environment Variables
In Render dashboard, add:
```
NODE_ENV=production
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
DEBUG=false
```

### Step 4: Deploy
Click **Create Web Service**

Render will deploy to: `https://opengrammar-backend.onrender.com`

### ⚠️ Free Tier Limitation
Free tier services sleep after 15 minutes of inactivity. First request takes ~30 seconds to wake up.

**Solutions:**
1. Upgrade to Starter ($7/month) for always-on
2. Use UptimeRobot to ping every 14 minutes
3. Use Railway instead (no sleep)

---

## 🐳 Docker Self-Hosting

### Prerequisites
- Docker installed
- Docker Compose (usually included)

### Option 1: Docker Compose (Recommended)

```bash
cd opengrammar/opengrammar

# Start backend only (use cloud APIs)
docker-compose up -d opengrammar-backend

# Start with Ollama (local LLM)
docker-compose --profile local-llm up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f opengrammar-backend
```

### Option 2: Manual Docker

```bash
# Build image
cd opengrammar/opengrammar/backend
docker build -t opengrammar-backend .

# Run container
docker run -d \
  -p 8787:8787 \
  -e GROQ_API_KEY=your_key \
  -e OPENAI_API_KEY=your_key \
  --name opengrammar \
  opengrammar-backend
```

### Option 3: Docker with Environment File

```bash
# Create .env file
cat > .env << EOF
PORT=8787
NODE_ENV=production
GROQ_API_KEY=gsk_xxx
OPENAI_API_KEY=sk_xxx
OLLAMA_BASE_URL=http://localhost:11434/v1
EOF

# Run with env file
docker run -d \
  -p 8787:8787 \
  --env-file .env \
  --name opengrammar \
  opengrammar-backend
```

### Docker Compose Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  opengrammar-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8787:8787"
    environment:
      - NODE_ENV=production
      - GROQ_API_KEY=${GROQ_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8787/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Local LLM with Ollama
  ollama:
    image: ollama/ollama:latest
    profiles:
      - local-llm
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

volumes:
  ollama_data:
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `8787` |
| `NODE_ENV` | No | Environment | `development` |
| `GROQ_API_KEY` | No | Groq API key | - |
| `OPENAI_API_KEY` | No | OpenAI API key | - |
| `OPENROUTER_API_KEY` | No | OpenRouter API key | - |
| `TOGETHER_API_KEY` | No | Together AI API key | - |
| `OLLAMA_BASE_URL` | No | Ollama URL | `http://localhost:11434/v1` |
| `DEBUG` | No | Enable debug logging | `false` |

### CORS Configuration

The backend includes CORS headers for browser access. If you need to customize:

```typescript
// backend/src/index.ts
app.use('*', cors({
  origin: ['chrome-extension://*', 'moz-extension://*'],
  credentials: true,
}));
```

---

## 🧪 Testing Your Deployment

### Health Check
```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-14T12:00:00.000Z",
  "environment": "production"
}
```

### Test Grammar Analysis
```bash
curl -X POST https://your-backend-url.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "me and him went to store"}'
```

### List Providers
```bash
curl https://your-backend-url.com/providers
```

---

## 📊 Performance Benchmarks

| Platform | Cold Start | Avg Response | Monthly Cost |
|----------|------------|--------------|--------------|
| Cloudflare Workers | ~50ms | 200ms | Free (100K req) |
| Vercel | ~100ms | 300ms | Free (100GB-hr) |
| Railway | ~500ms | 250ms | $5 (hobby) |
| Render (free) | ~30s | 300ms | Free (sleeps) |
| Docker (self) | 0ms | 200ms | Free (your HW) |

---

## 🔒 Security Best Practices

### 1. Use Environment Variables
Never commit API keys to git:
```bash
# Add to .gitignore
echo ".env" >> .gitignore
```

### 2. Enable Rate Limiting
```typescript
// backend/src/index.ts
import { rateLimit } from 'hono-rate-limit';

app.use('/analyze', rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
}));
```

### 3. Validate Input
```typescript
// Limit text length
if (text.length > 50000) {
  return c.json({ error: 'Text too long (max 50,000 chars)' }, 400);
}
```

### 4. Use HTTPS
All production deployments should use HTTPS (enabled by default on most platforms).

---

## 📈 Monitoring

### Cloudflare Workers
```bash
# Stream logs in real-time
wrangler tail
```

### Vercel
```bash
# View logs
vercel logs
```

### Railway
```bash
# Real-time logs
railway logs
```

### Docker
```bash
# View logs
docker-compose logs -f opengrammar-backend

# Check container status
docker-compose ps
```

---

## 🔄 Auto-Deploy on Git Push

### GitHub Actions + Cloudflare
```yaml
# .github/workflows/deploy.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths: ['opengrammar/backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          workingDirectory: opengrammar/backend
```

### Vercel Auto-Deploy
Vercel automatically deploys on git push when connected to GitHub.

---

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Check logs
docker-compose logs opengrammar-backend

# Test locally first
cd backend && bun run dev

# Check port conflict
lsof -i :8787
```

### CORS Errors
Make sure your backend URL is correct in extension settings and CORS is properly configured.

### High Latency
- Use Cloudflare Workers for global CDN
- Enable compression
- Consider edge deployment

### API Keys Not Working
- Verify keys in environment variables
- Check provider dashboards for usage limits
- Test keys locally first

---

## 📚 Related Documentation

- [AI Provider Setup](07-ai-providers.md) - Configure AI providers
- [Docker Self-Hosting](06-docker-self-hosting.md) - Complete Docker guide
- [Troubleshooting](18-troubleshooting.md) - Common issues

---

**Your backend is now deployed and ready to power OpenGrammar! 🎉**
