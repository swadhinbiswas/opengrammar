#!/bin/bash
# OpenGrammar Deployment Script
# Deploy backend to multiple platforms

set -e

echo "🚀 OpenGrammar Deployment Script"
echo "================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "$1 is not installed. Please install it first."
        exit 1
    fi
}

# Check required commands
log_info "Checking required commands..."
check_command npm
check_command git

# Get deployment target
echo ""
echo "Select deployment target:"
echo "1) Cloudflare Workers"
echo "2) Vercel"
echo "3) Render"
echo "4) Railway"
echo "5) All platforms"
echo ""
read -p "Enter choice (1-5): " deployment_choice

# Build backend
log_info "Building backend..."
cd opengrammar/backend
npm install
npm run build

case $deployment_choice in
    1)
        log_info "Deploying to Cloudflare Workers..."
        check_command npx
        npx wrangler deploy --env production
        log_info "✅ Deployed to Cloudflare Workers"
        ;;
    2)
        log_info "Deploying to Vercel..."
        check_command vercel
        vercel --prod
        log_info "✅ Deployed to Vercel"
        ;;
    3)
        log_info "Deploying to Render..."
        git push render main
        log_info "✅ Deployed to Render"
        ;;
    4)
        log_info "Deploying to Railway..."
        check_command railway
        railway up
        log_info "✅ Deployed to Railway"
        ;;
    5)
        log_info "Deploying to all platforms..."
        
        # Cloudflare
        log_info "Deploying to Cloudflare Workers..."
        npx wrangler deploy --env production
        log_info "✅ Cloudflare Workers deployed"
        
        # Vercel
        log_info "Deploying to Vercel..."
        vercel --prod
        log_info "✅ Vercel deployed"
        
        # Render
        log_info "Deploying to Render..."
        git push render main
        log_info "✅ Render deployed"
        
        # Railway
        log_info "Deploying to Railway..."
        railway up
        log_info "✅ Railway deployed"
        
        log_info "🎉 All deployments complete!"
        ;;
    *)
        log_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

# Verify deployment
echo ""
log_info "Verifying deployment..."
sleep 5

# Health check (user should replace with actual URL)
echo ""
echo "📝 Next steps:"
echo "1. Copy your deployment URL"
echo "2. Update BACKEND_URL in extension/src/background/index.ts"
echo "3. Rebuild the extension"
echo "4. Test the health endpoint: https://your-url.com/health"
echo ""
log_info "Deployment complete! 🎉"
