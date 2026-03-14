#!/bin/bash
# Cloudflare Pages Deployment Script
# Deploy OpenGrammar documentation to Cloudflare Pages

set -e  # Exit on error

echo "🌩️  Cloudflare Pages Deployment"
echo "================================"
echo ""

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}Wrangler CLI not found. Installing...${NC}"
    npm install -g wrangler
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}Not logged in to Cloudflare.${NC}"
    echo "Please login:"
    wrangler login
fi

# Get project name
PROJECT_NAME="opengrammar-docs"
echo -e "${BLUE}Project: ${PROJECT_NAME}${NC}"
echo ""

# Deploy
echo -e "${BLUE}Deploying to Cloudflare Pages...${NC}"
wrangler pages deploy . \
    --project-name=${PROJECT_NAME} \
    --branch=main \
    --commit-dirty=true

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🌐 Your site is live at:"
echo "   https://opengrammar-docs.pages.dev"
echo ""
echo -e "${YELLOW}Note: It may take a few minutes for the deployment to propagate globally.${NC}"
echo ""
