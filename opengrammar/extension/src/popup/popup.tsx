import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';

const Popup = () => {
  const [enabled, setEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');

  useEffect(() => {
    chrome.storage.sync.get(['enabled', 'apiKey', 'model'], (result) => {
      setEnabled(result.enabled !== false); // default true
      setApiKey(result.apiKey || '');
      setModel(result.model || 'gpt-3.5-turbo');
    });
  }, []);

  const saveSettings = (newEnabled: boolean, newKey: string, newModel: string) => {
    chrome.storage.sync.set({ enabled: newEnabled, apiKey: newKey, model: newModel }, () => {
      console.log('Settings saved');
    });
  };

  const handleEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.checked;
    setEnabled(newVal);
    saveSettings(newVal, apiKey, model);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setApiKey(newVal);
    saveSettings(enabled, newVal, model);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setModel(newVal);
    saveSettings(enabled, apiKey, newVal);
  };

  return (
    <div className="container">
      <h1>OpenGrammar</h1>
      <div className="setting">
        <label>
          <input type="checkbox" checked={enabled} onChange={handleEnabledChange} />
          Enable OpenGrammar
        </label>
      </div>
      <div className="setting">
        <label>OpenAI API Key (Optional)</label>
        <input 
          type="password" 
          value={apiKey} 
          onChange={handleApiKeyChange} 
          placeholder="sk-..." 
        />
        <small>Stored locally. Never sent to our servers.</small>
      </div>
      <div className="setting">
        <label>Model</label>
        <select value={model} onChange={handleModelChange}>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
        </select>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
