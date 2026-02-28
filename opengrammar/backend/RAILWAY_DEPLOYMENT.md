# Railway Deployment Guide

## Quick Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/opengrammar-backend)

## Setup Instructions

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login
```bash
railway login
```

### 3. Initialize Project
```bash
cd opengrammar/backend
railway init
```

### 4. Deploy
```bash
railway up
```

### 5. Set Environment Variables
```bash
railway variables set \
  NODE_ENV=production \
  GROQ_API_KEY=your_key \
  OPENAI_API_KEY=your_key
```

### 6. Get Your URL
```bash
railway domain
# Returns: https://your-app.railway.app
```

### 7. Update Extension
Backend URL: `https://your-app.railway.app`

## Pricing

- **Trial**: $5 credit (no card required)
- **Hobby**: $5/month
  - Always-on
  - 5GB RAM
  - 100GB bandwidth
  - Good for production

## Advantages Over Render

✅ No sleep on free tier
✅ Faster wake-up time
✅ Better performance
✅ More generous free tier
✅ Easy scaling

## Testing

```bash
curl https://your-app.railway.app/health
curl -X POST https://your-app.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "test"}'
```

## Auto-Deploy

Railway auto-deploys on git push:
```bash
git push origin main
# Railway automatically rebuilds and deploys
```

## Logs

```bash
# View logs in real-time
railway logs
```

## Database (Optional)

If you add database later:
```bash
# Add PostgreSQL
railway add postgresql

# Connect to your service
railway link
```

## Scaling

Railway auto-scales vertically:
- More RAM
- More CPU
- Pay for what you use
