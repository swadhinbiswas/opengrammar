# Extension Development Guide

This guide covers developing the OpenGrammar browser extension.

## Project Structure

```
opengrammar/extension/
├── src/
│   ├── background/      # Service worker
│   ├── content/         # Content scripts
│   ├── popup/           # Popup UI
│   ├── options/         # Options page
│   ├── rewrite/         # Rewrite feature
│   ├── stats/           # Statistics dashboard
│   ├── prompts/         # AI prompts
│   └── types.ts         # TypeScript types
├── public/              # Static assets
├── manifest.json        # Extension manifest
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

## Development Setup

### 1. Install Dependencies

```bash
cd opengrammar/extension
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This starts Vite dev server on port 5173.

### 3. Load Extension

1. Open Chrome: `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist` folder

## Background Script

The background script manages extension lifecycle and API communication.

### Key Responsibilities

- Handle extension installation/update
- Manage API requests to backend
- Store user preferences
- Coordinate between content scripts

### Example: Message Handler

```typescript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE_TEXT') {
    analyzeText(message.text)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Keep channel open for async response
  }
});
```

## Content Script

Content scripts run in the context of web pages.

### Key Responsibilities

- Detect text inputs and contenteditable elements
- Create highlight overlays
- Handle user interactions
- Communicate with background script

### Example: Input Detection

```typescript
function findTextInputs() {
  const inputs = document.querySelectorAll('textarea, input[type="text"]');
  inputs.forEach(input => {
    if (!input.hasAttribute('data-opengrammar')) {
      initializeHighlight(input);
    }
  });
}
```

## Popup UI

The popup provides quick access to settings and statistics.

### Technologies

- React 18
- Lucide React icons
- Tailwind CSS (planned)

### Example Component

```tsx
function Popup() {
  const [stats, setStats] = useState<Stats>(null);
  
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_STATS' }, setStats);
  }, []);
  
  return (
    <div className="popup">
      <h2>OpenGrammar</h2>
      <StatsDisplay stats={stats} />
    </div>
  );
}
```

## Communication Patterns

### Content to Background

```typescript
// Content script
chrome.runtime.sendMessage(
  { type: 'ANALYZE_TEXT', text: 'Hello world' },
  response => console.log(response)
);
```

### Background to Content

```typescript
// Background script
chrome.tabs.sendMessage(tabId, {
  type: 'HIGHLIGHT_ISSUES',
  issues: [...]
});
```

### Popup to Background

```typescript
// Popup component
const result = await chrome.runtime.sendMessage({
  type: 'GET_SETTINGS'
});
```

## Build Process

### Development Build

```bash
npm run dev
```

Watches for changes and rebuilds automatically.

### Production Build

```bash
npm run build
```

Creates optimized build in `dist/` folder.

### Build Configuration

Vite configuration (`vite.config.ts`):

```typescript
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

## Testing

### Unit Tests

```bash
npm test
```

### Manual Testing

1. Load unpacked extension
2. Test on various websites:
   - Gmail
   - Google Docs
   - Notion
   - Reddit
   - Twitter

## Debugging

### Console Logs

- Content script: Page DevTools console
- Background script: Service worker console
- Popup: Popup DevTools

### Inspect Service Worker

1. Go to `chrome://extensions/`
2. Find OpenGrammar
3. Click "Inspect views: service worker"

### Debug Mode

Enable debug logging in settings for verbose output.

## Permissions

### Required Permissions

```json
{
  "permissions": [
    "activeTab",
    "storage",
    "contextMenus"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

### Why These Permissions?

- `activeTab`: Access current tab for analysis
- `storage`: Save user settings
- `contextMenus`: Rewrite feature
- `<all_urls>`: Work on all websites

## Best Practices

### Performance

- Debounce text analysis (300ms)
- Cache analysis results
- Lazy load modules
- Minimize DOM manipulation

### Security

- Validate all inputs
- Sanitize HTML output
- Use HTTPS for API calls
- Never expose API keys

### Code Quality

- Use TypeScript strict mode
- Add JSDoc comments
- Write unit tests
- Follow ESLint rules

## Common Issues

### Content Script Not Loading

**Solution**: Check manifest permissions and matches.

### Message Port Closed

**Solution**: Return `true` from message listener for async responses.

### CORS Errors

**Solution**: Handle in background script, not content script.

## Publishing

### Chrome Web Store

1. Build extension: `npm run build`
2. ZIP the `dist` folder
3. Upload to Chrome Web Store Developer Dashboard
4. Fill out listing information
5. Submit for review

### Required Assets

- Icon (128x128)
- Screenshots (1280x800)
- Promotional images
- Description

## Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Vite Documentation](https://vitejs.dev/)

---

For API details, see [API Documentation](../../docs/api.md).
