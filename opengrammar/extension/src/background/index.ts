chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHECK_GRAMMAR') {
    handleGrammarCheck(request.text, sendResponse);
    return true; // async response
  }
});

async function handleGrammarCheck(text: string, sendResponse: (response: any) => void) {
  try {
    const { apiKey, model, enabled } = await chrome.storage.sync.get(['apiKey', 'model', 'enabled']);

    if (enabled === false) {
      sendResponse({ issues: [] });
      return;
    }

    // Replace with your actual backend URL after deployment
    const BACKEND_URL = 'http://localhost:8787/analyze'; 

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        apiKey,
        model,
      }),
    });

    if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    sendResponse(data);
  } catch (error) {
    console.error('Grammar check failed:', error);
    sendResponse({ error: 'Failed to check grammar' });
  }
}
