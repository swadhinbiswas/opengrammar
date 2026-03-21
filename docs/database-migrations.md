# Database Migrations

OpenGrammar uses a schema-free approach with browser storage for user data. This document tracks data structure changes.

## Storage Locations

### Browser Storage (Extension)

| Key | Type | Purpose |
|-----|------|---------|
| `opengrammar_api_key` | string | User's LLM API key |
| `opengrammar_provider` | string | Selected LLM provider |
| `opengrammar_model` | string | Selected model |
| `opengrammar_settings` | object | User preferences |
| `opengrammar_dictionary` | array | Custom dictionary words |
| `opengrammar_ignored` | array | Ignored issues |
| `opengrammar_analytics` | object | Usage statistics |

## Data Structure Versions

### Version 1.0.0 (Current)

```typescript
interface UserSettings {
  provider: LLMProvider;
  model: string;
  apiKey?: string;
  customBaseUrl?: string;
  enabledFeatures: {
    grammar: boolean;
    spelling: boolean;
    clarity: boolean;
    style: boolean;
    autocomplete: boolean;
    rewrite: boolean;
  };
  sensitivity: 'low' | 'medium' | 'high';
  darkMode: boolean;
  language: string;
}

interface IgnoredIssue {
  id: string;
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
  original: string;
  suggestion: string;
  ignoredAt: number;
}

interface CustomDictionary {
  words: string[];
  addedAt: number;
}

interface AnalyticsData {
  analysesCount: number;
  issuesFound: number;
  suggestionsAccepted: number;
  lastUsed: number;
}
```

## Migration Scripts

### Future Migrations

When data structures change, migration scripts will be needed:

```typescript
// Example migration script
async function migrateToV2() {
  const oldSettings = await chrome.storage.local.get('opengrammar_settings');
  
  // Transform old structure to new
  const newSettings = {
    ...oldSettings,
    enabledFeatures: {
      grammar: oldSettings.enableGrammar ?? true,
      spelling: oldSettings.enableSpelling ?? true,
      // ...
    },
  };
  
  await chrome.storage.local.set({ opengrammar_settings: newSettings });
  await chrome.storage.local.set({ dataVersion: 2 });
}
```

## Backup and Restore

### Export Data

```javascript
async function exportData() {
  const data = await chrome.storage.local.get(null);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `opengrammar-backup-${new Date().toISOString()}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}
```

### Import Data

```javascript
async function importData(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  await chrome.storage.local.set(data);
}
```

## Data Retention

| Data Type | Retention | Sync |
|-----------|-----------|------|
| API Key | Until cleared | No |
| Settings | Until cleared | Optional |
| Dictionary | Until cleared | Optional |
| Ignored Issues | 90 days | No |
| Analytics | 30 days | No |

## Privacy Considerations

- No personal data stored on servers
- All data stored locally in browser
- User can clear data anytime
- No tracking or analytics by default
- API keys encrypted by browser

## Sync Strategy

Future versions may support Chrome Sync:

```typescript
// Planned sync implementation
const syncKeys = ['opengrammar_settings', 'opengrammar_dictionary'];

for (const key of syncKeys) {
  const data = await chrome.storage.local.get(key);
  await chrome.storage.sync.set(data);
}
```

---

Last updated: March 2024
