# OpenGrammar Release Checklist

## Pre-Release

### Code Quality
- [ ] All tests pass (`make test`)
- [ ] Linting passes (`make lint`)
- [ ] No TypeScript errors
- [ ] Code formatted with Prettier
- [ ] No console errors in development

### Documentation
- [ ] CHANGELOG.md updated with new changes
- [ ] README.md updated if features changed
- [ ] API documentation updated
- [ ] Setup guides reviewed and updated
- [ ] Migration guide written (if breaking changes)

### Testing
- [ ] Manual testing on Chrome
- [ ] Manual testing on Edge
- [ ] Test on popular websites (Gmail, Google Docs, Notion)
- [ ] Test offline functionality
- [ ] Test with multiple LLM providers
- [ ] Performance testing (memory, CPU usage)

### Version Bump
- [ ] Update version in extension manifest.json
- [ ] Update version in backend package.json
- [ ] Update version in CHANGELOG.md
- [ ] Tag commit with version (e.g., v1.1.0)

## Build & Release

### Extension Build
- [ ] Clean build (`rm -rf dist`)
- [ ] Build extension (`npm run build`)
- [ ] Verify dist folder contents
- [ ] Test loading unpacked extension
- [ ] Create ZIP for distribution

### Backend Build
- [ ] Build backend (`npm run build`)
- [ ] Test locally
- [ ] Deploy to staging environment
- [ ] Verify health endpoint
- [ ] Test all API endpoints

### GitHub Release
- [ ] Create release on GitHub
- [ ] Add release notes from CHANGELOG
- [ ] Upload extension ZIP asset
- [ ] Upload source code assets
- [ ] Mark as pre-release if needed

### Chrome Web Store (if applicable)
- [ ] Update store listing screenshots
- [ ] Update description if needed
- [ ] Upload new package
- [ ] Submit for review

## Post-Release

### Communication
- [ ] Announce on GitHub Discussions
- [ ] Update project website
- [ ] Social media announcement
- [ ] Email newsletter (if applicable)

### Monitoring
- [ ] Monitor error reports
- [ ] Check GitHub Issues for bugs
- [ ] Monitor backend error logs
- [ ] Track adoption metrics

### Follow-up
- [ ] Address critical bugs immediately
- [ ] Plan next release
- [ ] Update roadmap if needed
- [ ] Thank contributors

## Hotfix Process

For critical bugs discovered after release:

1. Create hotfix branch from release tag
2. Fix the issue
3. Add test for the fix
4. Bump patch version (e.g., 1.1.1)
5. Follow abbreviated release process
6. Merge fix back to main branch

---

**Release Cadence:**
- Major releases: Monthly
- Minor releases: Bi-weekly
- Patch releases: As needed for critical fixes

**Version Numbering:**
- MAJOR.MINOR.PATCH (Semantic Versioning)
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)
