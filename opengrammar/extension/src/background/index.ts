import type {
  AnalyzeRequest,
  AnalyzeResponse,
  AnalyticsEventType,
  AnalyticsSummary,
  AutocompleteRequest,
  AutocompleteResponse,
  AnalysisContext,
  EditorContext,
  LLMProvider,
  RewriteContext,
  RewriteRequest,
  RewriteResponse,
} from '../types';

// Default backend URL
const DEFAULT_BACKEND_URL = 'http://localhost:8787';
const REWRITE_PAGE_PATH = 'src/rewrite/index.html';
const STATS_PAGE_PATH = 'src/stats/index.html';
const DEFAULT_PROVIDER = 'openai';
const DEFAULT_MODEL = 'gpt-4o-mini';
const DEFAULT_ANALYTICS: AnalyticsSummary = {
  totals: {
    analysis_runs: 0,
    issues_found: 0,
    suggestions_applied: 0,
    suggestions_ignored: 0,
    autocomplete_shown: 0,
    autocomplete_accepted: 0,
    rewrite_opened: 0,
    rewrite_applied: 0,
  },
  domains: {},
  providers: {},
};

// Initialize context menus
chrome.runtime.onInstalled.addListener(() => {
  void initializeStoredDefaults();
  chrome.contextMenus.create({
    id: 'opengrammar-rewrite',
    title: 'Rewrite with OpenGrammar',
    contexts: ['selection'],
  });
});

void initializeStoredDefaults();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHECK_GRAMMAR') {
    handleGrammarCheck(request.text, request.context, sendResponse);
    return true;
  }
  
  if (request.type === 'REWRITE_TEXT') {
    handleRewrite(request.text, request.tone, sendResponse);
    return true;
  }
  
  if (request.type === 'GET_SELECTION') {
    // Get selected text from the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTED_TEXT' }, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ text: '' });
      }
    });
    return true;
  }

  if (request.type === 'SYNC_ACTIVE_CONTEXT') {
    const tabId = sender.tab?.id;
    if (!tabId || typeof request.text !== 'string') {
      sendResponse({ success: false });
      return false;
    }

    void storeActiveContext(tabId, request.text, request.issues || []).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.type === 'GET_ACTIVE_TEXT') {
    void getActiveEditorContext().then((context) => {
      sendResponse(context || { text: '', issues: [] });
    });
    return true;
  }

  if (request.type === 'AUTOCOMPLETE_TEXT') {
    void handleAutocomplete(request, sendResponse);
    return true;
  }

  if (request.type === 'OPEN_REWRITE_PAGE') {
    void openRewritePage().then(() => sendResponse({ success: true }));
    return true;
  }

  if (request.type === 'GET_REWRITE_CONTEXT') {
    void getRewriteContext().then((context) => {
      sendResponse(context || { selectedText: '' });
    });
    return true;
  }

  if (request.type === 'APPLY_REWRITE_TO_SOURCE') {
    void applyRewriteToSource(request.original, request.rewritten).then((result) => {
      sendResponse(result);
    });
    return true;
  }

  if (request.type === 'OPEN_STATS_PAGE') {
    void openStatsPage().then(() => sendResponse({ success: true }));
    return true;
  }

  if (request.type === 'TRACK_ANALYTICS_EVENT') {
    void trackAnalyticsEvent(request.eventType, request.payload).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.type === 'GET_ANALYTICS_SUMMARY') {
    void getAnalyticsSummary().then((summary) => sendResponse(summary));
    return true;
  }

  if (request.type === 'CLEAR_ANALYTICS') {
    void chrome.storage.sync.set({ analyticsSummary: DEFAULT_ANALYTICS }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.type === 'GET_PROVIDERS') {
    getProviders().then(providers => sendResponse({ providers }));
    return true;
  }
  
  if (request.type === 'GET_MODELS') {
    getModels(request.provider, request.apiKey, request.baseUrl).then(models => sendResponse({ models }));
    return true;
  }
  
  if (request.type === 'GET_BACKEND_URL') {
    getBackendUrl().then(url => sendResponse({ url }));
    return true;
  }
  
  if (request.type === 'SET_BACKEND_URL') {
    chrome.storage.sync.set({ backendUrl: request.url }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'opengrammar-rewrite' && info.selectionText) {
    void storeRewriteContext(tab?.id, info.selectionText).then(() => {
      chrome.tabs.create({ url: chrome.runtime.getURL(REWRITE_PAGE_PATH) });
    });
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'rewrite-text') {
    void openRewritePage();
    return;
  }

  if (command === 'open-stats') {
    void openStatsPage();
  }
});

async function handleGrammarCheck(
  text: string,
  context: AnalysisContext | undefined,
  sendResponse: (response: any) => void,
) {
  try {
    const { 
      apiKey, 
      model, 
      enabled,
      ignoredIssues,
      dictionary,
      backendUrl,
      provider,
      customBaseUrl
    } = await chrome.storage.sync.get([
      'apiKey', 
      'model', 
      'enabled',
      'ignoredIssues',
      'dictionary',
      'backendUrl',
      'provider',
      'customBaseUrl'
    ]);

    if (enabled === false) {
      sendResponse({ 
        issues: [], 
        metadata: { textLength: text.length, issuesCount: 0, processingTimeMs: 0 } 
      });
      return;
    }

    const baseUrl = backendUrl || DEFAULT_BACKEND_URL;

    const requestBody: AnalyzeRequest = {
      text,
      apiKey,
      model,
      provider: provider as LLMProvider,
      baseUrl: customBaseUrl,
      ignoredIssues: ignoredIssues || [],
      dictionary: dictionary || [],
      context,
    };

    const response = await fetch(`${baseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Backend error: ${errorData.error || response.statusText}`);
    }

    const data: AnalyzeResponse = await response.json();
    
    // Filter out ignored issues
    const normalizedIgnored = normalizeIgnoredIssues(ignoredIssues);

    if (data.issues && normalizedIgnored.length > 0) {
      data.issues = data.issues.filter(issue => {
        const issueId = issue.id || `${issue.type}-${issue.offset}-${issue.original}`;
        return !normalizedIgnored.includes(issueId);
      });
    }

    // Filter out dictionary words
    if (data.issues && dictionary && dictionary.length > 0) {
      data.issues = data.issues.filter(issue => {
        if (issue.type !== 'spelling') return true;
        const word = issue.original.toLowerCase().trim();
        return !dictionary.includes(word);
      });
    }

    await trackAnalyticsEvent('analysis_runs', {
      count: 1,
      domain: context?.domain,
      provider: provider || 'rule-only',
    });

    if (data.issues.length > 0) {
      await trackAnalyticsEvent('issues_found', {
        count: data.issues.length,
        domain: context?.domain,
        provider: provider || 'rule-only',
      });
    }
    
    sendResponse(data);
  } catch (error) {
    console.error('Grammar check failed:', error);
    sendResponse({ 
      error: 'Failed to check grammar',
      message: error instanceof Error ? error.message : 'Unknown error',
      issues: []
    });
  }
}

async function handleAutocomplete(
  request: AutocompleteRequest & { type: string },
  sendResponse: (response: AutocompleteResponse) => void,
) {
  try {
    const {
      apiKey,
      model,
      backendUrl,
      provider,
      customBaseUrl,
      autocompleteEnabled,
    } = await chrome.storage.sync.get([
      'apiKey',
      'model',
      'backendUrl',
      'provider',
      'customBaseUrl',
      'autocompleteEnabled',
    ]);

    if (autocompleteEnabled === false) {
      sendResponse({ suggestion: '', confidence: 0, replaceStart: request.cursor, replaceEnd: request.cursor, source: 'heuristic' });
      return;
    }

    const baseUrl = backendUrl || DEFAULT_BACKEND_URL;
    const requestBody: AutocompleteRequest = {
      text: request.text,
      cursor: request.cursor,
      apiKey,
      model,
      provider: (provider || 'openai') as LLMProvider,
      baseUrl: customBaseUrl,
      context: request.context,
    };

    const response = await fetch(`${baseUrl}/autocomplete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data: AutocompleteResponse = await response.json();

    if (data.suggestion) {
      await trackAnalyticsEvent('autocomplete_shown', {
        count: 1,
        domain: request.context?.domain,
        provider: provider || 'heuristic',
      });
    }

    sendResponse(data);
  } catch (error) {
    sendResponse({
      suggestion: '',
      confidence: 0,
      replaceStart: request.cursor,
      replaceEnd: request.cursor,
      source: 'heuristic',
      error: error instanceof Error ? error.message : 'Autocomplete failed',
    });
  }
}

async function handleRewrite(
  text: string, 
  tone: string, 
  sendResponse: (response: any) => void
) {
  try {
    const { 
      apiKey, 
      model,
      backendUrl,
      provider,
      customBaseUrl
    } = await chrome.storage.sync.get([
      'apiKey', 
      'model',
      'backendUrl',
      'provider',
      'customBaseUrl'
    ]);

    const baseUrl = backendUrl || DEFAULT_BACKEND_URL;

    const requestBody: RewriteRequest = {
      text,
      tone: tone as any,
      apiKey,
      model,
      provider: provider as LLMProvider,
      baseUrl: customBaseUrl,
    };

    const response = await fetch(`${baseUrl}/rewrite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Backend error: ${errorData.error || response.statusText}`);
    }

    const data: RewriteResponse = await response.json();
    sendResponse(data);
  } catch (error) {
    console.error('Rewrite failed:', error);
    sendResponse({ 
      error: 'Failed to rewrite text',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function getProviders() {
  try {
    const backendUrl = await getBackendUrl();
    const response = await fetch(`${backendUrl}/providers`);
    if (!response.ok) throw new Error('Failed to fetch providers');
    const data = await response.json();
    return data.providers || [];
  } catch (error) {
    console.error('Failed to fetch providers:', error);
    return [];
  }
}

async function getModels(provider: string, apiKey?: string, baseUrl?: string) {
  try {
    const backendUrl = await getBackendUrl();
    const response = await fetch(`${backendUrl}/models`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, apiKey, baseUrl }),
    });
    if (!response.ok) throw new Error('Failed to fetch models');
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error('Failed to fetch models:', error);
    return [];
  }
}

async function getBackendUrl(): Promise<string> {
  const result = await chrome.storage.sync.get('backendUrl');
  return result.backendUrl || DEFAULT_BACKEND_URL;
}

async function initializeStoredDefaults(): Promise<void> {
  const existing = await chrome.storage.sync.get([
    'enabled',
    'provider',
    'model',
    'backendUrl',
    'backendAutoDetected',
  ]);

  await chrome.storage.sync.set({
    enabled: existing.enabled !== false,
    provider: existing.provider || DEFAULT_PROVIDER,
    model: existing.model || DEFAULT_MODEL,
    backendUrl: existing.backendUrl || DEFAULT_BACKEND_URL,
    backendAutoDetected: existing.backendAutoDetected !== false,
  });
}

function normalizeIgnoredIssues(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === 'string') {
        return entry;
      }

      if (entry && typeof entry === 'object' && 'id' in entry && typeof entry.id === 'string') {
        return entry.id;
      }

      return null;
    })
    .filter((entry): entry is string => Boolean(entry));
}

async function getActiveTab(): Promise<chrome.tabs.Tab | undefined> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

async function requestSelectedText(tabId: number): Promise<string> {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { type: 'GET_SELECTED_TEXT' });
    return response?.text || '';
  } catch {
    return '';
  }
}

async function storeRewriteContext(sourceTabId?: number, selectedText: string = ''): Promise<void> {
  const payload: RewriteContext = {
    selectedText,
    sourceTabId,
    capturedAt: Date.now(),
  };

  await chrome.storage.local.set({ rewriteContext: payload });
}

async function getRewriteContext(): Promise<RewriteContext | null> {
  const result = await chrome.storage.local.get('rewriteContext');
  return (result.rewriteContext as RewriteContext | undefined) || null;
}

async function openRewritePage(): Promise<void> {
  const activeTab = await getActiveTab();
  const selectedText = activeTab?.id ? await requestSelectedText(activeTab.id) : '';
  await storeRewriteContext(activeTab?.id, selectedText);
  await trackAnalyticsEvent('rewrite_opened', {
    count: 1,
    domain: getDomainFromUrl(activeTab?.url),
  });
  await chrome.tabs.create({ url: chrome.runtime.getURL(REWRITE_PAGE_PATH) });
}

async function openStatsPage(): Promise<void> {
  await chrome.tabs.create({ url: chrome.runtime.getURL(STATS_PAGE_PATH) });
}

async function applyRewriteToSource(original: string, rewritten: string): Promise<{ success: boolean; error?: string }> {
  const context = await getRewriteContext();
  if (!context?.sourceTabId) {
    return { success: false, error: 'No source tab available for rewrite.' };
  }

  try {
    const response = await chrome.tabs.sendMessage(context.sourceTabId, {
      type: 'APPLY_REWRITE',
      original,
      rewritten,
    });

    return response?.success
      ? await trackRewriteApplyAndReturn(context.sourceTabId)
      : { success: false, error: response?.error || 'Failed to apply rewrite.' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to contact source tab.',
    };
  }
}

async function trackRewriteApplyAndReturn(sourceTabId?: number) {
  let domain: string | undefined;
  if (sourceTabId) {
    const tab = await chrome.tabs.get(sourceTabId).catch(() => undefined);
    domain = getDomainFromUrl(tab?.url);
  }
  await trackAnalyticsEvent('rewrite_applied', { count: 1, domain });
  return { success: true };
}

async function storeActiveContext(sourceTabId: number, text: string, issues: AnalyzeResponse['issues'] = []): Promise<void> {
  const payload: EditorContext = {
    text,
    issues,
    sourceTabId,
    capturedAt: Date.now(),
  };

  await chrome.storage.local.set({ lastEditorContext: payload });
}

async function getActiveEditorContext(): Promise<EditorContext | null> {
  const result = await chrome.storage.local.get('lastEditorContext');
  return (result.lastEditorContext as EditorContext | undefined) || null;
}

async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const result = await chrome.storage.sync.get('analyticsSummary');
  return {
    ...DEFAULT_ANALYTICS,
    ...(result.analyticsSummary as AnalyticsSummary | undefined),
    totals: {
      ...DEFAULT_ANALYTICS.totals,
      ...((result.analyticsSummary as AnalyticsSummary | undefined)?.totals || {}),
    },
    domains: {
      ...((result.analyticsSummary as AnalyticsSummary | undefined)?.domains || {}),
    },
    providers: {
      ...((result.analyticsSummary as AnalyticsSummary | undefined)?.providers || {}),
    },
  };
}

async function trackAnalyticsEvent(
  eventType: AnalyticsEventType,
  payload?: { count?: number; domain?: string; provider?: string },
): Promise<void> {
  const summary = await getAnalyticsSummary();
  const count = payload?.count || 1;
  summary.totals[eventType] = (summary.totals[eventType] || 0) + count;

  if (payload?.domain) {
    summary.domains[payload.domain] = (summary.domains[payload.domain] || 0) + count;
  }

  if (payload?.provider) {
    summary.providers[payload.provider] = (summary.providers[payload.provider] || 0) + count;
  }

  summary.lastUpdatedAt = Date.now();
  await chrome.storage.sync.set({ analyticsSummary: summary });
}

function getDomainFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

// Health check on extension load
async function checkBackendHealth() {
  try {
    const backendUrl = await getBackendUrl();
    const healthUrl = `${backendUrl}/health`;
    
    const response = await fetch(healthUrl, { method: 'GET' });
    if (response.ok) {
      const health = await response.json();
      console.log('OpenGrammar backend health:', health);
      chrome.storage.sync.set({ backendHealthy: true });
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    console.warn('Backend health check failed:', error);
    chrome.storage.sync.set({ backendHealthy: false });
  }
}

// Run health check on startup
checkBackendHealth();

// Periodic health check every 5 minutes
setInterval(checkBackendHealth, 5 * 60 * 1000);
