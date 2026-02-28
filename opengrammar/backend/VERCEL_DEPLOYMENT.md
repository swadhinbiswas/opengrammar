# Vercel deployment for OpenGrammar Backend

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/opengrammar/tree/main/opengrammar/backend)

## Setup Instructions

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
cd opengrammar/backend
vercel --prod
```

### 4. Set Environment Variables
```bash
# In Vercel dashboard or via CLI:
vercel env add GROQ_API_KEY
vercel env add OPENAI_API_KEY
vercel env add OPENROUTER_API_KEY
```

### 5. Update Extension
After deployment, Vercel will give you a URL like:
`https://opengrammar-backend.vercel.app`

Update your extension settings:
- Backend URL: `https://opengrammar-backend.vercel.app`

## Features

✅ Serverless deployment
✅ Free tier (100GB-hours/month)
✅ Auto-scaling
✅ HTTPS by default
✅ Global CDN
✅ Zero configuration

## Environment Variables

Set these in Vercel dashboard (Project Settings → Environment Variables):

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Optional | Groq API key for AI |
| `OPENAI_API_KEY` | Optional | OpenAI API key |
| `OPENROUTER_API_KEY` | Optional | OpenRouter API key |
| `DEBUG` | Optional | Enable debug logging |

## Testing

After deployment:
```bash
# Test health endpoint
curl https://your-app.vercel.app/health

# Test analysis
curl -X POST https://your-app.vercel.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "me and him went"}'
```

## Pricing

- **Free Tier**: 100GB-hours/month, enough for ~10K requests/day
- **Pro**: $20/month for more usage

## Notes

- Vercel uses Node.js runtime (not Cloudflare Workers)
- All features work the same
- No wrangler.toml needed on Vercel
- CORS is already enabled
