import type { AnalyticsSummary, IgnoredIssue } from '../types';

interface Settings {
  enabled: boolean;
  apiKey: string;
  model: string;
  backendUrl: string;
  checkAsYouType: boolean;
  showNotifications: boolean;
  autocompleteEnabled: boolean;
  disabledDomains: string[];
  dictionary: string[];
  ignoredIssues: IgnoredIssue[];
}

// DOM Elements
const elements = {
  enabled: document.getElementById('enabled') as HTMLInputElement,
  checkAsYouType: document.getElementById('checkAsYouType') as HTMLInputElement,
  showNotifications: document.getElementById('showNotifications') as HTMLInputElement,
  autocompleteEnabled: document.getElementById('autocompleteEnabled') as HTMLInputElement,
  apiKey: document.getElementById('apiKey') as HTMLInputElement,
  toggleApiKey: document.getElementById('toggleApiKey') as HTMLButtonElement,
  model: document.getElementById('model') as HTMLSelectElement,
  backendUrl: document.getElementById('backendUrl') as HTMLInputElement,
  backendStatus: document.getElementById('backendStatus') as HTMLElement,
  newDomain: document.getElementById('newDomain') as HTMLInputElement,
  addDomain: document.getElementById('addDomain') as HTMLButtonElement,
  domainList: document.getElementById('domainList') as HTMLElement,
  newWord: document.getElementById('newWord') as HTMLInputElement,
  addWord: document.getElementById('addWord') as HTMLButtonElement,
  dictionaryList: document.getElementById('dictionaryList') as HTMLElement,
  ignoredIssuesList: document.getElementById('ignoredIssuesList') as HTMLElement,
  clearIgnored: document.getElementById('clearIgnored') as HTMLButtonElement,
  exportData: document.getElementById('exportData') as HTMLButtonElement,
  importData: document.getElementById('importData') as HTMLButtonElement,
  importFile: document.getElementById('importFile') as HTMLInputElement,
  resetSettings: document.getElementById('resetSettings') as HTMLButtonElement,
  metricAnalyses: document.getElementById('metricAnalyses') as HTMLElement,
  metricIssues: document.getElementById('metricIssues') as HTMLElement,
  metricApplied: document.getElementById('metricApplied') as HTMLElement,
  metricAutocomplete: document.getElementById('metricAutocomplete') as HTMLElement,
  topDomains: document.getElementById('topDomains') as HTMLElement,
  topProviders: document.getElementById('topProviders') as HTMLElement,
  analyticsUpdated: document.getElementById('analyticsUpdated') as HTMLElement,
  clearAnalytics: document.getElementById('clearAnalytics') as HTMLButtonElement,
  version: document.getElementById('version') as HTMLElement,
};

let settings: Settings = {
  enabled: true,
  apiKey: '',
  model: 'gpt-3.5-turbo',
  backendUrl: '',
  checkAsYouType: true,
  showNotifications: true,
  autocompleteEnabled: true,
  disabledDomains: [],
  dictionary: [],
  ignoredIssues: [],
};

let analyticsSummary: AnalyticsSummary | null = null;

/**
 * Initialize the options page
 */
async function initialize() {
  await loadSettings();
  setupEventListeners();
  renderDomainList();
  renderDictionary();
  renderIgnoredIssues();
  checkBackendHealth();
  await loadAnalytics();
  
  console.log('OpenGrammar options page initialized');
}

/**
 * Load settings from chrome.storage
 */
async function loadSettings() {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.get(
      ['enabled', 'apiKey', 'model', 'backendUrl', 'checkAsYouType', 'showNotifications', 'autocompleteEnabled', 'disabledDomains', 'dictionary', 'ignoredIssues'],
      (result) => {
        settings = {
          enabled: result.enabled !== false,
          apiKey: result.apiKey || '',
          model: result.model || 'gpt-3.5-turbo',
          backendUrl: result.backendUrl || '',
          checkAsYouType: result.checkAsYouType !== false,
          showNotifications: result.showNotifications !== false,
          autocompleteEnabled: result.autocompleteEnabled !== false,
          disabledDomains: result.disabledDomains || [],
          dictionary: result.dictionary || [],
          ignoredIssues: normalizeIgnoredIssues(result.ignoredIssues),
        };
        
        // Update UI
        elements.enabled.checked = settings.enabled;
        elements.checkAsYouType.checked = settings.checkAsYouType;
        elements.showNotifications.checked = settings.showNotifications;
        elements.autocompleteEnabled.checked = settings.autocompleteEnabled;
        elements.apiKey.value = settings.apiKey;
        elements.model.value = settings.model;
        elements.backendUrl.value = settings.backendUrl;
        
        resolve();
      }
    );
  });
}

function normalizeIgnoredIssues(value: unknown): IgnoredIssue[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === 'string') {
        return {
          id: entry,
          type: 'grammar',
          original: entry,
          suggestion: '',
          ignoredAt: Date.now(),
        } as IgnoredIssue;
      }

      if (
        entry &&
        typeof entry === 'object' &&
        'id' in entry &&
        'type' in entry &&
        'original' in entry &&
        'suggestion' in entry &&
        'ignoredAt' in entry
      ) {
        return entry as IgnoredIssue;
      }

      return null;
    })
    .filter((entry): entry is IgnoredIssue => Boolean(entry));
}

/**
 * Save settings to chrome.storage
 */
async function saveSettings() {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set(
      {
        enabled: settings.enabled,
        apiKey: settings.apiKey,
        model: settings.model,
        backendUrl: settings.backendUrl,
        checkAsYouType: settings.checkAsYouType,
        showNotifications: settings.showNotifications,
        autocompleteEnabled: settings.autocompleteEnabled,
        disabledDomains: settings.disabledDomains,
        dictionary: settings.dictionary,
        ignoredIssues: settings.ignoredIssues,
      },
      () => {
        console.log('Settings saved');
        resolve();
      }
    );
  });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Toggle settings
  elements.enabled.addEventListener('change', () => {
    settings.enabled = elements.enabled.checked;
    saveSettings();
  });
  
  elements.checkAsYouType.addEventListener('change', () => {
    settings.checkAsYouType = elements.checkAsYouType.checked;
    saveSettings();
  });
  
  elements.showNotifications.addEventListener('change', () => {
    settings.showNotifications = elements.showNotifications.checked;
    saveSettings();
  });

  elements.autocompleteEnabled.addEventListener('change', () => {
    settings.autocompleteEnabled = elements.autocompleteEnabled.checked;
    saveSettings();
  });
  
  // API Key
  elements.apiKey.addEventListener('input', () => {
    settings.apiKey = elements.apiKey.value;
    saveSettings();
  });
  
  elements.toggleApiKey.addEventListener('click', () => {
    const type = elements.apiKey.type === 'password' ? 'text' : 'password';
    elements.apiKey.type = type;
  });
  
  // Model
  elements.model.addEventListener('change', () => {
    settings.model = elements.model.value;
    saveSettings();
  });
  
  // Backend URL
  elements.backendUrl.addEventListener('input', () => {
    settings.backendUrl = elements.backendUrl.value;
    saveSettings();
    checkBackendHealth();
  });
  
  // Domain management
  elements.addDomain.addEventListener('click', addDomain);
  elements.newDomain.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addDomain();
  });
  
  // Dictionary management
  elements.addWord.addEventListener('click', addWord);
  elements.newWord.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addWord();
  });
  
  // Ignored issues
  elements.clearIgnored.addEventListener('click', clearIgnoredIssues);
  
  // Data management
  elements.exportData.addEventListener('click', exportData);
  elements.importData.addEventListener('click', () => elements.importFile.click());
  elements.importFile.addEventListener('change', importData);
  elements.resetSettings.addEventListener('click', resetSettings);
  elements.clearAnalytics.addEventListener('click', clearAnalytics);
}

/**
 * Check backend health
 */
async function checkBackendHealth() {
  const statusIndicator = elements.backendStatus.querySelector('.status-indicator') as HTMLElement;
  const statusText = elements.backendStatus.querySelector('.status-text') as HTMLElement;
  
  if (!statusIndicator || !statusText) return;
  
  try {
    const backendUrl = settings.backendUrl || 'http://localhost:8787/analyze';
    const healthUrl = backendUrl.replace('/analyze', '/health');
    
    const response = await fetch(healthUrl, { method: 'GET' });
    
    if (response.ok) {
      statusIndicator.className = 'status-indicator healthy';
      statusText.textContent = 'Connected';
    } else {
      throw new Error('Health check failed');
    }
  } catch (error) {
    statusIndicator.className = 'status-indicator unhealthy';
    statusText.textContent = 'Not connected';
  }
}

/**
 * Domain management
 */
function addDomain() {
  const domain = elements.newDomain.value.trim().toLowerCase();
  
  if (!domain) return;
  
  // Validate domain format
  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  if (!domainRegex.test(domain)) {
    alert('Please enter a valid domain (e.g., example.com)');
    return;
  }
  
  if (settings.disabledDomains.includes(domain)) {
    alert('This domain is already in the list');
    return;
  }
  
  settings.disabledDomains.push(domain);
  saveSettings();
  renderDomainList();
  
  elements.newDomain.value = '';
}

function removeDomain(domain: string) {
  settings.disabledDomains = settings.disabledDomains.filter(d => d !== domain);
  saveSettings();
  renderDomainList();
}

function renderDomainList() {
  if (settings.disabledDomains.length === 0) {
    elements.domainList.innerHTML = '<div class="empty-state">No disabled domains</div>';
    return;
  }
  
  elements.domainList.innerHTML = settings.disabledDomains
    .map(
      (domain) => `
        <div class="domain-item">
          <span class="domain-item-name">${escapeHtml(domain)}</span>
          <button class="domain-item-remove" data-domain="${escapeHtml(domain)}" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `
    )
    .join('');
  
  // Add event listeners
  elements.domainList.querySelectorAll('.domain-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const domain = (btn as HTMLElement).dataset.domain!;
      removeDomain(domain);
    });
  });
}

/**
 * Dictionary management
 */
function addWord() {
  const word = elements.newWord.value.trim().toLowerCase();
  
  if (!word) return;
  
  if (settings.dictionary.includes(word)) {
    alert('This word is already in the dictionary');
    return;
  }
  
  settings.dictionary.push(word);
  saveSettings();
  renderDictionary();
  
  elements.newWord.value = '';
}

function removeWord(word: string) {
  settings.dictionary = settings.dictionary.filter(w => w !== word);
  saveSettings();
  renderDictionary();
}

function renderDictionary() {
  if (settings.dictionary.length === 0) {
    elements.dictionaryList.innerHTML = '<div class="empty-state" style="width: 100%;">No custom dictionary words</div>';
    return;
  }
  
  elements.dictionaryList.innerHTML = settings.dictionary
    .map(
      (word) => `
        <span class="dictionary-word">
          ${escapeHtml(word)}
          <button class="dictionary-word-remove" data-word="${escapeHtml(word)}" title="Remove">&times;</button>
        </span>
      `
    )
    .join('');
  
  // Add event listeners
  elements.dictionaryList.querySelectorAll('.dictionary-word-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const word = (btn as HTMLElement).dataset.word!;
      removeWord(word);
    });
  });
}

/**
 * Ignored issues management
 */
function clearIgnoredIssues() {
  if (confirm('Are you sure you want to clear all ignored issues?')) {
    settings.ignoredIssues = [];
    saveSettings();
    renderIgnoredIssues();
  }
}

function removeIgnoredIssue(id: string) {
  settings.ignoredIssues = settings.ignoredIssues.filter(issue => issue.id !== id);
  saveSettings();
  renderIgnoredIssues();
}

function renderIgnoredIssues() {
  if (settings.ignoredIssues.length === 0) {
    elements.ignoredIssuesList.innerHTML = '<div class="empty-state">No ignored issues</div>';
    return;
  }
  
  elements.ignoredIssuesList.innerHTML = settings.ignoredIssues
    .sort((a, b) => b.ignoredAt - a.ignoredAt)
    .map(
      (issue) => `
        <div class="ignored-item">
          <div class="ignored-item-content">
            <span class="ignored-item-type">${escapeHtml(issue.type)}</span>
            <div>
              <span class="ignored-item-original">${escapeHtml(issue.original)}</span>
              <span style="color: var(--text-tertiary); margin: 0 8px;">→</span>
              <span class="ignored-item-suggestion">${escapeHtml(issue.suggestion)}</span>
            </div>
          </div>
          <button class="ignored-item-remove" data-id="${escapeHtml(issue.id)}" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `
    )
    .join('');
  
  // Add event listeners
  elements.ignoredIssuesList.querySelectorAll('.ignored-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      removeIgnoredIssue(id);
    });
  });
}

/**
 * Data management
 */
async function exportData() {
  const data = {
    settings,
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `opengrammar-settings-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}

async function importData(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (!data.settings) {
      throw new Error('Invalid file format');
    }
    
    if (confirm('This will overwrite your current settings. Continue?')) {
      settings = { ...settings, ...data.settings };
      await saveSettings();
      await loadSettings();
      renderDomainList();
      renderDictionary();
      renderIgnoredIssues();
      alert('Settings imported successfully!');
    }
  } catch (error) {
    alert('Failed to import settings. Please check the file format.');
    console.error('Import error:', error);
  } finally {
    target.value = '';
  }
}

async function resetSettings() {
  if (confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
    await chrome.storage.sync.clear();
    await loadSettings();
    renderDomainList();
    renderDictionary();
    renderIgnoredIssues();
    await loadAnalytics();
    alert('Settings reset to defaults.');
  }
}

async function loadAnalytics() {
  try {
    analyticsSummary = await chrome.runtime.sendMessage({ type: 'GET_ANALYTICS_SUMMARY' });
    renderAnalytics();
  } catch (error) {
    console.error('Failed to load analytics', error);
  }
}

function renderAnalytics() {
  const summary = analyticsSummary;
  if (!summary) return;

  elements.metricAnalyses.textContent = `${summary.totals.analysis_runs || 0}`;
  elements.metricIssues.textContent = `${summary.totals.issues_found || 0}`;
  elements.metricApplied.textContent = `${summary.totals.suggestions_applied || 0}`;
  elements.metricAutocomplete.textContent = `${summary.totals.autocomplete_accepted || 0}`;
  elements.analyticsUpdated.textContent = `Last updated: ${summary.lastUpdatedAt ? new Date(summary.lastUpdatedAt).toLocaleString() : 'never'}`;

  renderAnalyticsList(elements.topDomains, Object.entries(summary.domains || {}));
  renderAnalyticsList(elements.topProviders, Object.entries(summary.providers || {}));
}

function renderAnalyticsList(container: HTMLElement, entries: Array<[string, number]>) {
  const top = entries.sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (top.length === 0) {
    container.innerHTML = '<div class="empty-state">No synced activity yet</div>';
    return;
  }

  container.innerHTML = top
    .map(([label, value]) => `<div class="analytics-row"><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`)
    .join('');
}

async function clearAnalytics() {
  if (!confirm('Clear synced analytics for this profile?')) {
    return;
  }

  await chrome.runtime.sendMessage({ type: 'CLEAR_ANALYTICS' });
  await loadAnalytics();
}

/**
 * Utility: Escape HTML
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
