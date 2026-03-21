# Troubleshooting Guide

Common issues and solutions for OpenGrammar.

## Extension Issues

### Extension Not Loading

**Problem**: "Load unpacked" fails or extension doesn't appear

**Solutions**:
1. Ensure you're loading the `dist` folder, not `src`
2. Check Chrome version (requires 88+)
3. Verify manifest.json is valid JSON
4. Try rebuilding: `npm run build`

```bash
cd opengrammar/extension
npm run build
# Then load the dist folder
```

### No Grammar Highlights

**Problem**: Text is not being analyzed or highlighted

**Solutions**:
1. Check if extension is enabled in `chrome://extensions/`
2. Refresh the page after enabling extension
3. Check browser console for errors (F12 → Console)
4. Verify backend URL is correct in settings
5. Try disabling and re-enabling the extension

### API Key Not Working

**Problem**: "Invalid API key" error

**Solutions**:
1. Verify API key is correct (no extra spaces)
2. Check API key has sufficient credits
3. Ensure provider is selected correctly
4. Test API key directly with provider
5. Check network tab for API errors

```bash
# Test OpenAI key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Slow Performance

**Problem**: Extension slows down browser

**Solutions**:
1. Disable AI analysis for large texts
2. Reduce analysis frequency in settings
3. Clear browser cache
4. Disable other extensions temporarily
5. Check memory usage in Chrome Task Manager

## Backend Issues

### Deployment Fails

**Problem**: Backend deployment fails

**Solutions**:

**Cloudflare Workers**:
```bash
# Check Wrangler version
npx wrangler --version

# Login to Cloudflare
npx wrangler login

# Try deploying again
npx wrangler deploy
```

**Vercel**:
```bash
# Check Vercel login
vercel whoami

# Link project
vercel link

# Deploy
vercel --prod
```

### API Returns 500 Error

**Problem**: Backend returns internal server error

**Solutions**:
1. Check backend logs for error details
2. Verify environment variables are set
3. Ensure API keys are valid
4. Check rate limits with provider
5. Restart deployment

### CORS Errors

**Problem**: "CORS policy" error in browser console

**Solutions**:
1. Verify backend URL is correct
2. Check ALLOWED_ORIGINS in backend config
3. Ensure HTTPS is used (not HTTP)
4. Clear browser cache

## Analysis Issues

### False Positives

**Problem**: Correct text flagged as error

**Solutions**:
1. Add word to custom dictionary
2. Ignore the specific issue
3. Adjust sensitivity settings
4. Report false positive on GitHub

### Missing Errors

**Problem**: Errors not being detected

**Solutions**:
1. Ensure AI analysis is enabled
2. Check API key has credits
3. Verify text length is under limit
4. Try different LLM provider
5. Update to latest version

### Inconsistent Results

**Problem**: Same text gets different results

**Solutions**:
1. AI models may vary - this is expected
2. Use rule-based mode for consistency
3. Cache results for repeated text
4. Check provider status

## Build Issues

### npm install Fails

**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or try pnpm
pnpm install
```

### TypeScript Errors

**Problem**: Type errors during build

**Solutions**:
```bash
# Check TypeScript version
npx tsc --version

# Run type check
npx tsc --noEmit

# Fix reported errors
# Or update type definitions
npm install --save-dev @types/node
```

### Vite Build Fails

**Problem**: Build process fails

**Solutions**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build

# Check Node version (requires 18+)
node --version
```

## Network Issues

### Request Timeout

**Problem**: API requests timeout

**Solutions**:
1. Check internet connection
2. Verify backend is running
3. Increase timeout in settings
4. Try different network
5. Check firewall settings

### Rate Limit Exceeded

**Problem**: "Too many requests" error

**Solutions**:
1. Wait and retry (usually 1 minute)
2. Reduce analysis frequency
3. Upgrade API plan
4. Use different provider
5. Enable caching

## Specific Error Messages

### "Manifest fetch failed"

**Solution**: Extension not properly loaded
```bash
# Rebuild extension
cd opengrammar/extension
npm run build

# Reload in chrome://extensions/
```

### "Cannot read property of undefined"

**Solution**: JavaScript error, check console
1. Open DevTools (F12)
2. Check Console tab
3. Report error on GitHub with stack trace

### "Failed to fetch"

**Solution**: Backend unreachable
1. Verify backend URL
2. Check backend is deployed
3. Test health endpoint manually
4. Check network tab

## Getting Help

### Before Asking for Help

1. Search existing GitHub Issues
2. Check this troubleshooting guide
3. Review error messages carefully
4. Try suggested solutions

### When Reporting Issues

Include:
- OpenGrammar version
- Browser name and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console error messages
- Network tab errors

### Contact Channels

- **GitHub Issues**: Bug reports
- **GitHub Discussions**: Questions
- **Email**: swadhinbiswas.cse@gmail.com

## Debug Mode

Enable debug logging:

1. Open extension popup
2. Go to Settings
3. Enable "Debug mode"
4. Check browser console for detailed logs

### Collecting Debug Info

```javascript
// In browser console
console.log('OpenGrammar Debug Info:', {
  version: chrome.runtime.getManifest().version,
  url: window.location.href,
  userAgent: navigator.userAgent,
});
```

## Common Scenarios

### Scenario: Works on some sites, not others

**Cause**: Some sites have strict Content Security Policy

**Solution**:
1. Check CSP in browser console
2. Report site on GitHub
3. Use popup interface instead

### Scenario: Works locally, not after deploy

**Cause**: Environment configuration issue

**Solution**:
1. Verify environment variables
2. Check deployment logs
3. Test health endpoint
4. Compare local vs deployed config

### Scenario: Was working, now broken

**Cause**: Recent update or external change

**Solution**:
1. Check recent changes
2. Review CHANGELOG.md
3. Try previous version
4. Check provider status pages

---

Still having issues? Open a [GitHub Issue](https://github.com/swadhinbiswas/opengrammar/issues).
