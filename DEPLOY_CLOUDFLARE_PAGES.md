# 🚀 Cloudflare Pages Quick Deploy

Deploy OpenGrammar documentation to Cloudflare Pages in 5 minutes!

---

## ⚡ One-Command Deploy

```bash
./deploy-cloudflare.sh
```

That's it! Your site will be live at: `https://opengrammar-docs.pages.dev`

---

## 📋 Manual Deploy (Step-by-Step)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser for authentication.

### Step 3: Deploy

```bash
wrangler pages deploy . --project-name=opengrammar-docs
```

### Step 4: Access Your Site

```
https://opengrammar-docs.pages.dev
```

---

## 🔄 Automatic Deploy (GitHub Actions)

### Setup

1. **Get Cloudflare API Token**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Create new token with **Pages: Edit** permission
   - Copy the token

2. **Get Account ID**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Copy your Account ID from the right sidebar

3. **Add GitHub Secrets**
   ```
   Settings → Secrets and variables → Actions
   
   Add these secrets:
   - CLOUDFLARE_API_TOKEN: (your token from step 1)
   - CLOUDFLARE_ACCOUNT_ID: (your account ID from step 2)
   ```

4. **Push to Main**
   - Every push to `main` will auto-deploy
   - Preview deployments for other branches

---

## 🎯 Deployment Options Comparison

| Method | Best For | Speed | Setup Time |
|--------|----------|-------|------------|
| **One-Command** | Quick deploy | ⚡⚡⚡ | 1 minute |
| **Manual** | First time | ⚡⚡⚡ | 5 minutes |
| **Auto (GitHub)** | Production | ⚡⚡ | 10 minutes |

---

## 🌐 Custom Domain (Optional)

### In Cloudflare Dashboard

1. Go to **Workers & Pages** → Your Project
2. Click **Custom domains**
3. Enter your domain: `docs.opengrammar.dev`
4. Click **Add domain**

### DNS Configuration

Cloudflare auto-configures DNS, or manually add:

```
Type: CNAME
Name: docs
Target: opengrammar-docs.pages.dev
Proxy: Enabled (orange cloud)
```

---

## 📊 What You Get Free

✅ **Unlimited bandwidth** - No limits  
✅ **Global CDN** - 275+ data centers  
✅ **HTTPS** - Automatic SSL  
✅ **Preview deployments** - Test before production  
✅ **Instant rollbacks** - Revert anytime  
✅ **Custom domains** - Bring your own  
✅ **Analytics** - Built-in tracking  

---

## 🔍 Troubleshooting

### Deployment Fails

**Check:**
```bash
# Verify Wrangler is installed
wrangler --version

# Check login status
wrangler whoami

# Test deployment
wrangler pages deploy . --project-name=opengrammar-docs --dry-run
```

### 404 Errors

**Ensure:**
- `index.html` exists in root directory
- Files are committed to git
- Build output directory is set to `.`

### Slow Deployment

**Normal deployment time:** 1-3 minutes

If slower:
- Check internet connection
- Verify Cloudflare status: [status.cloudflare.com](https://www.cloudflarestatus.com/)

---

## 📈 Monitor Deployment

### View Deployment Status

```bash
# List deployments
wrangler pages deployment list --project-name=opengrammar-docs

# View project info
wrangler pages project view --project-name=opengrammar-docs
```

### Access Analytics

1. Go to Cloudflare Dashboard
2. Workers & Pages → Your Project
3. Click **Analytics** tab

---

## 💡 Pro Tips

### 1. Preview Deployments

```bash
# Deploy to preview branch
wrangler pages deploy . --project-name=opengrammar-docs --branch=feature/test

# Access at:
# https://feature-test.opengrammar-docs.pages.dev
```

### 2. Rollback

```bash
# List deployment IDs
wrangler pages deployment list --project-name=opengrammar-docs

# Rollback to specific deployment
wrangler pages deployment rollback --project-name=opengrammar-docs --deployment-id=<ID>
```

### 3. Environment Variables

```bash
# Add environment variable
wrangler pages secret put MY_SECRET --project-name=opengrammar-docs

# List secrets
wrangler pages secret list --project-name=opengrammar-docs
```

---

## 🎯 Next Steps

1. ✅ Deploy to Cloudflare Pages
2. ✅ Add custom domain (optional)
3. ✅ Enable analytics
4. ✅ Share your URL!

---

## 📞 Support

- **Cloudflare Pages Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **Wrangler CLI Docs**: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Community**: [community.cloudflare.com](https://community.cloudflare.com/)

---

**Ready to deploy? Run:** `./deploy-cloudflare.sh` 🚀
