import type { AnalyzeRequest, AnalyzeResponse, RewriteRequest, RewriteResponse, LLMProvider } from '../types';

// Default backend URL
const DEFAULT_BACKEND_URL = 'http://localhost:8787';

// Initialize context menus
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'opengrammar-rewrite',
    title: 'Rewrite with OpenGrammar',
    contexts: ['selection'],
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHECK_GRAMMAR') {
    handleGrammarCheck(request.text, sendResponse);
    return true;
  }
  
  if (request.type === 'REWRITE_TEXT') {
    handleRewrite(request.text, request.tone, sendResponse);
    return true;
  }
  
  if (request.type === 'GET_SELECTION') {
    // Get selected text from the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_SELECTED_TEXT' }, (response) => {
        sendResponse(response);
      });
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
    // Open rewrite popup with selected text
    chrome.tabs.sendMessage(tab.id, {
      type: 'OPEN_REWRITE',
      text: info.selectionText,
    });
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'rewrite-text') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'OPEN_REWRITE' });
    });
  }
});

async function handleGrammarCheck(text: string, sendResponse: (response: any) => void) {
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
    if (data.issues && ignoredIssues) {
      data.issues = data.issues.filter(issue => {
        const issueId = issue.id || `${issue.type}-${issue.offset}-${issue.original}`;
        return !ignoredIssues.includes(issueId);
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
