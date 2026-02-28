# Render Deployment Guide

## Quick Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/your-username/opengrammar)

## Setup Instructions

### 1. Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: opengrammar-backend
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Root Directory**: `opengrammar/backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npx tsx src/index.ts`

### 2. Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key (optional)
OPENROUTER_API_KEY=your_openrouter_key (optional)
DEBUG=false
```

### 3. Deploy

Click "Create Web Service"

Render will:
- Install dependencies
- Build your app
- Deploy to https://opengrammar-backend.onrender.com

### 4. Update Extension

In your extension settings:
- Backend URL: `https://opengrammar-backend.onrender.com`

## Pricing

- **Free Tier**: 
  - 750 hours/month (always-on)
  - 0.5GB RAM
  - Good for testing/small usage
  
- **Starter**: $7/month
  - Always-on
  - More resources

## Testing

```bash
# Test health
curl https://opengrammar-backend.onrender.com/health

# Test analysis
curl -X POST https://opengrammar-backend.onrender.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "me and him went"}'
```

## Auto-Sleep (Free Tier)

Free tier services sleep after 15 minutes of inactivity.
First request after sleep takes ~30 seconds to wake up.

**Solutions:**
1. Upgrade to Starter ($7/month) for always-on
2. Use UptimeRobot (free) to ping every 14 minutes
3. Use Railway instead (see RAILWAY_DEPLOYMENT.md)

## Logs

View logs in Render dashboard:
- Real-time logs
- Error tracking
- Request logs

## Custom Domain (Optional)

1. Go to Settings → Custom Domain
2. Add your domain
3. Configure DNS
4. HTTPS auto-configured

## Scaling

Render auto-scales based on traffic.
Free tier: Single instance
Paid tiers: Auto-scaling available
