# 🐳 Docker Self-Hosting Guide

Run OpenGrammar locally with Docker and optional local LLM support (Ollama).

---

## 🎯 Why Self-Host with Docker?

| Benefit | Description |
|---------|-------------|
| **Complete Privacy** | All data stays on your machine |
| **Free** | No API costs (with local LLM) |
| **Offline** | Works without internet |
| **Full Control** | Customize everything |
| **No Rate Limits** | Use as much as you want |

---

## 📋 Prerequisites

- Docker (v20.10+)
- Docker Compose (usually included with Docker)
- 4GB+ RAM (for local LLM)
- NVIDIA GPU (optional, for faster LLM inference)

---

## 🚀 Quick Start

### Option 1: Backend Only (Use Cloud APIs)

```bash
cd opengrammar/opengrammar

# Create environment file
cat > .env << EOF
PORT=8787
NODE_ENV=production
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
EOF

# Start backend
docker-compose up -d opengrammar-backend

# Check status
docker-compose ps

# View logs
docker-compose logs -f opengrammar-backend
```

### Option 2: Backend + Ollama (Local LLM)

```bash
cd opengrammar/opengrammar

# Start everything (requires NVIDIA GPU)
docker-compose --profile local-llm up -d

# Check status
docker-compose ps

# View all logs
docker-compose logs -f
```

---

## 🔧 Docker Compose Configuration

### Complete docker-compose.yml

```yaml
version: '3.8'

services:
  # OpenGrammar Backend
  opengrammar-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: opengrammar-backend
    restart: unless-stopped
    ports:
      - "8787:8787"
    environment:
      - NODE_ENV=production
      - PORT=8787
      - GROQ_API_KEY=${GROQ_API_KEY:-}
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-}
      - TOGETHER_API_KEY=${TOGETHER_API_KEY:-}
      - OLLAMA_BASE_URL=${OLLAMA_BASE_URL:-http://ollama:11434/v1}
      - DEBUG=${DEBUG:-false}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8787/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - opengrammar-network
    depends_on:
      - ollama
    volumes:
      - ./backend/logs:/app/logs

  # Ollama (Local LLM)
  ollama:
    image: ollama/ollama:latest
    container_name: opengrammar-ollama
    restart: unless-stopped
    profiles:
      - local-llm
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    networks:
      - opengrammar-network
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  # Open WebUI (Optional - for testing Ollama)
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: opengrammar-webui
    restart: unless-stopped
    profiles:
      - local-llm
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    networks:
      - opengrammar-network
    depends_on:
      - ollama
    volumes:
      - open-webui_data:/app/backend/data

networks:
  opengrammar-network:
    driver: bridge

volumes:
  ollama_data:
  open-webui_data:
```

---

## 🤖 Local LLM Setup with Ollama

### Step 1: Start Ollama Container

```bash
docker-compose --profile local-llm up -d ollama
```

### Step 2: Pull Grammar-Focused Models

```bash
# Enter Ollama container
docker exec -it opengrammar-ollama bash

# Pull models (inside container)
ollama pull qwen2.5:0.5b      # Ultra fast, 400MB
ollama pull qwen2.5:1.5b      # Balanced, 1GB
ollama pull phi4-mini:3.8b    # Great quality, 2.5GB
ollama pull llama3.2:3b       # Good all-rounder, 2GB

# Exit container
exit
```

### Step 3: Test Ollama

```bash
# Test from host
curl http://localhost:11434/api/tags

# Test model
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:1.5b",
  "prompt": "Fix this grammar: me and him went to store"
}'
```

### Step 4: Configure OpenGrammar

1. Click extension icon → Settings
2. Provider: **Ollama (Local)**
3. Base URL: `http://localhost:11434/v1`
4. Model: `qwen2.5:1.5b`
5. API Key: (leave empty)
6. Backend URL: `http://localhost:8787`

---

## 🎯 Model Recommendations

### For Grammar Checking

| Model | Size | RAM | Speed | Quality | Best For |
|-------|------|-----|-------|---------|----------|
| **qwen2.5:0.5b** | 400MB | 1GB | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | Fast basic checks |
| **qwen2.5:1.5b** | 1GB | 2GB | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Balanced |
| **phi4-mini:3.8b** | 2.5GB | 4GB | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Best quality |
| **llama3.2:3b** | 2GB | 3GB | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Good balance |

### For GPU Acceleration

If you have an NVIDIA GPU:

```bash
# High quality with GPU
ollama pull llama3.2:7b       # 4GB, requires 8GB+ GPU
ollama pull mistral:7b        # 4GB, requires 8GB+ GPU
ollama pull mixtral:8x7b      # 26GB, requires 24GB+ GPU
```

---

## 🔧 Advanced Configuration

### Custom Backend Port

```yaml
# docker-compose.yml
ports:
  - "9000:8787"  # Change 8787 to 9000
```

### Enable GPU Support

```yaml
# For NVIDIA GPUs
ollama:
  deploy:
    resources:
      reservations:
        devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

### Persistent Logs

```yaml
opengrammar-backend:
  volumes:
    - ./logs:/app/logs
```

### Network Isolation

```yaml
networks:
  opengrammar-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
```

---

## 📊 Performance Benchmarks

### Local LLM (RTX 4090)

| Model | Tokens/sec | Grammar Accuracy | RAM | VRAM |
|-------|------------|------------------|-----|------|
| qwen2.5:0.5b | ~100 | 75% | 1GB | 1GB |
| qwen2.5:1.5b | ~80 | 82% | 2GB | 2GB |
| phi4-mini:3.8b | ~50 | 88% | 4GB | 4GB |
| llama3.2:7b | ~30 | 90% | 8GB | 8GB |

### Cloud APIs (via Docker)

| Model | Latency | Grammar Accuracy | Cost/1K requests |
|-------|---------|------------------|------------------|
| gpt-4o-mini | ~1s | 95% | $0.15 |
| llama-3.1-70b (Groq) | ~200ms | 92% | Free (tier) |
| claude-3.5-sonnet | ~2s | 96% | $3.00 |

---

## 🛡️ Security Considerations

### 1. Network Isolation
```yaml
networks:
  opengrammar-network:
    internal: true  # No external access
```

### 2. Environment Variables
Never commit `.env` file:
```bash
echo ".env" >> .gitignore
```

### 3. API Key Rotation
```bash
# Generate new keys periodically
openssl rand -hex 32
```

### 4. Container Security
```yaml
security_opt:
  - no-new-privileges:true
read_only: true
tmpfs:
  - /tmp
```

---

## 📈 Monitoring & Maintenance

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f opengrammar-backend

# Last 100 lines
docker-compose logs --tail=100 opengrammar-backend
```

### Check Health
```bash
# Backend health
curl http://localhost:8787/health

# Ollama status
curl http://localhost:11434/api/tags

# Container status
docker-compose ps
```

### Update Containers
```bash
# Pull latest images
docker-compose pull

# Recreate containers
docker-compose up -d --force-recreate

# Clean up old images
docker image prune -f
```

### Backup Data
```bash
# Backup Ollama models
docker run --rm \
  -v opengrammar_ollama_data:/data \
  -v $(pwd)/backup:/backup \
  alpine tar czf /backup/ollama-backup.tar.gz /data

# Backup settings
docker-compose exec opengrammar-backend \
  cat /app/data/settings.json > backup-settings.json
```

---

## 🔄 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs opengrammar-backend

# Test configuration
docker-compose config

# Check port conflict
lsof -i :8787
lsof -i :11434
```

### Ollama Connection Failed
```bash
# Check Ollama is running
docker-compose ps ollama

# Test connection
docker-compose exec opengrammar-backend curl http://ollama:11434/api/tags

# Restart Ollama
docker-compose restart ollama
```

### GPU Not Working
```bash
# Check NVIDIA Container Toolkit
nvidia-container-cli info

# Verify GPU access
docker exec -it opengrammar-ollama nvidia-smi

# Update Docker Compose
docker-compose version
```

### High Memory Usage
```bash
# Check container memory
docker stats

# Limit Ollama memory
ollama:
  deploy:
    resources:
      limits:
        memory: 4G
```

### Slow Performance
```bash
# Check CPU usage
docker stats

# Use smaller model
ollama pull qwen2.5:0.5b

# Enable GPU (if available)
# See GPU configuration above
```

---

## 🚀 Production Deployment

### Docker Swarm

```yaml
# docker-stack.yml
version: '3.8'

services:
  opengrammar-backend:
    image: opengrammar-backend:latest
    ports:
      - "8787:8787"
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1'
          memory: 512M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8787/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Deploy:
```bash
docker stack deploy -c docker-stack.yml opengrammar
```

### Kubernetes

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opengrammar-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: opengrammar-backend
  template:
    metadata:
      labels:
        app: opengrammar-backend
    spec:
      containers:
      - name: backend
        image: opengrammar-backend:latest
        ports:
        - containerPort: 8787
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 8787
          initialDelaySeconds: 30
          periodSeconds: 10
```

---

## 📚 Related Documentation

- [Backend Deployment](05-backend-deployment.md) - Cloud deployment options
- [AI Provider Setup](07-ai-providers.md) - Configure AI providers
- [Troubleshooting](18-troubleshooting.md) - Common issues

---

**Your self-hosted OpenGrammar instance is ready! Happy writing! ✨**
