# AI QA Assistant - Ollama Integration

## Overview

This AI QA Assistant automatically fixes failing Cypress tests using Ollama's local LLM (Large Language Model). It analyzes test failures and generates corrected code without changing test logic.

**Key Features:**
- ✅ Local AI analysis (no cloud/API keys needed) 
- ✅ Maintains test logic and intent
- ✅ Focuses on selector/timing fixes
- ✅ Code review before applying  
- ✅ Automatic backup of original tests
- ✅ Git integration for PR workflows

## Prerequisites

### Local Development

1. **Ollama Installation**
   - Download: https://ollama.ai
   - Version: 0.17.7+ recommended
   - Windows: Install and run the desktop app
   - Mac/Linux: Use `brew install ollama` or system package manager

2. **Required Models** (at minimum one):
   - `deepseek-coder` (recommended for code fixes) 
   - `llama2` (fallback option)

3. **Ensure service is running:**
   ```powershell
   # Check status
   Get-Process ollama -ErrorAction SilentlyContinue
   
   # If not running, start Ollama app or:
   ollama serve
   ```

4. **Pull required models:**
   ```bash
   # Best for code generation
   ollama pull deepseek-coder
   
   # Alternative
   ollama pull llama2
   ```

5. **Verify installation:**
   ```bash
   ollama list
   # Should show the models you pulled
   ```

### Project Setup

```bash
cd cypress-testing
npm install  # Install Node dependencies
```

## Local Testing Workflow

### Quick Test (Recommended)

Test the AI fix locally before applying:

```bash
# Run entire test + fix + verify cycle
npm run ai:test-local cypress/e2e/general-tests.cy.ts
```

This will:
1. Run the test to capture failures
2. Call Ollama to generate a fix
3. Test the generated fix automatically
4. Show before/after results

### Manual Workflow (Step-by-Step)

If you prefer more control:

```bash
# Step 1: Run tests to see failures
npm run cy:run

# Step 2: Generate AI fix using Ollama
npx ts-node ai/ollamaFix.ts cypress/e2e/general-tests.cy.ts

# Step 3: Review the generated fix
cat ai/fixedTest.ts

# Step 4: Test the fix (creates backup automatically)
npx ts-node ai/fixTests.ts cypress/e2e/general-tests.cy.ts

# Step 5: Run tests again to verify
npm run cy:run
```

### Advanced Options

**Use different Ollama model:**
```bash
OLLAMA_MODEL=llama2 npm run ai:ollama cypress/e2e/general-tests.cy.ts
```

**Custom Ollama server:**
```bash
OLLAMA_HOST=http://192.168.1.100:11434 npm run ai:ollama cypress/e2e/general-tests.cy.ts
```

**Provide error message directly:**
```bash
npx ts-node ai/ollamaFix.ts cypress/e2e/general-tests.cy.ts "AssertionError: expected element to be visible"
```

## How It Works

### Step 1: Analyze Failure
- Reads test file and error from latest Cypress report
- Extracts failure message from mochawesome JSON report
- Or uses error message you provide

### Step 2: Generate Fix
- Sends test code + error to Ollama AI
- AI model analyzes the issue
- Generates fixed test code
- Saves to `ai/fixedTest.ts`

### Step 3: Review & Apply
- You review the generated fix before applying
- Can compare original vs fixed code
- Apply with automatic backup creation
- Create git branch for PR workflow

### Step 4: Verify
- Run tests again to confirm fix works
- If passing, commit and push to GitHub
- If failing, review and adjust

## File Structure

```
ai/
├── prompt.txt          # System prompt for AI
├── ollamaFix.ts        # Main AI interaction script
├── fixTests.ts         # Apply AI fix to test files
├── testLocal.ts        # Local testing workflow
├── analyzeFailures.ts  # Analyze test reports
├── fixedTest.ts        # Generated fix (auto-created)
└── README.md          # This file
```

## GitHub Actions Integration (Coming Soon)

Once validated locally, GitHub Actions will:
1. Run Cypress tests automatically on PR
2. Extract failures from mochawesome reports
3. Call Ollama AI to generate fixes
4. Create fix PR branches
5. Requires: Ollama service accessible from CI/CD

## Troubleshooting

### "Ollama service not responding"
```powershell
# Windows: Start Ollama
ollama serve

# Or open the Ollama desktop app
```

### "Model not found"
```bash
ollama pull deepseek-coder
# or
ollama pull llama2
```

### "Empty AI output"
- Model may be struggling with prompt complexity
- Try a more straightforward test file
- Check Ollama logs for errors
- Try different model: `OLLAMA_MODEL=llama2 npm run ai:ollama ...`

### "Test still fails after fix"
- AI fix may not be optimal
- Review generated code manually
- May need manual adjustment
- Consider running AI again with more context

### Test file changes not reflected
- Clear backup files: `rm cypress/e2e/*.backup-*.ts`
- Verify you're pointing to correct test file path
- Check git status to see if file was staged

## Best Practices

1. **Before applying AI fix:**
   - Always review `ai/fixedTest.ts`
   - Understand what the AI changed
   - Test logic should be unchanged

2. **For complex tests:**
   - Run one test at a time for clearer error messages
   - AI works better with isolated failures

3. **Model selection:**
   - `deepseek-coder` - Best for Cypress/TypeScript
   - `llama2` - Fallback, simpler fixes

4. **Git workflow:**
   - AI creates unique branch names with timestamps
   - Each fix is a separate commit
   - Easy to review and revert if needed

5. **Monitor performance:**
   - AI call takes 10-60 seconds depending on model size
   - Keep Ollama service running for best performance
   - Check Ollama resource usage if slow

## Monitoring & Logs

Check test reports:
```bash
# View latest test report
Start-Process ".\cypress\reports\*.html"

# View failed tests JSON
cat cypress/reports/mochawesome-*.json | jq
```

## Environment Variables Reference

| Variable | Default | Example |
|----------|---------|---------|
| `OLLAMA_HOST` | `http://localhost:11434` | `http://192.168.1.100:11434` |
| `OLLAMA_MODEL` | `deepseek-coder` | `llama2` |

## Next Steps

1. ✅ Verify Ollama is running locally
2. ✅ Test with current test: `npm run ai:test-local cypress/e2e/general-tests.cy.ts`
3. ✅ Review generated fixes before applying
4. ✅ Once confident: Set up GitHub Actions configuration
5. ✅ Monitor AI fixes in production CI/CD pipeline

## Support & Resources

- Ollama Docs: https://ollama.ai/library
- Cypress Docs: https://docs.cypress.io
- Model Info: https://ollama.ai/library/deepseek-coder

---

**Status:** Ready for local testing | GitHub Actions integration pending verification
