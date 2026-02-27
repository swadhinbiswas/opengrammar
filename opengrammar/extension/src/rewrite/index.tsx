import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './rewrite.css';

type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'concise' | 'detailed' | 'persuasive' | 'neutral';

const RewritePopup = () => {
  const [selectedText, setSelectedText] = useState('');
  const [tone, setTone] = useState<Tone>('formal');
  const [rewrittenText, setRewrittenText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get selected text from page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTION' }, (response) => {
          if (response?.text) {
            setSelectedText(response.text);
          } else {
            setError('No text selected. Please select text to rewrite.');
          }
        });
      } else {
        setError('No active tab found.');
      }
    });
  }, []);

  const handleRewrite = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { apiKey, model, provider, customBaseUrl, backendUrl } = await chrome.storage.sync.get([
        'apiKey', 'model', 'provider', 'customBaseUrl', 'backendUrl'
      ]);

      const baseUrl = backendUrl || 'http://localhost:8787';
      
      const response = await fetch(`${baseUrl}/rewrite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: selectedText,
          tone,
          apiKey,
          model,
          provider,
          baseUrl: customBaseUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to rewrite text');
      }

      const data = await response.json();
      setRewrittenText(data.rewritten);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'APPLY_REWRITE',
          original: selectedText,
          rewritten: rewrittenText,
        });
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenText);
  };

  const toneOptions: { value: Tone; label: string; emoji: string }[] = [
    { value: 'formal', label: 'Formal', emoji: '🎩' },
    { value: 'casual', label: 'Casual', emoji: '😊' },
    { value: 'professional', label: 'Professional', emoji: '💼' },
    { value: 'friendly', label: 'Friendly', emoji: '🤗' },
    { value: 'concise', label: 'Concise', emoji: '✂️' },
    { value: 'detailed', label: 'Detailed', emoji: '📝' },
    { value: 'persuasive', label: 'Persuasive', emoji: '💪' },
    { value: 'neutral', label: 'Neutral', emoji: '⚖️' },
  ];

  return (
    <div className="rewrite-container">
      <header className="rewrite-header">
        <h1>✨ Rewrite Text</h1>
      </header>

      <main className="rewrite-main">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="tone-selector">
              <label>Choose Tone:</label>
              <div className="tone-grid">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`tone-btn ${tone === option.value ? 'active' : ''}`}
                    onClick={() => setTone(option.value)}
                  >
                    <span className="tone-emoji">{option.emoji}</span>
                    <span className="tone-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-comparison">
              <div className="text-panel">
                <label>Original:</label>
                <div className="text-content original">{selectedText}</div>
              </div>

              <div className="text-panel">
                <label>Rewritten:</label>
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Rewriting with AI...</p>
                  </div>
                ) : rewrittenText ? (
                  <div className="text-content rewritten">{rewrittenText}</div>
                ) : (
                  <div className="text-content placeholder">
                    Click "Rewrite" to see suggestions
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="btn-rewrite"
                onClick={handleRewrite}
                disabled={loading || !selectedText}
              >
                {loading ? 'Rewriting...' : '✨ Rewrite'}
              </button>
              
              {rewrittenText && (
                <>
                  <button className="btn-apply" onClick={handleApply}>
                    ✓ Apply
                  </button>
                  <button className="btn-copy" onClick={handleCopy}>
                    📋 Copy
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RewritePopup />
  </React.StrictMode>
);
