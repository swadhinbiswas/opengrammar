# OpenGrammar Makefile
# Common development and deployment tasks

.PHONY: help install build dev test lint clean deploy-extension deploy-backend deploy-all

# Default target
help:
	@echo "OpenGrammar - Available Commands"
	@echo "================================"
	@echo ""
	@echo "Development:"
	@echo "  install         - Install all dependencies"
	@echo "  dev             - Start development servers"
	@echo "  dev-extension   - Start extension dev server"
	@echo "  dev-backend     - Start backend dev server"
	@echo "  build           - Build all projects"
	@echo "  build-extension - Build extension only"
	@echo "  build-backend   - Build backend only"
	@echo "  test            - Run tests"
	@echo "  lint            - Run linters"
	@echo "  lint-extension  - Lint extension code"
	@echo "  lint-backend    - Lint backend code"
	@echo "  format          - Format all code with Prettier"
	@echo "  clean           - Remove build artifacts"
	@echo ""
	@echo "Deployment:"
	@echo "  deploy-extension - Deploy extension to Chrome Web Store"
	@echo "  deploy-backend   - Deploy backend to Cloudflare Workers"
	@echo "  deploy-all       - Deploy everything"
	@echo ""
	@echo "Docker:"
	@echo "  docker-build    - Build Docker image"
	@echo "  docker-run      - Run Docker container"
	@echo "  docker-clean    - Remove Docker artifacts"

# Installation
install:
	@echo "Installing extension dependencies..."
	cd opengrammar/extension && npm install
	@echo "Installing backend dependencies..."
	cd opengrammar/backend && npm install
	@echo "Installation complete!"

# Development
dev:
	@echo "Starting all development servers..."
	@echo "Extension: http://localhost:5173"
	@echo "Backend: http://localhost:8787"
	cd opengrammar/extension && npm run dev &
	cd opengrammar/backend && npm run dev

dev-extension:
	cd opengrammar/extension && npm run dev

dev-backend:
	cd opengrammar/backend && npm run dev

# Building
build: build-extension build-backend

build-extension:
	@echo "Building extension..."
	cd opengrammar/extension && npm run build
	@echo "Extension built successfully!"

build-backend:
	@echo "Building backend..."
	cd opengrammar/backend && npm run build
	@echo "Backend built successfully!"

# Testing
test:
	@echo "Running tests..."
	cd opengrammar/backend && npm test

# Linting
lint: lint-extension lint-backend

lint-extension:
	@echo "Linting extension code..."
	cd opengrammar/extension && npx eslint . --ext .ts,.tsx

lint-backend:
	@echo "Linting backend code..."
	cd opengrammar/backend && npx eslint . --ext .ts

# Formatting
format:
	@echo "Formatting code..."
	npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"

# Cleaning
clean:
	@echo "Cleaning build artifacts..."
	rm -rf opengrammar/extension/dist
	rm -rf opengrammar/extension/node_modules
	rm -rf opengrammar/backend/dist
	rm -rf opengrammar/backend/node_modules
	rm -rf node_modules
	@echo "Clean complete!"

# Deployment
deploy-extension: build-extension
	@echo "Extension built. Load the dist folder in Chrome."
	@echo "1. Go to chrome://extensions/"
	@echo "2. Enable Developer Mode"
	@echo "3. Click 'Load unpacked' and select opengrammar/extension/dist"

deploy-backend:
	@echo "Deploying backend to Cloudflare Workers..."
	cd opengrammar/backend && npx wrangler deploy

deploy-all: build deploy-backend
	@echo "All deployments complete!"

# Docker
docker-build:
	@echo "Building Docker image..."
	docker build -t opengrammar-extension opengrammar/extension

docker-run:
	@echo "Running Docker container..."
	docker run -p 5173:5173 -v $(PWD)/opengrammar/extension:/app -v /app/node_modules opengrammar-extension

docker-clean:
	@echo "Removing Docker artifacts..."
	docker rmi opengrammar-extension || true
