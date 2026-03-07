#!/bin/bash
# OpenGrammar Production Deployment Script
# This script builds and deploys both the backend and extension

set -e  # Exit on error

echo "🪶 OpenGrammar Production Deployment"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo -e "${RED}Error: Bun is not installed${NC}"
    echo "Please install Bun: https://bun.sh"
    exit 1
fi

BUN_VERSION=$(bun -v)
echo -e "${BLUE}✓ Bun version $BUN_VERSION check passed${NC}"
echo ""

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Deploy Backend
echo "📦 Step 1: Deploying Backend to Cloudflare Workers"
echo "-------------------------------------------------"
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies with Bun..."
    bun install
fi

# Check if wrangler is logged in
if ! bun x wrangler whoami &> /dev/null; then
    echo -e "${RED}Error: Not logged in to Cloudflare${NC}"
    echo "Run: bun x wrangler login"
    exit 1
fi

echo "Deploying to production..."
DEPLOY_OUTPUT=$(bun x wrangler deploy --env production 2>&1)
echo "$DEPLOY_OUTPUT"

# Extract backend URL from deploy output
BACKEND_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.workers\.dev' | head -1)

if [ -z "$BACKEND_URL" ]; then
    echo -e "${RED}Error: Could not extract backend URL${NC}"
    echo "Please manually set the backend URL in the extension"
else
    echo -e "${GREEN}✓ Backend deployed to: $BACKEND_URL${NC}"
fi

echo ""

# Build Extension
echo "📦 Step 2: Building Chrome Extension"
echo "------------------------------------"
cd "$SCRIPT_DIR/extension"

if [ ! -d "node_modules" ]; then
    echo "Installing extension dependencies with Bun..."
    bun install
fi

echo "Building extension..."
bun run build

echo -e "${GREEN}✓ Extension built successfully${NC}"
echo ""

# Summary
echo "✅ Deployment Complete!"
echo "======================"
echo ""
echo "Backend URL: $BACKEND_URL"
echo ""
echo "Next steps:"
echo "1. Load the extension in Chrome:"
echo "   - Go to chrome://extensions/"
echo "   - Enable 'Developer mode'"
echo "   - Click 'Load unpacked'"
echo "   - Select: $SCRIPT_DIR/extension/dist"
echo ""
echo "2. Configure the extension:"
echo "   - Click the extension icon"
echo "   - Open Settings"
echo "   - Set Backend URL to: $BACKEND_URL"
echo "   - Add your OpenAI API key (optional)"
echo ""
echo -e "${GREEN}Happy writing with OpenGrammar!${NC}"
