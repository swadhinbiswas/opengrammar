# Vercel Deployment Guide

Deploy OpenGrammar backend to Vercel Edge Functions.

## Prerequisites

- Vercel account (free tier works)
- Vercel CLI installed: `npm i -g vercel`
- Node.js 18+

## Quick Deploy

### 1. Prepare Configuration

The `vercel.json` is already configured in the backend folder:

```json
{
  "version": 2,
  "regions": ["iad1"],
  "functions": {
    "src/index.ts": {
      "runtime": "@vercel/node"
    }
  }
}
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Link Project

```bash
cd opengrammar/backend
vercel link
```

Follow the prompts:
- Set up and link? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time)
- Project name: **opengrammar-backend**

### 4. Set Environment Variables

```bash
vercel env add PORT production
# Value: 8080

vercel env add ENV production
# Value: production
```

### 5. Deploy

```bash
vercel --prod
```

## Custom Domain

### Add Domain in Vercel Dashboard

1. Go to project settings
2. Navigate to Domains
3. Add your domain: `api.yourdomain.com`
4. Follow DNS configuration instructions

### Update DNS

Add the records provided by Vercel:
- **CNAME** for subdomain
- **A** record for root domain

## Update Extension

After deployment:

1. Copy your Vercel URL
2. Update `BACKEND_URL` in `extension/src/background/index.ts`
3. Rebuild extension: `npm run build`
4. Reload extension in Chrome

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `ENV` | Environment name | production |
| `ALLOWED_ORIGINS` | CORS origins | * |

Set via Vercel dashboard or CLI:

```bash
vercel env add ALLOWED_ORIGINS production
# Value: https://your-extension-id.chromiumapp.org
```

## Testing

### Health Check

```bash
curl https://your-project.vercel.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-03-21T12:00:00.000Z",
  "environment": "production",
  "version": "2.0.0"
}
```

### Test Analysis

```bash
curl -X POST https://your-project.vercel.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test.", "apiKey": "your-key"}'
```

## Monitoring

### View Logs

```bash
vercel logs
```

### Real-time Logs

```bash
vercel logs --follow
```

## CI/CD Integration

### GitHub Integration

1. Go to Vercel dashboard
2. Import Git repository
3. Configure build settings:
   - Framework Preset: **Node.js**
   - Root Directory: **opengrammar/backend**
   - Build Command: **npm run build**
   - Output Directory: **dist**

### Automatic Deployments

- Push to `main`: Production deployment
- Push to other branches: Preview deployment

## Troubleshooting

### Build Fails

Check build logs:
```bash
vercel --debug
```

Common issues:
- Missing dependencies in package.json
- TypeScript errors
- Incorrect entry point

### Runtime Errors

Check function logs:
```bash
vercel logs --follow
```

### CORS Issues

Update `ALLOWED_ORIGINS`:
```bash
vercel env rm ALLOWED_ORIGINS production
vercel env add ALLOWED_ORIGINS production
```

## Pricing

### Free Tier

- 100GB bandwidth/month
- 100GB hours compute
- Unlimited deployments
- Automatic SSL

### Pro Tier ($20/month)

- 1TB bandwidth/month
- 1000GB hours compute
- Custom domains
- Analytics

## Comparison with Other Platforms

| Feature | Vercel | Cloudflare | Render |
|---------|--------|------------|--------|
| Cold Start | ~50ms | ~5ms | ~250ms |
| Free Tier | Good | Best | Limited |
| Ease of Use | Excellent | Good | Good |
| Global Edge | Yes | Yes | Limited |

## Next Steps

After deployment:
1. Test all endpoints
2. Update extension with new URL
3. Monitor usage in Vercel dashboard
4. Set up usage alerts

---

For more help, see [Vercel Documentation](https://vercel.com/docs).
