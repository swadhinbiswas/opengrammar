import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ChevronDown, Gauge, Languages, PenSquare, Settings2, Sparkles } from 'lucide-react';
import './popup.css';
import type { ProviderConfig } from '../types';

interface Settings {
  enabled: boolean;
  apiKey: string;
  model: string;
  backendUrl: string;
  provider: string;
  customBaseUrl: string;
  backendHealthy: boolean;
}

const Popup = () => {
  const [settings, setSettings] = useState<Settings>({
    enabled: true,
    apiKey: '',
    model: 'gpt-4o-mini',
  providerModelMemory: Record<string, string>;
    backendUrl: '',
    provider: 'openai',
    customBaseUrl: '',
    backendHealthy: true,
  const [providerModelMemory, setProviderModelMemory] = useState<Record<string, string>>({});
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(true);
      ['enabled', 'apiKey', 'model', 'backendUrl', 'provider', 'customBaseUrl', 'backendHealthy', 'providerModelMemory'],
  const [availableModels, setAvailableModels] = useState<string[]>([]);
        const memory = (result.providerModelMemory || {}) as Record<string, string>;
        const selectedProvider = result.provider || 'openai';
        const rememberedModel = memory[selectedProvider];
  const [fetchingModels, setFetchingModels] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

          model: rememberedModel || result.model || 'gpt-4o-mini',
    loadSettings();
          provider: selectedProvider,
  }, []);

  useEffect(() => {
        setProviderModelMemory(memory);
    if (settings.provider) {
      loadModels();
    }
  }, [settings.provider]);

  const loadSettings = () => {
    chrome.storage.sync.get(
      ['enabled', 'apiKey', 'model', 'backendUrl', 'provider', 'customBaseUrl', 'backendHealthy'],
    const nextModelMemory = {
      ...providerModelMemory,
      ...(newSettings.provider ? { [newSettings.provider]: newSettings.model } : {}),
    };
    setProviderModelMemory(nextModelMemory);
      (result) => {
        setSettings({
          enabled: result.enabled !== false,
          apiKey: result.apiKey || '',
          model: result.model || 'gpt-4o-mini',
          backendUrl: result.backendUrl || 'http://localhost:8787',
          provider: result.provider || 'openai',
          customBaseUrl: result.customBaseUrl || '',
        providerModelMemory: nextModelMemory,
          backendHealthy: result.backendHealthy !== false,
        });
        setLoading(false);
      }
    );
  };

  const loadProviders = async () => {
    try {
    const rememberedModel = providerModelMemory[provider];
    saveSettings({ provider, model: rememberedModel || getDefaultModel(provider) });
      if (response.providers) {
        setProviders(response.providers);
      }
    } catch (error) {
      console.error('Failed to load providers:', error);
    }
  };

  const loadModels = async () => {
    setFetchingModels(true);
    try {
      const response = await chrome.runtime.sendMessage({ 
        type: 'GET_MODELS', 
        provider: settings.provider,
        apiKey: settings.apiKey,
        baseUrl: settings.provider === 'custom' ? settings.customBaseUrl : undefined
      });
      if (response.models) {
        setAvailableModels(response.models);
      }
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setFetchingModels(false);
    }
  };

  const saveSettings = (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    chrome.storage.sync.set(
      {
        enabled: newSettings.enabled,
        apiKey: newSettings.apiKey,
        model: newSettings.model,
        backendUrl: newSettings.backendUrl,
        provider: newSettings.provider,
        customBaseUrl: newSettings.customBaseUrl,
      },
      () => {
        console.log('Settings saved');
      }
    );
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provider = e.target.value;
    saveSettings({ provider, model: getDefaultModel(provider) });
  };

  const getDefaultModel = (provider: string): string => {
    const providerConfig = providers.find(p => p.id === provider);
    return providerConfig?.models[0] || 'gpt-4o-mini';
  };

  const openRewritePage = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_REWRITE_PAGE' });
  };

  const openStatsPage = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_STATS_PAGE' });
  };

  if (loading) {
    return (
      <div className="container loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const selectedProvider = providers.find(p => p.id === settings.provider);

  return (
    <div className="container">
      <header>
        <div className="logo">
          <div className="logo-mark">G</div>
          <h1>OpenGrammar</h1>
        </div>
        <span className={`status-badge ${settings.enabled ? 'enabled' : 'disabled'}`}>
          {settings.enabled ? 'Active' : 'Paused'}
        </span>
      </header>

      <main>
        <div className="setting-group">
          <label className="toggle-setting">
            <span className="setting-label">Enable OpenGrammar</span>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => saveSettings({ enabled: e.target.checked })}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className={`settings-content ${!settings.enabled ? 'disabled' : ''}`}>
          <div className="quick-actions">
            <button onClick={openRewritePage} className="btn-secondary-action">
              <PenSquare size={14} />
              Rewrite
            </button>
            <button onClick={openStatsPage} className="btn-secondary-action">
              <Gauge size={14} />
              Stats
            </button>
          </div>

          <div className="memory-card">
            <div>
              <strong>Remembered</strong>
              <span>{selectedProvider?.name || 'OpenAI'} · {settings.model}</span>
            </div>
            <span className={`status-dot ${settings.backendHealthy ? 'healthy' : 'unhealthy'}`}></span>
          </div>

          <div className="setting-group">
            <label>
              <span className="setting-label">AI Provider</span>
            </label>
            <select
              value={settings.provider}
              onChange={handleProviderChange}
              className="select-input"
            >
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} {provider.requiresApiKey ? '🔑' : '✅'}
                </option>
              ))}
            </select>
            {selectedProvider && (
              <span className="setting-hint">{selectedProvider.description}</span>
            )}
          </div>

          {selectedProvider?.requiresApiKey && (
            <div className="setting-group">
              <label>
                <span className="setting-label">API Key</span>
                <span className="setting-hint">Stored locally. Never sent to our servers.</span>
              </label>
              <div className="input-group">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.apiKey}
                  onChange={(e) => saveSettings({ apiKey: e.target.value })}
                  placeholder={settings.provider === 'ollama' ? 'Not required' : 'sk-...'}
                  className="text-input"
                  disabled={settings.provider === 'ollama'}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="btn-icon"
                  title={showApiKey ? 'Hide' : 'Show'}
                >
                  {showApiKey ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="setting-group">
            <label>
              <span className="setting-label">Model</span>
            </label>
            <select
              value={settings.model}
              onChange={(e) => saveSettings({ model: e.target.value })}
              className="select-input"
              disabled={fetchingModels}
            >
              {fetchingModels ? (
                <option>Loading...</option>
              ) : (
                <>
                  {(availableModels.length > 0 ? availableModels : selectedProvider?.models || []).map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </>
              )}
            </select>
          </div>

          <button
            type="button"
            className="advanced-toggle"
            onClick={() => setShowAdvanced((prev) => !prev)}
          >
            <span className="advanced-toggle-left">
              <Settings2 size={14} />
              Advanced
            </span>
            <ChevronDown size={14} className={showAdvanced ? 'rotated' : ''} />
          </button>

          {showAdvanced && (
            <div className="advanced-panel">
              {settings.provider === 'custom' && (
                <div className="setting-group compact-group">
                  <label>
                    <span className="setting-label with-icon"><Languages size={14} /> Custom Base URL</span>
                  </label>
                  <input
                    type="url"
                    value={settings.customBaseUrl}
                    onChange={(e) => saveSettings({ customBaseUrl: e.target.value })}
                    placeholder="https://your-api.com/v1"
                    className="text-input"
                  />
                </div>
              )}

              <div className="setting-group compact-group">
                <label>
                  <span className="setting-label with-icon"><Sparkles size={14} /> Backend URL</span>
                  <span className="setting-hint">
                    Auto-saved in browser. Default is localhost.
                  </span>
                </label>
                <input
                  type="url"
                  value={settings.backendUrl}
                  onChange={(e) => saveSettings({ backendUrl: e.target.value })}
                  placeholder="http://localhost:8787"
                  className="text-input"
                />
                <div className="backend-status">
                  <span className={`status-dot ${settings.backendHealthy ? 'healthy' : 'unhealthy'}`}></span>
                  <span className="status-text">
                    {settings.backendHealthy ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <button onClick={() => chrome.runtime.openOptionsPage()} className="btn-options">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Open Settings
        </button>
      </footer>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
