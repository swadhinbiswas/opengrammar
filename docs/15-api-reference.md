# 🔌 API Reference

Complete API documentation for OpenGrammar backend.

---

## 📋 Overview

OpenGrammar provides a RESTful API for grammar checking, tone rewriting, and writing analysis.

**Base URL:** `http://localhost:8787` (local) or your deployed URL

**Content Type:** `application/json`

---

## 🔑 Authentication

Most endpoints don't require authentication for basic usage. However, AI-powered features require API keys configured in environment variables or passed in requests.

---

## 📤 Endpoints

### Health Check

#### `GET /health`

Check server health and status.

**Request:**
```bash
curl http://localhost:8787/health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-14T12:00:00.000Z",
  "environment": "production",
  "version": "2.1.0"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Server status (`healthy`, `unhealthy`) |
| `timestamp` | string | ISO 8601 timestamp |
| `environment` | string | Environment name |
| `version` | string | API version |

---

### List Providers

#### `GET /providers`

Get list of available AI providers.

**Request:**
```bash
curl http://localhost:8787/providers
```

**Response (200 OK):**
```json
{
  "providers": [
    {
      "id": "groq",
      "name": "Groq",
      "description": "Fast inference with free tier",
      "models": ["llama-3.1-70b-versatile", "llama-3.1-8b-instant"],
      "requiresApiKey": true,
      "defaultModel": "llama-3.1-70b-versatile"
    },
    {
      "id": "openai",
      "name": "OpenAI",
      "description": "Best quality grammar checking",
      "models": ["gpt-4o-mini", "gpt-4o", "gpt-3.5-turbo"],
      "requiresApiKey": true,
      "defaultModel": "gpt-4o-mini"
    },
    {
      "id": "ollama",
      "name": "Ollama (Local)",
      "description": "Run models locally",
      "models": ["qwen2.5:1.5b", "phi4-mini:3.8b"],
      "requiresApiKey": false,
      "defaultModel": "qwen2.5:1.5b"
    }
  ]
}
```

---

### List Models

#### `POST /models`

Get available models for a specific provider.

**Request:**
```bash
curl -X POST http://localhost:8787/models \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "groq"
  }'
```

**Response (200 OK):**
```json
{
  "provider": "groq",
  "models": [
    {
      "id": "llama-3.1-70b-versatile",
      "name": "Llama 3.1 70B",
      "description": "Best for grammar checking",
      "contextWindow": 128000,
      "speed": "fast",
      "quality": "excellent"
    },
    {
      "id": "llama-3.1-8b-instant",
      "name": "Llama 3.1 8B",
      "description": "Fast inference",
      "contextWindow": 128000,
      "speed": "very fast",
      "quality": "good"
    }
  ]
}
```

---

### Analyze Text

#### `POST /analyze`

Analyze text for grammar, spelling, and style issues.

**Request:**
```bash
curl -X POST http://localhost:8787/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "me and him went to the store and buyed milks",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "apiKey": "gsk_xxx",
    "options": {
      "checkGrammar": true,
      "checkSpelling": true,
      "checkStyle": true,
      "checkClarity": true
    }
  }'
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | Text to analyze (max 50,000 chars) |
| `provider` | string | No | AI provider (default: rule-based only) |
| `model` | string | No | Model to use |
| `apiKey` | string | No | API key (if not set in env) |
| `options` | object | No | Analysis options |

**Response (200 OK):**
```json
{
  "issues": [
    {
      "type": "grammar",
      "severity": "error",
      "original": "me and him",
      "suggestion": "he and I",
      "reason": "Subject pronoun error. Use subject pronouns for the subject of a sentence.",
      "offset": 0,
      "length": 9,
      "category": "grammar"
    },
    {
      "type": "spelling",
      "severity": "error",
      "original": "buyed",
      "suggestion": "bought",
      "reason": "Irregular verb form. The past tense of 'buy' is 'bought'.",
      "offset": 38,
      "length": 5,
      "category": "spelling"
    }
  ],
  "metadata": {
    "textLength": 49,
    "issuesCount": 2,
    "processingTimeMs": 245,
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "ruleBasedCount": 0,
    "aiBasedCount": 2
  }
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `issues` | array | List of detected issues |
| `metadata` | object | Analysis metadata |

**Issue Object:**
| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Issue type (`grammar`, `spelling`, `style`, `clarity`) |
| `severity` | string | Severity (`error`, `warning`, `suggestion`) |
| `original` | string | Original text |
| `suggestion` | string | Suggested replacement |
| `reason` | string | Explanation |
| `offset` | number | Character offset in text |
| `length` | number | Length of issue |
| `category` | string | Category for grouping |

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Text too long",
  "message": "Maximum text length is 50,000 characters"
}
```

**401 Unauthorized:**
```json
{
  "error": "API key required",
  "message": "Please provide an API key for this provider"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Provider error",
  "message": "Failed to connect to AI provider"
}
```

---

### Rewrite Text

#### `POST /rewrite`

Rewrite text in a specific tone or style.

**Request:**
```bash
curl -X POST http://localhost:8787/rewrite \
  -H "Content-Type: application/json" \
  -d '{
    "text": "hey whats up can we talk",
    "tone": "formal",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile",
    "apiKey": "gsk_xxx"
  }'
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | Text to rewrite |
| `tone` | string | Yes | Target tone |
| `provider` | string | No | AI provider |
| `model` | string | No | Model to use |
| `apiKey` | string | No | API key |

**Available Tones:**
- `formal` - Professional, academic
- `casual` - Relaxed, informal
- `professional` - Business appropriate
- `friendly` - Warm, approachable
- `concise` - Brief, to the point
- `detailed` - Comprehensive, thorough
- `persuasive` - Convincing, compelling
- `neutral` - Balanced, unbiased

**Response (200 OK):**
```json
{
  "original": "hey whats up can we talk",
  "rewritten": "Hello, how are you? May we have a conversation?",
  "tone": "formal",
  "provider": "groq",
  "model": "llama-3.1-70b-versatile",
  "metadata": {
    "originalLength": 26,
    "rewrittenLength": 49,
    "processingTimeMs": 1250,
    "confidenceScore": 0.95
  }
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `original` | string | Original text |
| `rewritten` | string | Rewritten text |
| `tone` | string | Applied tone |
| `provider` | string | AI provider used |
| `model` | string | Model used |
| `metadata` | object | Additional information |

---

### Get Statistics

#### `POST /statistics`

Get detailed writing statistics.

**Request:**
```bash
curl -X POST http://localhost:8787/statistics \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your complete text here..."
  }'
```

**Response (200 OK):**
```json
{
  "basic": {
    "words": 1248,
    "characters": 6542,
    "charactersNoSpaces": 5421,
    "sentences": 87,
    "paragraphs": 12,
    "syllables": 1876
  },
  "readability": {
    "fleschReadingEase": 78.5,
    "fleschKincaidGrade": 8.5,
    "automatedReadabilityIndex": 9.2,
    "readingLevel": "Excellent"
  },
  "time": {
    "readingTimeSeconds": 374,
    "readingTimeFormatted": "6 min 14 sec",
    "speakingTimeSeconds": 499,
    "speakingTimeFormatted": "8 min 19 sec"
  },
  "vocabulary": {
    "uniqueWords": 542,
    "vocabularyDiversity": 43.4,
    "averageWordLength": 4.8,
    "longWords": 156
  },
  "issues": {
    "grammar": 3,
    "spelling": 5,
    "style": 7,
    "clarity": 4,
    "total": 19
  }
}
```

**Response Fields:**

**Basic:**
| Field | Type | Description |
|-------|------|-------------|
| `words` | number | Total words |
| `characters` | number | Characters with spaces |
| `charactersNoSpaces` | number | Characters without spaces |
| `sentences` | number | Total sentences |
| `paragraphs` | number | Total paragraphs |
| `syllables` | number | Total syllables |

**Readability:**
| Field | Type | Description |
|-------|------|-------------|
| `fleschReadingEase` | number | 0-100 score |
| `fleschKincaidGrade` | number | US grade level |
| `automatedReadabilityIndex` | number | ARI score |
| `readingLevel` | string | Text description |

**Time:**
| Field | Type | Description |
|-------|------|-------------|
| `readingTimeSeconds` | number | Seconds to read |
| `readingTimeFormatted` | string | Human-readable |
| `speakingTimeSeconds` | number | Seconds to speak |
| `speakingTimeFormatted` | string | Human-readable |

**Vocabulary:**
| Field | Type | Description |
|-------|------|-------------|
| `uniqueWords` | number | Different words |
| `vocabularyDiversity` | number | Percentage |
| `averageWordLength` | number | Mean characters |
| `longWords` | number | Words > 6 chars |

---

## 📝 Code Examples

### JavaScript/TypeScript

```typescript
// Analyze text
async function analyzeText(text: string) {
  const response = await fetch('http://localhost:8787/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      provider: 'groq',
      model: 'llama-3.1-70b-versatile'
    })
  });
  
  const data = await response.json();
  return data;
}

// Rewrite text
async function rewriteText(text: string, tone: string) {
  const response = await fetch('http://localhost:8787/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      tone: tone
    })
  });
  
  const data = await response.json();
  return data.rewritten;
}
```

### Python

```python
import requests

# Analyze text
def analyze_text(text):
    response = requests.post(
        'http://localhost:8787/analyze',
        json={
            'text': text,
            'provider': 'groq',
            'model': 'llama-3.1-70b-versatile'
        }
    )
    return response.json()

# Rewrite text
def rewrite_text(text, tone):
    response = requests.post(
        'http://localhost:8787/rewrite',
        json={
            'text': text,
            'tone': tone
        }
    )
    return response.json()['rewritten']

# Get statistics
def get_statistics(text):
    response = requests.post(
        'http://localhost:8787/statistics',
        json={'text': text}
    )
    return response.json()
```

### cURL

```bash
# Analyze
curl -X POST http://localhost:8787/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "me and him went", "provider": "groq"}'

# Rewrite
curl -X POST http://localhost:8787/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text": "hey", "tone": "formal"}'

# Statistics
curl -X POST http://localhost:8787/statistics \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

---

## 🔧 Error Handling

### Error Response Format

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Malformed request |
| `TEXT_TOO_LONG` | 400 | Text exceeds 50,000 chars |
| `API_KEY_REQUIRED` | 401 | API key needed |
| `INVALID_API_KEY` | 401 | API key invalid |
| `PROVIDER_ERROR` | 500 | AI provider error |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVICE_UNAVAILABLE` | 503 | Service down |

---

## 📊 Rate Limiting

### Default Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/analyze` | 100 req | 1 minute |
| `/rewrite` | 50 req | 1 minute |
| `/statistics` | 200 req | 1 minute |
| `/health` | Unlimited | - |

### Rate Limit Response

**429 Too Many Requests:**
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again in 30 seconds.",
  "retryAfter": 30
}
```

---

## 🔒 Security

### Input Validation

- Maximum text length: 50,000 characters
- Sanitized input
- Type checking
- JSON validation

### API Key Handling

- Keys stored in environment variables
- Never logged
- Passed securely to providers
- Not retained by backend

### CORS

Configured for browser extensions:
```typescript
app.use('*', cors({
  origin: ['chrome-extension://*', 'moz-extension://*'],
  credentials: true
}));
```

---

## 📈 Performance

### Response Times

| Endpoint | Avg (ms) | P95 (ms) | P99 (ms) |
|----------|----------|----------|----------|
| `/health` | 10 | 20 | 50 |
| `/analyze` (rule-based) | 50 | 100 | 200 |
| `/analyze` (AI) | 1000 | 2000 | 3000 |
| `/rewrite` | 1500 | 2500 | 4000 |
| `/statistics` | 100 | 200 | 300 |

### Optimization Tips

1. **Use rule-based for simple checks** - Faster, no API cost
2. **Batch requests** - Combine multiple texts
3. **Cache results** - Store common analyses
4. **Use appropriate models** - Smaller models for simple tasks

---

## 📚 Related Documentation

- [Backend Deployment](05-backend-deployment.md) - Deploy the API
- [AI Providers](07-ai-providers.md) - Configure providers
- [Troubleshooting](18-troubleshooting.md) - Fix issues

---

**API Version:** 2.1.0  
**Last Updated:** March 2026
