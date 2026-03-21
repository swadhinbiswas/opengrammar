// Documentation Content - All pages converted from Markdown to HTML

const documentationContent = {
    'index': `
        <article class="content-section active" id="index">
            <div class="section-header">
                <h1>📚 OpenGrammar Documentation</h1>
                <p class="section-description">Welcome to the complete documentation for OpenGrammar - your privacy-first, open-source writing assistant.</p>
            </div>
            <div class="content-body">
                <div class="callout callout-primary">
                    <div class="callout-icon">🚀</div>
                    <div class="callout-content">
                        <strong>Quick Start</strong>
                        <p>Get up and running in 5 minutes! See <a href="#quick-start">Quick Start Guide</a>.</p>
                    </div>
                </div>

                <h2>📖 Table of Contents</h2>
                
                <h3>Getting Started</h3>
                <ul>
                    <li><a href="#quick-start">Quick Start</a> - Get up and running in 5 minutes</li>
                </ul>

                <h3>Installation & Setup</h3>
                <ul>
                    <li><a href="#browser-setup">Browser Extension Setup</a> - Chrome, Brave, Edge, Firefox</li>
                    <li><a href="#backend-deployment">Backend Deployment</a> - Complete deployment guide</li>
                    <li><a href="#docker-self-hosting">Docker Self-Hosting</a> - Run locally with Docker</li>
                </ul>

                <h3>Configuration</h3>
                <ul>
                    <li><a href="#ai-providers">AI Provider Setup</a> - Configure Groq, OpenAI, OpenRouter, Together, Ollama</li>
                </ul>

                <h3>User Guide</h3>
                <ul>
                    <li><a href="#using-opengrammar">Using OpenGrammar</a> - Daily usage guide</li>
                    <li><a href="#tone-rewriting">Tone Rewriting</a> - Rewrite text in different tones</li>
                    <li><a href="#writing-statistics">Writing Statistics</a> - Analyze your writing</li>
                    <li><a href="#keyboard-shortcuts">Keyboard Shortcuts</a> - All shortcuts reference</li>
                </ul>

                <h3>Support</h3>
                <ul>
                    <li><a href="#troubleshooting">Troubleshooting</a> - Common issues and solutions</li>
                    <li><a href="#faq">FAQ</a> - Frequently asked questions</li>
                    <li><a href="#api-reference">API Reference</a> - Backend API documentation</li>
                </ul>

                <h2>🚀 Quick Links</h2>
                
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>I want to...</th>
                                <th>Go to...</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Install the extension</td>
                                <td><a href="#browser-setup">Browser Extension Setup</a></td>
                            </tr>
                            <tr>
                                <td>Deploy the backend</td>
                                <td><a href="#backend-deployment">Backend Deployment</a></td>
                            </tr>
                            <tr>
                                <td>Configure AI providers</td>
                                <td><a href="#ai-providers">AI Provider Setup</a></td>
                            </tr>
                            <tr>
                                <td>Use tone rewriting</td>
                                <td><a href="#tone-rewriting">Tone Rewriting</a></td>
                            </tr>
                            <tr>
                                <td>Report a bug</td>
                                <td><a href="https://github.com/swadhinbiswas/opengrammar/issues" target="_blank">GitHub Issues</a></td>
                            </tr>
                            <tr>
                                <td>Suggest a feature</td>
                                <td><a href="https://github.com/swadhinbiswas/opengrammar/discussions" target="_blank">GitHub Discussions</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>📞 Support</h2>
                <ul>
                    <li><strong>GitHub Issues</strong>: <a href="https://github.com/swadhinbiswas/opengrammar/issues" target="_blank">Report bugs or request features</a></li>
                    <li><strong>GitHub Discussions</strong>: <a href="https://github.com/swadhinbiswas/opengrammar/discussions" target="_blank">Ask questions and discuss ideas</a></li>
                </ul>

                <div class="section-nav">
                    <a href="#" class="next-link" onclick="showSection('quick-start'); return false;">
                        <span>Next: Quick Start</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'quick-start': `
        <article class="content-section" id="quick-start">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Getting Started</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Quick Start</span>
                </nav>
                <h1>🚀 Quick Start</h1>
                <p class="section-description">Get OpenGrammar up and running in 5 minutes!</p>
            </div>
            <div class="content-body">
                <div class="callout callout-primary">
                    <div class="callout-icon">⚡</div>
                    <div class="callout-content">
                        <strong>5-Minute Setup</strong>
                        <p>Follow these steps to get OpenGrammar running quickly.</p>
                    </div>
                </div>

                <h2 id="step-1-get-api-key">Step 1: Get Your API Key (Optional but Recommended)</h2>
                <p>For the best grammar checking experience, you'll need an API key. We recommend <strong>Groq</strong> for its free tier:</p>
                
                <ol class="step-list">
                    <li>Visit <a href="https://console.groq.com" target="_blank">Groq Console</a></li>
                    <li>Sign up / Log in</li>
                    <li>Go to <strong>API Keys</strong> → <strong>Create API Key</strong></li>
                    <li>Copy your key (starts with <code>gsk_</code>)</li>
                </ol>

                <div class="callout callout-success">
                    <div class="callout-icon">✅</div>
                    <div class="callout-content">
                        <strong>Free Tier:</strong> 100 requests/day - enough for most users!
                    </div>
                </div>

                <h2 id="step-2-build-extension">Step 2: Build the Extension</h2>
                
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-lang">bash</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                            </svg>
                            Copy
                        </button>
                    </div>
                    <pre><code class="language-bash"># Clone the repository
git clone https://github.com/swadhinbiswas/opengrammar.git
cd opengrammar/opengrammar/extension

# Install dependencies
bun install

# Build the extension
bun run build</code></pre>
                </div>

                <h2 id="step-3-load-browser">Step 3: Load in Your Browser</h2>

                <h3>Chrome / Brave / Edge</h3>
                <ol class="step-list">
                    <li>Open <code>chrome://extensions/</code> (or <code>brave://extensions/</code> / <code>edge://extensions/</code>)</li>
                    <li>Enable <strong>Developer mode</strong> (toggle in top-right)</li>
                    <li>Click <strong>Load unpacked</strong></li>
                    <li>Select the <code>opengrammar/extension/dist</code> folder</li>
                    <li>✅ Extension loaded! You'll see the OpenGrammar icon</li>
                </ol>

                <h3>Firefox</h3>
                <ol class="step-list">
                    <li>Open <code>about:debugging#/runtime/this-firefox</code></li>
                    <li>Click <strong>Load Temporary Add-on</strong></li>
                    <li>Navigate to <code>opengrammar/extension/dist</code></li>
                    <li>Select <code>manifest.json</code></li>
                    <li>✅ Extension loaded!</li>
                </ol>

                <h2 id="step-4-configure">Step 4: Configure</h2>
                <ol class="step-list">
                    <li>Click the OpenGrammar icon in your toolbar</li>
                    <li>Click <strong>Settings</strong> (gear icon)</li>
                    <li>Enter your API key (from Step 1)</li>
                    <li>Select Provider: <strong>Groq</strong></li>
                    <li>Select Model: <strong>llama-3.1-70b-versatile</strong></li>
                    <li>Backend URL: <code>http://localhost:8787</code> (for local testing)</li>
                </ol>

                <h2 id="step-5-start-writing">Step 5: Start Writing!</h2>
                <ol class="step-list">
                    <li>Open any text box (Gmail, Google Docs, Notion, etc.)</li>
                    <li>Type something with a grammar error: <code>me and him went to store</code></li>
                    <li>You'll see a <span style="color: var(--red-500); font-weight: 600;">red underline</span> under the error</li>
                    <li>Click it to see the suggestion: <code>he and I went to store</code></li>
                    <li>Click <strong>Apply</strong> to fix it!</li>
                </ol>

                <div class="section-nav">
                    <a href="#index" class="prev-link" onclick="showSection('index'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#browser-setup" class="next-link" onclick="showSection('browser-setup'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'browser-setup': `
        <article class="content-section" id="browser-setup">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Installation</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Browser Extension</span>
                </nav>
                <h1>🌐 Browser Extension Setup</h1>
                <p class="section-description">Install and configure OpenGrammar on Chrome, Brave, Edge, and Firefox.</p>
            </div>
            <div class="content-body">
                <h2>📋 Supported Browsers</h2>
                
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Browser</th>
                                <th>Version</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Google Chrome</strong></td>
                                <td>88+</td>
                                <td><span style="color: var(--green-600);">✅ Fully Supported</span></td>
                            </tr>
                            <tr>
                                <td><strong>Brave</strong></td>
                                <td>1.20+</td>
                                <td><span style="color: var(--green-600);">✅ Fully Supported</span></td>
                            </tr>
                            <tr>
                                <td><strong>Microsoft Edge</strong></td>
                                <td>88+</td>
                                <td><span style="color: var(--green-600);">✅ Fully Supported</span></td>
                            </tr>
                            <tr>
                                <td><strong>Mozilla Firefox</strong></td>
                                <td>90+</td>
                                <td><span style="color: var(--amber-600);">⚠️ Temporary Support</span></td>
                            </tr>
                            <tr>
                                <td><strong>Opera</strong></td>
                                <td>74+</td>
                                <td><span style="color: var(--green-600);">✅ Supported</span></td>
                            </tr>
                            <tr>
                                <td><strong>Vivaldi</strong></td>
                                <td>3.6+</td>
                                <td><span style="color: var(--green-600);">✅ Supported</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>🔧 Installation - Chrome</h2>
                
                <h3>Step 1: Build the Extension</h3>
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-lang">bash</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                            </svg>
                            Copy
                        </button>
                    </div>
                    <pre><code class="language-bash"># Navigate to extension folder
cd opengrammar/opengrammar/extension

# Install dependencies
bun install

# Build for production
bun run build</code></pre>
                </div>

                <h3>Step 2: Load in Chrome</h3>
                <ol class="step-list">
                    <li>Open Chrome</li>
                    <li>Navigate to <code>chrome://extensions/</code></li>
                    <li>Enable <strong>Developer mode</strong> (toggle in top-right corner)</li>
                    <li>Click <strong>Load unpacked</strong></li>
                    <li>Select the <code>opengrammar/extension/dist</code> folder</li>
                    <li>✅ Extension loaded!</li>
                </ol>

                <h2>⚙️ Initial Configuration</h2>
                
                <ol class="step-list">
                    <li>Click the OpenGrammar icon in your toolbar</li>
                    <li>Click <strong>Settings</strong> (gear icon)</li>
                    <li>Enter your backend URL</li>
                    <li>Select AI Provider and enter API key</li>
                    <li>Click <strong>Save</strong></li>
                </ol>

                <div class="provider-cards">
                    <div class="provider-card-large">
                        <div class="provider-header">
                            <span class="provider-icon">⚡</span>
                            <h3>Groq (Free)</h3>
                        </div>
                        <p class="provider-desc">100 requests/day free. Fast inference with Llama 3.1 70B.</p>
                    </div>
                    <div class="provider-card-large">
                        <div class="provider-header">
                            <span class="provider-icon">🟢</span>
                            <h3>OpenAI</h3>
                        </div>
                        <p class="provider-desc">Best quality with GPT-4o-mini. ~$0.15 per 1K requests.</p>
                    </div>
                    <div class="provider-card-large">
                        <div class="provider-header">
                            <span class="provider-icon">🦙</span>
                            <h3>Ollama</h3>
                        </div>
                        <p class="provider-desc">Run models locally. 100% offline and private.</p>
                    </div>
                </div>

                <div class="section-nav">
                    <a href="#quick-start" class="prev-link" onclick="showSection('quick-start'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#backend-deployment" class="next-link" onclick="showSection('backend-deployment'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'backend-deployment': `
        <article class="content-section" id="backend-deployment">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Installation</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Backend Deployment</span>
                </nav>
                <h1>🌐 Backend Deployment</h1>
                <p class="section-description">Deploy OpenGrammar backend to production with any of these platforms.</p>
            </div>
            <div class="content-body">
                <h2>📋 Overview</h2>
                
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Platform</th>
                                <th>Free Tier</th>
                                <th>Setup Time</th>
                                <th>Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Cloudflare Workers</strong></td>
                                <td>100K req/day</td>
                                <td>5 min</td>
                                <td>Production, global CDN</td>
                            </tr>
                            <tr>
                                <td><strong>Vercel</strong></td>
                                <td>100GB-hours/mo</td>
                                <td>5 min</td>
                                <td>Easy deployment</td>
                            </tr>
                            <tr>
                                <td><strong>Railway</strong></td>
                                <td>$5 credit</td>
                                <td>10 min</td>
                                <td>Always-on, no sleep</td>
                            </tr>
                            <tr>
                                <td><strong>Render</strong></td>
                                <td>750 hours/mo</td>
                                <td>10 min</td>
                                <td>Simple web service</td>
                            </tr>
                            <tr>
                                <td><strong>Docker</strong></td>
                                <td>Free</td>
                                <td>15 min</td>
                                <td>Self-hosting, full control</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>☁️ Cloudflare Workers (Recommended)</h2>
                
                <h3>Step 1: Install Wrangler CLI</h3>
                <div class="code-block">
                    <pre><code class="language-bash">npm install -g wrangler</code></pre>
                </div>

                <h3>Step 2: Login to Cloudflare</h3>
                <div class="code-block">
                    <pre><code class="language-bash">wrangler login</code></pre>
                </div>

                <h3>Step 3: Deploy</h3>
                <div class="code-block">
                    <pre><code class="language-bash">cd opengrammar/opengrammar/backend
wrangler deploy --env production</code></pre>
                </div>

                <h3>Step 4: Get Your URL</h3>
                <p>After deployment, you'll see:</p>
                <div class="code-block">
                    <pre><code>Deployed https://opengrammar.yourname.workers.dev</code></pre>
                </div>

                <h2>▲ Vercel</h2>
                
                <div class="code-block">
                    <pre><code class="language-bash">npm install -g vercel
cd opengrammar/opengrammar/backend
vercel --prod</code></pre>
                </div>

                <h2>🚂 Railway</h2>
                
                <div class="code-block">
                    <pre><code class="language-bash">npm install -g @railway/cli
cd opengrammar/opengrammar/backend
railway init
railway up</code></pre>
                </div>

                <h2>🐳 Docker</h2>
                
                <div class="code-block">
                    <pre><code class="language-bash">cd opengrammar/opengrammar
docker-compose up -d opengrammar-backend</code></pre>
                </div>

                <div class="section-nav">
                    <a href="#browser-setup" class="prev-link" onclick="showSection('browser-setup'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#docker-self-hosting" class="next-link" onclick="showSection('docker-self-hosting'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'docker-self-hosting': `
        <article class="content-section" id="docker-self-hosting">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Installation</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Docker Self-Hosting</span>
                </nav>
                <h1>🐳 Docker Self-Hosting</h1>
                <p class="section-description">Run OpenGrammar locally with Docker and optional local LLM support (Ollama).</p>
            </div>
            <div class="content-body">
                <div class="callout callout-primary">
                    <div class="callout-icon">🎯</div>
                    <div class="callout-content">
                        <strong>Why Self-Host with Docker?</strong>
                        <ul>
                            <li><strong>Complete Privacy:</strong> All data stays on your machine</li>
                            <li><strong>Free:</strong> No API costs (with local LLM)</li>
                            <li><strong>Offline:</strong> Works without internet</li>
                            <li><strong>Full Control:</strong> Customize everything</li>
                        </ul>
                    </div>
                </div>

                <h2>🚀 Quick Start</h2>
                
                <div class="code-block">
                    <pre><code class="language-bash">cd opengrammar/opengrammar

# Start backend only
docker-compose up -d opengrammar-backend

# Start with Ollama (local LLM)
docker-compose --profile local-llm up -d</code></pre>
                </div>

                <h2>🤖 Local LLM Setup with Ollama</h2>
                
                <h3>Step 1: Start Ollama Container</h3>
                <div class="code-block">
                    <pre><code class="language-bash">docker-compose --profile local-llm up -d ollama</code></pre>
                </div>

                <h3>Step 2: Pull Grammar-Focused Models</h3>
                <div class="code-block">
                    <pre><code class="language-bash">docker exec -it opengrammar-ollama bash
ollama pull qwen2.5:0.5b      # Ultra fast, 400MB
ollama pull qwen2.5:1.5b      # Balanced, 1GB
ollama pull phi4-mini:3.8b    # Great quality, 2.5GB
ollama pull llama3.2:3b       # Good all-rounder, 2GB</code></pre>
                </div>

                <h2>🎯 Model Recommendations</h2>
                
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Size</th>
                                <th>RAM</th>
                                <th>Speed</th>
                                <th>Quality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>qwen2.5:0.5b</strong></td>
                                <td>400MB</td>
                                <td>1GB</td>
                                <td>⚡⚡⚡⚡⚡</td>
                                <td>⭐⭐⭐</td>
                            </tr>
                            <tr>
                                <td><strong>qwen2.5:1.5b</strong></td>
                                <td>1GB</td>
                                <td>2GB</td>
                                <td>⚡⚡⚡⚡</td>
                                <td>⭐⭐⭐⭐</td>
                            </tr>
                            <tr>
                                <td><strong>phi4-mini:3.8b</strong></td>
                                <td>2.5GB</td>
                                <td>4GB</td>
                                <td>⚡⚡⚡</td>
                                <td>⭐⭐⭐⭐⭐</td>
                            </tr>
                            <tr>
                                <td><strong>llama3.2:3b</strong></td>
                                <td>2GB</td>
                                <td>3GB</td>
                                <td>⚡⚡⚡⚡</td>
                                <td>⭐⭐⭐⭐</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section-nav">
                    <a href="#backend-deployment" class="prev-link" onclick="showSection('backend-deployment'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#ai-providers" class="next-link" onclick="showSection('ai-providers'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'ai-providers': `
        <article class="content-section" id="ai-providers">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Configuration</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">AI Providers</span>
                </nav>
                <h1>🤖 AI Provider Setup</h1>
                <p class="section-description">Configure AI providers for advanced grammar checking and tone rewriting.</p>
            </div>
            <div class="content-body">
                <h2>📋 Overview</h2>
                <p>OpenGrammar supports <strong>6 AI providers</strong>, giving you flexibility in cost, quality, and privacy.</p>

                <div class="provider-cards">
                    <div class="provider-card-large">
                        <div class="provider-header">
                            <span class="provider-icon">⚡</span>
                            <h3>Groq</h3>
                        </div>
                        <div class="provider-stats">
                            <div class="stat"><span>Speed:</span> ⚡⚡⚡</div>
                            <div class="stat"><span>Quality:</span> ⭐⭐⭐⭐</div>
                            <div class="stat"><span>Cost:</span> Free tier</div>
                        </div>
                        <p class="provider-desc">Fast & free - 100 requests/day</p>
                    </div>
                    <div class="provider-card-large">
                        <div class="provider-header">
                            <span class="provider-icon">🟢</span>
                            <h3>OpenAI</h3>
                        </div>
                        <div class="provider-stats">
                            <div class="stat"><span>Speed:</span> ⚡⚡</div>
                            <div class="stat"><span>Quality:</span> ⭐⭐⭐⭐⭐</div>
                            <div class="stat"><span>Cost:</span> $$</div>
                        </div>
                        <p class="provider-desc">Best quality - GPT-4o-mini</p>
                    </div>
                    <div class="provider-card-large">
                        <div class="provider-header">
                            <span class="provider-icon">🦙</span>
                            <h3>Ollama</h3>
                        </div>
                        <div class="provider-stats">
                            <div class="stat"><span>Speed:</span> ⚡⚡⚡</div>
                            <div class="stat"><span>Quality:</span> ⭐⭐⭐</div>
                            <div class="stat"><span>Cost:</span> Free</div>
                        </div>
                        <p class="provider-desc">Privacy, offline - Local LLM</p>
                    </div>
                </div>

                <h2>⚡ Groq (Recommended - Free)</h2>
                
                <ol class="step-list">
                    <li>Visit <a href="https://console.groq.com" target="_blank">Groq Console</a></li>
                    <li>Sign up / Log in</li>
                    <li>Go to <strong>API Keys</strong> → <strong>Create API Key</strong></li>
                    <li>Copy the key (starts with <code>gsk_</code>)</li>
                    <li>In OpenGrammar: Provider → Groq, Model → llama-3.1-70b-versatile</li>
                </ol>

                <h2>🟢 OpenAI (Best Quality)</h2>
                
                <ol class="step-list">
                    <li>Visit <a href="https://platform.openai.com" target="_blank">OpenAI Platform</a></li>
                    <li>Sign up and add payment method</li>
                    <li>Go to <strong>API Keys</strong> → <strong>Create new secret key</strong></li>
                    <li>Copy the key (starts with <code>sk-</code>)</li>
                    <li>In OpenGrammar: Provider → OpenAI, Model → gpt-4o-mini</li>
                </ol>

                <h2>🦙 Ollama (Local - Offline)</h2>
                
                <ol class="step-list">
                    <li>Install Ollama from <a href="https://ollama.com" target="_blank">ollama.com</a></li>
                    <li>Run: <code>ollama pull qwen2.5:1.5b</code></li>
                    <li>In OpenGrammar: Provider → Ollama (Local)</li>
                    <li>Base URL: <code>http://localhost:11434/v1</code></li>
                    <li>Model: <code>qwen2.5:1.5b</code></li>
                </ol>

                <div class="section-nav">
                    <a href="#docker-self-hosting" class="prev-link" onclick="showSection('docker-self-hosting'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#using-opengrammar" class="next-link" onclick="showSection('using-opengrammar'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'using-opengrammar': `
        <article class="content-section" id="using-opengrammar">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>User Guide</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Using OpenGrammar</span>
                </nav>
                <h1>📖 Using OpenGrammar</h1>
                <p class="section-description">Complete user guide to all features and functionality.</p>
            </div>
            <div class="content-body">
                <h2>✍️ Grammar Checking</h2>
                
                <h3>Color-Coded Underlines</h3>
                <div style="display: flex; flex-direction: column; gap: 12px; margin: 24px 0;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--red-400), var(--red-500)); border: 2px solid var(--paper-border);"></div>
                        <div>
                            <strong>Red</strong>
                            <div style="color: var(--paper-text-muted); font-size: 14px;">Spelling/Grammar errors</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--amber-400), var(--amber-500)); border: 2px solid var(--paper-border);"></div>
                        <div>
                            <strong>Amber</strong>
                            <div style="color: var(--paper-text-muted); font-size: 14px;">Clarity issues</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--blue-400), var(--blue-500)); border: 2px solid var(--paper-border);"></div>
                        <div>
                            <strong>Blue</strong>
                            <div style="color: var(--paper-text-muted); font-size: 14px;">Style suggestions</div>
                        </div>
                    </div>
                </div>

                <h3>Using Grammar Checking</h3>
                <ol class="step-list">
                    <li><strong>Start Typing</strong> - Open any text input (Gmail, Google Docs, Notion, etc.)</li>
                    <li><strong>Watch for Underlines</strong> - As you type, OpenGrammar automatically checks</li>
                    <li><strong>Review Suggestions</strong> - Click any underlined text to see suggestions</li>
                    <li><strong>Apply Changes</strong> - Click Apply, Ignore, or Add to Dictionary</li>
                </ol>

                <h2>🎨 Tone Rewriting</h2>
                
                <div class="tone-grid">
                    <div class="tone-card">
                        <span class="tone-emoji">🎩</span>
                        <h4>Formal</h4>
                        <p>Business, academic</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">😊</span>
                        <h4>Casual</h4>
                        <p>Friends, chat</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">💼</span>
                        <h4>Professional</h4>
                        <p>Work emails</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">🤗</span>
                        <h4>Friendly</h4>
                        <p>Social media</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">⚡</span>
                        <h4>Concise</h4>
                        <p>Quick messages</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">📚</span>
                        <h4>Detailed</h4>
                        <p>Explanations</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">💪</span>
                        <h4>Persuasive</h4>
                        <p>Sales, pitches</p>
                    </div>
                    <div class="tone-card">
                        <span class="tone-emoji">😐</span>
                        <h4>Neutral</h4>
                        <p>General use</p>
                    </div>
                </div>

                <div class="section-nav">
                    <a href="#ai-providers" class="prev-link" onclick="showSection('ai-providers'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#tone-rewriting" class="next-link" onclick="showSection('tone-rewriting'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'tone-rewriting': `
        <article class="content-section" id="tone-rewriting">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>User Guide</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Tone Rewriting</span>
                </nav>
                <h1>🎨 Tone Rewriting</h1>
                <p class="section-description">Master the art of rewriting text in different tones.</p>
            </div>
            <div class="content-body">
                <h2>🚀 How to Use</h2>
                
                <h3>Method 1: Right-Click Menu</h3>
                <ol class="step-list">
                    <li>Select text you want to rewrite</li>
                    <li>Right-click</li>
                    <li>Choose "Rewrite with OpenGrammar"</li>
                    <li>Choose tone and see preview</li>
                    <li>Apply or Copy result</li>
                </ol>

                <h3>Method 2: Keyboard Shortcut</h3>
                <ol class="step-list">
                    <li>Select text</li>
                    <li>Press <kbd>Ctrl+Shift+R</kbd> (Windows/Linux) or <kbd>Cmd+Shift+R</kbd> (Mac)</li>
                    <li>Choose tone</li>
                    <li>Apply changes</li>
                </ol>

                <h2>💡 Best Practices</h2>
                
                <div class="callout callout-success">
                    <div class="callout-icon">✅</div>
                    <div class="callout-content">
                        <strong>Do's</strong>
                        <ul>
                            <li>Select complete thoughts (full sentences work best)</li>
                            <li>Review before applying changes</li>
                            <li>Try multiple tones to compare</li>
                            <li>Use context-appropriate tones</li>
                        </ul>
                    </div>
                </div>

                <div class="callout callout-warning">
                    <div class="callout-icon">❌</div>
                    <div class="callout-content">
                        <strong>Don'ts</strong>
                        <ul>
                            <li>Don't rewrite single words (select phrases)</li>
                            <li>Don't overuse (keep your voice)</li>
                            <li>Don't apply blindly (review changes)</li>
                            <li>Don't mix inappropriate tones</li>
                        </ul>
                    </div>
                </div>

                <div class="section-nav">
                    <a href="#using-opengrammar" class="prev-link" onclick="showSection('using-opengrammar'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#writing-statistics" class="next-link" onclick="showSection('writing-statistics'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'writing-statistics': `
        <article class="content-section" id="writing-statistics">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>User Guide</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Writing Statistics</span>
                </nav>
                <h1>📊 Writing Statistics</h1>
                <p class="section-description">Analyze and improve your writing with detailed statistics.</p>
            </div>
            <div class="content-body">
                <h2>📈 Available Metrics</h2>
                
                <h3>Readability Scores</h3>
                
                <h4>Flesch Reading Ease Score</h4>
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Level</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>90-100</td><td>Very Easy</td><td>5th grade</td></tr>
                            <tr><td>80-89</td><td>Easy</td><td>6th grade</td></tr>
                            <tr><td>70-79</td><td>Fairly Easy</td><td>7th grade</td></tr>
                            <tr><td>60-69</td><td>Standard</td><td>8th-9th grade</td></tr>
                            <tr><td>50-59</td><td>Fairly Difficult</td><td>10th-12th</td></tr>
                            <tr><td>30-49</td><td>Difficult</td><td>College</td></tr>
                            <tr><td>0-29</td><td>Very Difficult</td><td>Graduate+</td></tr>
                        </tbody>
                    </table>
                </div>

                <h4>Flesch-Kincaid Grade Level</h4>
                <ul>
                    <li>1-6: Elementary School</li>
                    <li>7-9: Middle School</li>
                    <li>10-12: High School</li>
                    <li>13-16: College</li>
                    <li>17+: Graduate School</li>
                </ul>

                <h3>Time Estimates</h3>
                <ul>
                    <li><strong>Reading Time:</strong> Words ÷ 200 words per minute</li>
                    <li><strong>Speaking Time:</strong> Words ÷ 150 words per minute</li>
                </ul>

                <div class="section-nav">
                    <a href="#tone-rewriting" class="prev-link" onclick="showSection('tone-rewriting'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#keyboard-shortcuts" class="next-link" onclick="showSection('keyboard-shortcuts'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'keyboard-shortcuts': `
        <article class="content-section" id="keyboard-shortcuts">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>User Guide</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Keyboard Shortcuts</span>
                </nav>
                <h1>⌨️ Keyboard Shortcuts</h1>
                <p class="section-description">All keyboard shortcuts for quick access to OpenGrammar features.</p>
            </div>
            <div class="content-body">
                <h2>Default Shortcuts</h2>
                
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Windows/Linux</th>
                                <th>Mac</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Rewrite Selected Text</strong></td>
                                <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd></td>
                                <td><kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd></td>
                            </tr>
                            <tr>
                                <td><strong>Toggle Extension</strong></td>
                                <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd></td>
                                <td><kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd></td>
                            </tr>
                            <tr>
                                <td><strong>Open Statistics</strong></td>
                                <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd></td>
                                <td><kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd></td>
                            </tr>
                            <tr>
                                <td><strong>Open Settings</strong></td>
                                <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd></td>
                                <td><kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section-nav">
                    <a href="#writing-statistics" class="prev-link" onclick="showSection('writing-statistics'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#troubleshooting" class="next-link" onclick="showSection('troubleshooting'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'troubleshooting': `
        <article class="content-section" id="troubleshooting">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Support</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">Troubleshooting</span>
                </nav>
                <h1>🔧 Troubleshooting</h1>
                <p class="section-description">Solve common OpenGrammar issues with this comprehensive guide.</p>
            </div>
            <div class="content-body">
                <h2>🔍 Common Issues</h2>
                
                <h3>No Grammar Highlights</h3>
                <div class="callout callout-info">
                    <div class="callout-icon">💡</div>
                    <div class="callout-content">
                        <strong>Solutions:</strong>
                        <ol>
                            <li>Check extension is enabled</li>
                            <li>Verify site is not in disabled domains</li>
                            <li>Test backend: <code>curl http://localhost:8787/health</code></li>
                            <li>Reload the page</li>
                            <li>Check browser console (F12) for errors</li>
                        </ol>
                    </div>
                </div>

                <h3>Backend Connection Failed</h3>
                <div class="callout callout-warning">
                    <div class="callout-icon">⚠️</div>
                    <div class="callout-content">
                        <strong>Solutions:</strong>
                        <ol>
                            <li>Verify Backend URL in settings</li>
                            <li>Test backend: <code>curl your-backend-url/health</code></li>
                            <li>Check CORS configuration</li>
                            <li>Restart backend service</li>
                        </ol>
                    </div>
                </div>

                <h3>AI Not Working</h3>
                <div class="callout callout-info">
                    <div class="callout-icon">🤖</div>
                    <div class="callout-content">
                        <strong>Solutions:</strong>
                        <ol>
                            <li>Verify API key is entered correctly</li>
                            <li>Check for typos (no spaces)</li>
                            <li>Ensure correct provider is selected</li>
                            <li>Check rate limits (Groq: 100/day free)</li>
                        </ol>
                    </div>
                </div>

                <div class="section-nav">
                    <a href="#keyboard-shortcuts" class="prev-link" onclick="showSection('keyboard-shortcuts'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#faq" class="next-link" onclick="showSection('faq'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'faq': `
        <article class="content-section" id="faq">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Support</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">FAQ</span>
                </nav>
                <h1>❓ Frequently Asked Questions</h1>
                <p class="section-description">Common questions about OpenGrammar answered.</p>
            </div>
            <div class="content-body">
                <div class="faq-list">
                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>Is OpenGrammar really free?</h3>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="faq-answer">
                            <p><strong>Yes!</strong> OpenGrammar is 100% free and open-source. The rule-based grammar checker works completely free offline. For AI features, you bring your own API key and pay only for what you use directly to the provider.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>How does OpenGrammar protect my privacy?</h3>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="faq-answer">
                            <p>OpenGrammar has no databases, no user accounts, and no tracking. Your API key never leaves your browser. The rule-based engine runs 100% locally. When using AI features, text is sent directly to your chosen provider through a stateless edge function.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>Which AI provider should I use?</h3>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="faq-answer">
                            <p><strong>For free usage:</strong> Groq (100 requests/day free)<br>
                            <strong>For best quality:</strong> OpenAI GPT-4o-mini<br>
                            <strong>For privacy:</strong> Ollama (run models locally)</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>Does it work offline?</h3>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="faq-answer">
                            <p><strong>Yes!</strong> The rule-based grammar checker works completely offline. For AI features, you can use Ollama to run models locally on your machine for full offline capability.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>What websites does it work on?</h3>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="faq-answer">
                            <p>OpenGrammar works on most websites with text inputs: Gmail, Google Docs, Notion, Twitter/X, Facebook, LinkedIn, Reddit, and any custom text box.</p>
                        </div>
                    </div>
                </div>

                <div class="section-nav">
                    <a href="#troubleshooting" class="prev-link" onclick="showSection('troubleshooting'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                    <a href="#api-reference" class="next-link" onclick="showSection('api-reference'); return false;">
                        <span>Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `,

    'api-reference': `
        <article class="content-section" id="api-reference">
            <div class="section-header">
                <nav class="breadcrumb">
                    <a href="#index">Docs</a>
                    <span class="breadcrumb-sep">/</span>
                    <span>Support</span>
                    <span class="breadcrumb-sep">/</span>
                    <span class="current">API Reference</span>
                </nav>
                <h1>📚 API Reference</h1>
                <p class="section-description">Backend API documentation for developers.</p>
            </div>
            <div class="content-body">
                <h2>Endpoints</h2>
                
                <h3>Health Check</h3>
                <div class="api-endpoint">
                    <div class="api-method get">GET</div>
                    <code class="api-path">/health</code>
                </div>
                <p>Returns the health status of the backend service.</p>
                
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-lang">bash</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                            </svg>
                            Copy
                        </button>
                    </div>
                    <pre><code class="language-bash">curl http://localhost:8787/health</code></pre>
                </div>

                <h4>Response</h4>
                <div class="code-block">
                    <pre><code class="language-json">{
  "status": "healthy",
  "timestamp": "2026-03-20T12:00:00.000Z",
  "environment": "production",
  "version": "2.1.0"
}</code></pre>
                </div>

                <h3>Analyze Text</h3>
                <div class="api-endpoint">
                    <div class="api-method post">POST</div>
                    <code class="api-path">/analyze</code>
                </div>
                <p>Analyze text for grammar, spelling, clarity, and style issues.</p>
                
                <div class="code-block">
                    <pre><code class="language-bash">curl -X POST http://localhost:8787/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "me and him went to store",
    "apiKey": "your-api-key",
    "provider": "groq",
    "model": "llama-3.1-70b-versatile"
  }'</code></pre>
                </div>

                <h3>Rewrite Text</h3>
                <div class="api-endpoint">
                    <div class="api-method post">POST</div>
                    <code class="api-path">/rewrite</code>
                </div>
                <p>Rewrite text in different tones.</p>
                
                <div class="code-block">
                    <pre><code class="language-bash">curl -X POST http://localhost:8787/rewrite \
  -H "Content-Type: application/json" \
  -d '{
    "text": "hey whats up",
    "tone": "formal",
    "apiKey": "your-api-key"
  }'</code></pre>
                </div>

                <div class="section-nav">
                    <a href="#faq" class="prev-link" onclick="showSection('faq'); return false;">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span>Previous</span>
                    </a>
                </div>
            </div>
        </article>
    `
};
