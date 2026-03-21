# OpenGrammar API Documentation

Base URL for self-hosted instances: `http://localhost:8787`

## Endpoints

### Health Check

#### `GET /health`

Check the health status of the API.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-03-21T12:00:00.000Z",
  "environment": "production",
  "version": "2.0.0"
}
```

---

### List Providers

#### `GET /providers`

Get a list of all supported LLM providers.

**Response:**

```json
{
  "providers": [
    {
      "id": "openai",
      "name": "OpenAI",
      "baseUrl": "https://api.openai.com/v1",
      "models": ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
      "requiresApiKey": true,
      "description": "OpenAI's GPT models"
    },
    {
      "id": "groq",
      "name": "Groq",
      "baseUrl": "https://api.groq.com/openai/v1",
      "models": ["llama-3-70b-8192", "mixtral-8x7b-32768"],
      "requiresApiKey": true,
      "description": "Groq's ultra-fast inference"
    }
  ]
}
```

---

### Get Models

#### `POST /models`

Get available models for a specific provider.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| provider | string | Yes | Provider ID (e.g., 'openai', 'groq') |
| apiKey | string | No | API key for the provider |
| baseUrl | string | No | Custom base URL for the provider |

**Example Request:**

```json
{
  "provider": "openai",
  "apiKey": "sk-..."
}
```

**Response:**

```json
{
  "provider": "openai",
  "models": [
    "gpt-4",
    "gpt-4-turbo",
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-3.5-turbo"
  ]
}
```

---

### Analyze Text

#### `POST /analyze`

Analyze text for grammar, spelling, clarity, and style issues.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Text to analyze (max 50,000 chars) |
| apiKey | string | No | LLM API key for AI-powered analysis |
| model | string | No | Specific model to use |
| provider | string | No | Provider ID ('openai', 'groq', etc.) |
| baseUrl | string | No | Custom API base URL |
| ignoredIssues | string[] | No | List of issue IDs to exclude |
| dictionary | string[] | No | Custom dictionary of accepted words |
| context | object | No | Analysis context (see below) |

**Context Object:**

| Field | Type | Description |
|-------|------|-------------|
| domain | string | Website domain |
| editorType | string | Type of editor |
| activeSentence | string | Current sentence |
| previousText | string | Text before cursor |
| nextText | string | Text after cursor |
| fullTextExcerpt | string | Larger text excerpt |

**Example Request:**

```json
{
  "text": "This are a test. The quik brown fox.",
  "apiKey": "sk-...",
  "provider": "openai",
  "model": "gpt-4o-mini",
  "context": {
    "domain": "gmail.com",
    "editorType": "textarea"
  }
}
```

**Response:**

```json
{
  "issues": [
    {
      "type": "grammar",
      "original": "This are",
      "suggestion": "This is",
      "reason": "Subject-verb agreement error.",
      "offset": 0,
      "length": 8,
      "id": "grammar-0-This are",
      "confidence": 0.95,
      "priority": 92.5,
      "source": "rule"
    },
    {
      "type": "spelling",
      "original": "quik",
      "suggestion": "quick",
      "reason": "Misspelled word.",
      "offset": 18,
      "length": 4,
      "id": "spelling-18-quik",
      "confidence": 0.98,
      "priority": 95.0,
      "source": "rule"
    }
  ],
  "metadata": {
    "textLength": 35,
    "issuesCount": 2,
    "processingTimeMs": 145,
    "contextUsed": true,
    "model": "gpt-4o-mini",
    "provider": "openai"
  }
}
```

**Issue Types:**

- `grammar`: Grammar and syntax errors
- `spelling`: Misspelled words
- `clarity`: Unclear or confusing text
- `style`: Style and tone suggestions

**Error Responses:**

```json
{
  "error": "Invalid request: text is required",
  "message": "The text field is required in the request body"
}
```

```json
{
  "error": "Text exceeds maximum length of 50,000 characters",
  "message": "Please reduce the text length and try again"
}
```

---

### Autocomplete

#### `POST /autocomplete`

Get text completion suggestions based on current cursor position.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Current text content |
| cursor | number | Yes | Cursor position in text |
| apiKey | string | No | LLM API key |
| model | string | No | Specific model to use |
| provider | string | No | Provider ID |
| baseUrl | string | No | Custom API base URL |
| context | object | No | Analysis context |

**Example Request:**

```json
{
  "text": "Thank you for",
  "cursor": 13,
  "provider": "openai"
}
```

**Response:**

```json
{
  "suggestion": " your time and consideration.",
  "confidence": 0.85,
  "replaceStart": 13,
  "replaceEnd": 13,
  "source": "llm"
}
```

**Source Types:**

- `heuristic`: Pattern-based suggestions (no API key needed)
- `llm`: AI-powered suggestions (requires API key)

---

### Rewrite Text

#### `POST /rewrite`

Rewrite text with a specific tone or style.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Text to rewrite |
| tone | string | Yes | Desired tone (see below) |
| apiKey | string | No | LLM API key |
| model | string | No | Specific model to use |
| provider | string | No | Provider ID |
| baseUrl | string | No | Custom API base URL |

**Available Tones:**

- `formal`: Formal and professional
- `casual`: Casual and conversational
- `professional`: Business-appropriate
- `friendly`: Warm and friendly
- `concise`: Direct and brief
- `detailed`: Elaborate and thorough
- `persuasive`: Compelling and convincing
- `neutral`: Objective and balanced

**Example Request:**

```json
{
  "text": "Hey, just wanna say thanks for the help!",
  "tone": "professional",
  "provider": "openai"
}
```

**Response:**

```json
{
  "original": "Hey, just wanna say thanks for the help!",
  "rewritten": "I would like to express my gratitude for your assistance.",
  "tone": "professional"
}
```

---

## Error Handling

All endpoints return errors in a consistent format:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid API key |
| 413 | Payload Too Large - Text exceeds limit |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## Rate Limiting

Rate limits depend on the LLM provider used:

- **OpenAI**: Based on your OpenAI account limits
- **Groq**: Based on your Groq account limits
- **Self-hosted**: No additional limits

---

## Authentication

API keys are passed in the request body, not in headers. This allows the extension to use multiple providers with different keys.

**Security Notes:**

- API keys are never stored on the server
- All requests are stateless
- Keys are sent directly to the LLM provider
- No logging of request content

---

## Self-Hosting

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8787 |
| `ENV` | Environment name | development |
| `ALLOWED_ORIGINS` | CORS allowed origins | * |

### Deployment

See deployment guides:
- [Cloudflare Workers](../opengrammar/backend/VERCEL_DEPLOYMENT.md)
- [Vercel](../opengrammar/backend/VERCEL_DEPLOYMENT.md)
- [Render](../opengrammar/backend/RENDER_DEPLOYMENT.md)
- [Railway](../opengrammar/backend/RAILWAY_DEPLOYMENT.md)

---

## SDK Examples

### JavaScript/TypeScript

```typescript
async function analyzeText(text: string, apiKey: string) {
  const response = await fetch('http://localhost:8787/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      apiKey,
      provider: 'openai',
      model: 'gpt-4o-mini',
    }),
  });
  
  const data = await response.json();
  return data;
}
```

### Python

```python
import requests

def analyze_text(text: str, api_key: str):
    response = requests.post(
        'http://localhost:8787/analyze',
        json={
            'text': text,
            'apiKey': api_key,
            'provider': 'openai',
            'model': 'gpt-4o-mini',
        }
    )
    return response.json()
```

---

For more information, see [README.md](../README.md) and [SELF_HOSTING.md](../opengrammar/SELF_HOSTING.md).
