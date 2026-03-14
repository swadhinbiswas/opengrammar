# 🌩️ Cloudflare Pages Deployment Guide

Deploy OpenGrammar documentation to Cloudflare Pages for free, fast, global CDN hosting.

---

## 🚀 Quick Deploy (Recommended)

### Option 1: Direct GitHub Integration

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign in to your account

2. **Create New Project**
   - Navigate to **Workers & Pages**
   - Click **Create application**
   - Select **Pages** tab
   - Click **Connect to Git**

3. **Select Repository**
   - Choose `swadhinbiswas/opengrammar`
   - Select branch: `main`

4. **Configure Build Settings**
   ```
   Production branch: main
   Build command: (leave empty - no build needed)
   Build output directory: . (root)
   ```

5. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will deploy automatically

---

### Option 2: Wrangler CLI

#### Prerequisites
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

#### Deploy Commands
```bash
# Navigate to project
cd /data/data/com.termux/files/home/project/opengrammar

# Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=opengrammar-docs

# Or with specific branch
wrangler pages deploy . --project-name=opengrammar-docs --branch=main
```

---

## ⚙️ Configuration

### Project Settings

In Cloudflare Dashboard → Pages → Your Project → Settings:

#### Build & Deployment
```yaml
Production branch: main
Build command: (empty)
Build output directory: .
Root directory: (empty)
```

#### Environment Variables
```bash
# Not required for static site
# Add if you need custom variables
```

#### Compatibility Flags
```
Node.js compat: Disabled
Compatibility date: 2024-01-01
```

---

## 🔧 Advanced Configuration

### Custom Domain

1. **Go to Project Settings**
   - Cloudflare Pages → Your Project → Settings

2. **Add Custom Domain**
   - Click **Custom domains**
   - Enter your domain (e.g., `docs.opengrammar.dev`)
   - Click **Add domain**

3. **DNS Configuration**
   - Cloudflare automatically configures DNS
   - Or manually add CNAME record:
   ```
   Type: CNAME
   Name: docs
   Target: opengrammar-docs.pages.dev
   ```

### Automatic Deployments

#### Preview Deployments
- Every push to non-main branches creates preview URL
- Format: `https://<branch>.opengrammar-docs.pages.dev`

#### Production Deployments
- Every push to `main` branch deploys to production
- Format: `https://opengrammar-docs.pages.dev`

### Deployment Hooks

Add custom scripts in Settings → Build & deployment → Hooks:

```bash
# Before build
echo "Starting deployment..."

# After build
echo "Deployment complete!"
```

---

## 📊 Features

### What You Get Free

✅ **Unlimited requests** - No bandwidth limits  
✅ **Global CDN** - 275+ data centers worldwide  
✅ **HTTPS by default** - Automatic SSL certificates  
✅ **Instant rollbacks** - Revert to previous deployments  
✅ **Preview deployments** - Test before production  
✅ **Custom domains** - Bring your own domain  
✅ **Analytics** - Built-in traffic analytics  
✅ **Fast builds** - Optimized deployment pipeline  

### Performance

| Metric | Value |
|--------|-------|
| First Byte | ~50ms |
| Global CDN | 275+ locations |
| HTTPS | Automatic |
| Uptime | 99.9%+ |

---

## 🔄 CI/CD Integration

### GitHub Actions (Alternative)

Create `.github/workflows/deploy-cloudflare.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: ["main"]
    paths:
      - 'index.html'
      - 'logo.svg'
      - 'docs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy . --project-name=opengrammar-docs
```

### Environment Variables for GitHub Actions

Add to repository secrets:
```bash
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

---

## 🛡️ Security

### Access Control

Configure in Dashboard → Pages → Your Project → Settings → Access:

- **Authentication** - Require login to view
- **Allowlist** - Restrict by email domain
- **Geo-blocking** - Block specific countries

### Security Headers

Add `_headers` file in root:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; img-src 'self' data: https:;
```

---

## 📈 Analytics

### Built-in Analytics

Access in Dashboard → Pages → Your Project → Analytics:

- **Requests** - Total page views
- **Bandwidth** - Data transferred
- **Visitors** - Unique visitors
- **Top pages** - Most visited URLs
- **Referrers** - Traffic sources
- **Countries** - Geographic distribution

### Google Analytics Integration

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔍 Troubleshooting

### Deployment Fails

**Check:**
1. Repository is public or Cloudflare has access
2. Branch name is correct
3. Files exist in root directory
4. No syntax errors in configuration files

**Commands:**
```bash
# Test deployment locally
wrangler pages deploy . --project-name=opengrammar-docs --dry-run

# View deployment logs
wrangler pages deployment list --project-name=opengrammar-docs
```

### 404 Errors

**Solutions:**
1. Ensure `index.html` is in root directory
2. Check `_routes.json` configuration
3. Verify build output directory setting

### Custom Domain Issues

**Check:**
1. DNS propagation (can take 24-48 hours)
2. SSL certificate status
3. Domain verification in Cloudflare

---

## 💰 Pricing

### Free Plan (Included)

✅ **Unlimited sites** - Deploy as many as you want  
✅ **Unlimited requests** - No bandwidth limits  
✅ **Unlimited bandwidth** - No hidden fees  
✅ **1 build minute** - Per deployment  
✅ **500 builds/month** - More than enough for docs  

### Paid Plans

**Bundles** ($5/month per 100k requests):
- Additional build minutes
- Priority support
- Advanced analytics

---

## 📚 Related Documentation

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Pages Functions](https://developers.cloudflare.com/pages/functions/)

---

## 🎯 Next Steps

1. **Deploy to Cloudflare Pages**
   ```bash
   wrangler pages deploy . --project-name=opengrammar-docs
   ```

2. **Add Custom Domain** (optional)
   - Configure in Cloudflare Dashboard

3. **Enable Analytics**
   - View traffic in Dashboard

4. **Share URL**
   - `https://opengrammar-docs.pages.dev`

---

**Your documentation is now hosted on Cloudflare's global CDN! 🚀**
