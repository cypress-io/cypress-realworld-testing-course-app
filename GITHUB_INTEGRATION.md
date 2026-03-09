# GitHub Actions Integration Guide

This document explains how to integrate the AI QA Assistant with GitHub Actions for automated test fixing in your CI/CD pipeline.

## Current Status

✅ **Verified locally on your machine**
- Ollama service: Running and functional
- Models: `deepseek-coder` and `llama2` available
- Test suite: Working with AI fixes
- All systems tested and operational

## Implementation Strategy

### Phase 1: GitHub Actions Basic Integration (Ready Now)

The basic workflow (`.github/workflows/cypress-tests.yml`) is ready and includes:

1. **Automated Test Running**
   - Runs on every push to `main`/`develop`
   - Runs on all pull requests
   - Generates mochawesome HTML reports
   - Uploads artifacts for 30 days

2. **Test Result Reporting**
   - Comments on PRs with test results
   - Uploads screenshots on failure
   - Shows passing/failing test counts

3. **Manual AI Fix Process (Local)**
   - You run locally: `npx ts-node ai/ollamaFix.ts <test-file>`
   - Review the fix
   - Commit and push

**To deploy Phase 1:**
```bash
git add .github/workflows/cypress-tests.yml
git commit -m "ci: add Cypress test workflow"
git push origin main
```

### Phase 2: Ollama Integration (GitHub Actions) - Advanced

To automate AI fix generation in GitHub Actions, you need **one** of these options:

#### Option A: Self-Hosted Runner (Recommended)
Set up a machine with Ollama running that GitHub Actions can use:

**Requirements:**
- Windows/Mac/Linux machine always on
- Ollama installed and running (`ollama serve`)
- GitHub Self-Hosted Runner installed
- Network accessible from GitHub

**Setup:**
```bash
# 1. On your self-hosted machine:
ollama serve

# 2. Register the runner:
# https://github.com/<owner>/<repo>/settings/actions/runners

# 3. Configure workflow to use self-hosted runner:
runs-on: [self-hosted, ollama-enabled]
```

#### Option B: Docker Container in GitHub Actions
Deploy Ollama as a service container:

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - 11434:11434
    options: --gpus all  # Requires GPU-enabled runner
```

**Challenges:**
- Large image (~2-5 GB)
- Slow model downloading on CI
- Requires GitHub Actions GPU runner ($) 
- Model pulling happens every run (slow)

#### Option C: External Ollama API
Point GitHub Actions to external Ollama server:

```bash
OLLAMA_HOST=https://your-ollama-server.com npx ts-node ai/ollamaFix.ts ...
```

**Challenges:**
- Need to expose Ollama on internet (security risk)
- Network latency adds CI time
- Requires authentication/API keys

## Recommended Approach for Your Setup

**For immediate GitHub integration:**
1. Deploy Phase 1 workflow (basic test running)
2. GitHub Actions posts test results to PRs
3. You manually run AI fix locally when needed
4. Push fixed tests as new commits

**Why this approach:**
- ✅ Works with your current setup
- ✅ No additional infrastructure needed
- ✅ You review all AI-generated fixes
- ✅ Safe and predictable
- ✅ No security concerns

**Future enhancement (if wanted):**
Once you want fully automated AI fixes in CI/CD, set up a self-hosted runner with Ollama.

## Deployment Steps

### Step 1: Commit Current Changes
```bash
cd "C:\Bob Stuff\coding\cypress-testing"
git add --all
git commit -m "feat(ai): add AI QA assistant with Ollama integration"
```

### Step 2: Create GitHub Actions Workflow
```bash
# Already created at .github/workflows/cypress-tests.yml
git add .github/workflows/cypress-tests.yml
git commit -m "ci: add Cypress test workflow with PR reporting"
```

### Step 3: Create Environment Configuration
```powershell
# Create .env.local for GitHub Secrets configuration
# (Or set via GitHub Settings > Secrets)
```

### Step 4: Push to GitHub
```bash
git push origin main
```

### Step 5: Verify Workflow
1. Go to: `https://github.com/<owner>/<repo>/actions`
2. You should see "Cypress Tests + AI QA Fix" workflow
3. Watch the first run complete
4. Review test results on PR

## What Gets Committed to GitHub

**Safe to commit:**
- ✅ All AI Python/TypeScript scripts (`ai/` folder)
- ✅ GitHub Actions workflow files (`.github/workflows/`)
- ✅ Prompt templates
- ✅ Documentation

**NOT committed (ignored by .gitignore):**
- ❌ Generated test fixes (`ai/fixedTest.ts`) - local only
- ❌ Test backups (`.backup-` files)
- ❌ Report files (`cypress/reports/`)
- ❌ Screenshots (`cypress/screenshots/`)
- ❌ Node modules

## Testing the Workflow Locally

Before pushing to GitHub, test the workflow locally:

```bash
# Install act (local GitHub Actions testing)
choco install act  # Windows with Chocolatey

# Run workflow locally
act pull_request -W .github/workflows/cypress-tests.yml

# Or simulate push to main
act push -W .github/workflows/cypress-tests.yml
```

## Environment Variables for GitHub Actions

Add these to GitHub Settings > Secrets if needed:

```
OLLAMA_HOST=http://localhost:11434  # For self-hosted runner only
OLLAMA_MODEL=deepseek-coder
```

## Monitoring & Troubleshooting

### View Test Results
1. GitHub Actions tab: `https://github.com/<owner>/<repo>/actions`
2. Click on workflow run
3. See pass/fail status
4. Check uploaded artifacts

### If Tests Fail
1. Download test report artifact
2. Run locally: `npm run cy:run`
3. Fix locally or use AI: `npx ts-node ai/ollamaFix.ts`
4. Push fix as new commit
5. GitHub Actions runs again automatically

### Check Workflow Logs
```bash
# After pushing to GitHub, check workflow logs
# Go to: https://github.com/<owner>/<repo>/actions
# Click latest workflow run
# View detailed logs
```

## Security Considerations

✅ **Safe:**
- Test code analyzed locally only
- No data sent to external services
- Self-hosted Ollama on your network
- GitHub Actions artifacts retained 30 days

⚠️ **Not Safe (Don't do these):**
- Expose Ollama server to internet without auth
- Commit sensitive test data
- Use public cloud Ollama service
- Store Ollama API keys in plaintext

## Rollback Plan

If issues occur:

```bash
# Disable workflow temporarily
git rm .github/workflows/cypress-tests.yml
git commit -m "ci: disable workflow"
git push origin main

# Or just edit workflow to add 'if: false'
```

## Next Steps

1. **Local Testing Complete** ✅
   - Code review: ✅ Done
   - Functionality tested: ✅ Done
   - Ollama integration: ✅ Verified

2. **Ready for GitHub**
   - Phase 1 workflow: ✅ Ready
   - Phase 2 (optional): Needs additional setup

3. **To Deploy:**
   ```bash
   git push origin main
   ```

## Support & Resources

- GitHub Actions Docs: https://docs.github.com/en/actions
- Ollama Docs: https://ollama.ai
- Cypress CI/CD Guide: https://docs.cypress.io/guides/ci

---

**Status:** Ready for Phase 1 GitHub Actions deployment
