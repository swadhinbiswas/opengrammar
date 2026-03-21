# OpenGrammar Architecture

This document describes the architecture of OpenGrammar, including its components, data flow, and design decisions.

## System Overview

OpenGrammar consists of two main components:

1. **Browser Extension** - Client-side extension that runs in the user's browser
2. **Backend API** - Serverless API for AI-powered text analysis

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              OpenGrammar Extension                    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │  │
│  │  │   Content   │  │   Popup     │  │   Options    │  │  │
│  │  │   Script    │  │    UI       │  │     Page     │  │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘  │  │
│  │         │                │                │          │  │
│  │         └────────────────┼────────────────┘          │  │
│  │                          │                            │  │
│  │                  ┌───────▼────────┐                  │  │
│  │                  │  Background    │                  │  │
│  │                  │    Script      │                  │  │
│  │                  └───────┬────────┘                  │  │
│  └──────────────────────────┼───────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Optional)                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Cloudflare Workers / Edge              │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │    │
│  │  │   Route     │  │   Rule      │  │    LLM     │  │    │
│  │  │   Handler   │  │  Analyzer   │  │  Analyzer  │  │    │
│  │  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘  │    │
│  │         │                │                │         │    │
│  │         └────────────────┼────────────────┘         │    │
│  │                          │                          │    │
│  │                  ┌───────▼────────┐                 │    │
│  │                  │   External     │                 │    │
│  │                  │   LLM APIs     │                 │    │
│  │                  └────────────────┘                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Browser Extension

#### Directory Structure

```
opengrammar/extension/
├── src/
│   ├── background/      # Service worker for extension lifecycle
│   ├── content/         # Content scripts for page interaction
│   ├── popup/           # Popup UI component
│   ├── options/         # Settings page
│   ├── rewrite/         # Text rewriting functionality
│   ├── stats/           # Writing statistics dashboard
│   ├── prompts/         # AI prompt templates
│   └── types.ts         # Shared TypeScript types
├── public/              # Static assets
├── manifest.json        # Extension manifest (MV3)
└── vite.config.ts       # Vite build configuration
```

#### Components

**Content Script (`content/`)**
- Detects text inputs and contenteditable elements
- Creates highlight overlays for grammar issues
- Handles user interactions (clicks, hovers)
- Communicates with background script via messaging

**Background Script (`background/`)**
- Manages extension lifecycle
- Handles API communication
- Stores user preferences and API keys
- Coordinates between content scripts and popup

**Popup UI (`popup/`)**
- Quick access to settings
- Shows writing statistics
- API key configuration
- Enable/disable features

**Options Page (`options/`)**
- Full settings interface
- Provider configuration
- Custom dictionary management
- Ignored issues management

**Rewrite Module (`rewrite/`)**
- Tone transformation UI
- Context menu integration
- Quick rewrite shortcuts

**Stats Module (`stats/`)**
- Writing analytics dashboard
- Readability scores
- Vocabulary diversity metrics

### Backend API

#### Directory Structure

```
opengrammar/backend/
├── src/
│   ├── index.ts         # Main entry point and routes
│   ├── analyzer.ts      # LLM-based analyzer
│   ├── analyzer-simple.ts  # Rule-based analyzer
│   └── shared-types.ts  # Shared TypeScript types
├── server-bun.ts        # Bun.js server entry
├── server-node.ts       # Node.js server entry
├── server.ts            # Hono app definition
└── wrangler.toml        # Cloudflare Workers config
```

#### Components

**Route Handlers (`index.ts`)**
- `/health` - Health check endpoint
- `/providers` - List available LLM providers
- `/models` - Get models for a provider
- `/analyze` - Main text analysis endpoint
- `/autocomplete` - Text completion suggestions
- `/rewrite` - Tone transformation endpoint

**Rule-Based Analyzer (`analyzer-simple.ts`)**
- Regex-based grammar rules
- Spelling mistake detection
- Passive voice detection
- Repetition detection
- Long sentence detection
- Common misspellings
- Weak word suggestions
- Redundant phrase detection

**LLM Analyzer (`analyzer.ts`)**
- AI-powered grammar checking
- Context-aware suggestions
- Style and tone analysis
- Clarity improvements

## Data Flow

### Text Analysis Flow

```
1. User types in text input
         │
         ▼
2. Content script detects input
         │
         ▼
3. Debounce timer (300ms)
         │
         ▼
4. Send text to background script
         │
         ▼
5. Background script calls API
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
6. Rule-based analysis   7. LLM analysis (if API key)
         │                 │
         └────────┬────────┘
                  │
                  ▼
8. Merge and deduplicate results
         │
         ▼
9. Return issues to content script
         │
         ▼
10. Render highlights in editor
```

### Rewrite Flow

```
1. User selects text
         │
         ▼
2. Right-click context menu
         │
         ▼
3. Choose tone option
         │
         ▼
4. Send to background script
         │
         ▼
5. Call /rewrite endpoint
         │
         ▼
6. LLM processes request
         │
         ▼
7. Return rewritten text
         │
         ▼
8. Replace selected text
```

## Technology Stack

### Extension

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe JavaScript |
| React 18 | UI components |
| Vite | Build tool and dev server |
| Manifest V3 | Chrome extension API |
| Lucide React | Icon library |

### Backend

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe JavaScript |
| Hono | Web framework |
| Bun/Node.js | Runtime |
| Cloudflare Workers | Serverless deployment |
| OpenAI SDK | LLM integration |

## Design Decisions

### Dual-Engine Architecture

**Decision:** Use both rule-based and LLM-based analysis

**Rationale:**
- Rule-based: Fast, free, works offline, deterministic
- LLM-based: Context-aware, handles complex cases, nuanced suggestions
- Combined: Best of both worlds

### Serverless Backend

**Decision:** Deploy backend as serverless functions

**Rationale:**
- Zero infrastructure management
- Automatic scaling
- Pay-per-use pricing
- Global edge deployment
- Easy to self-host

### Privacy-First Design

**Decision:** No data storage, stateless processing

**Rationale:**
- User trust
- Regulatory compliance
- Reduced liability
- Competitive advantage

**Implementation:**
- API keys stored locally in browser
- No user accounts or databases
- Text processed and immediately discarded
- No logging of request content

### Provider Agnostic

**Decision:** Support multiple LLM providers

**Rationale:**
- User choice and flexibility
- Price competition
- Avoid vendor lock-in
- Fallback options

## Security Considerations

### API Key Handling

- Keys stored in Chrome storage (encrypted by browser)
- Keys sent directly to LLM providers
- Never logged or stored on backend
- User can rotate keys anytime

### Data Transmission

- All API calls use HTTPS
- Keys transmitted in request body (not headers)
- No sensitive data in URLs
- CORS properly configured

### Extension Permissions

- Minimal permissions requested
- `activeTab`: Only access current tab
- `storage`: Local settings storage
- `contextMenus`: Rewrite feature
- `scripting`: Inject content scripts

## Performance Optimizations

### Debouncing

- Text analysis triggered after 300ms of inactivity
- Prevents excessive API calls while typing

### Caching

- Results cached per text segment
- Cache invalidated on text change
- Reduces redundant API calls

### Lazy Loading

- Modules loaded on demand
- Reduces initial bundle size
- Faster extension startup

### Highlight Rendering

- Virtual scrolling for long texts
- Only visible highlights rendered
- Efficient DOM updates

## Scalability

### Backend Scaling

- Cloudflare Workers auto-scale
- No cold starts with proper configuration
- Global edge locations
- Handles 100k+ requests/day free tier

### Extension Scaling

- Runs entirely on client
- No server bottleneck
- Performance depends on user's device
- Works offline for rule-based analysis

## Monitoring

### Metrics to Track

- Analysis requests per day
- Average processing time
- Error rates by provider
- Feature adoption rates

### Logging

- Request/response times
- Error messages (no content)
- Provider availability
- Rate limit status

## Future Architecture Considerations

### Potential Improvements

1. **WebAssembly Analyzer**: Port rule engine to WASM for better performance
2. **Local LLM**: Integrate WebLLM for fully offline AI analysis
3. **Collaborative Features**: Real-time collaborative editing
4. **Browser Sync**: Sync settings across devices
5. **Custom Rules Engine**: User-defined grammar rules

### Migration Paths

- Rule engine can be extracted to shared package
- Backend can be deployed to any edge platform
- Extension can be adapted for Firefox/Safari
- API can support additional clients (mobile, desktop)

---

For implementation details, see the source code in `opengrammar/extension/` and `opengrammar/backend/`.
