import fs from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";
import http from "http";

const promptPath = path.resolve(__dirname, "prompt.txt");
const fixedPath = path.resolve(__dirname, "fixedTest.ts");
const reportDir = path.resolve(__dirname, "../cypress/reports")

// Ollama config
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "deepseek-coder"; // Better for code than llama2

function isOllamaRunning(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const url = new URL(host);
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || 11434,
        path: "/api/tags",
        method: "GET",
        timeout: 3000,
      },
      (res) => {
        resolve(res.statusCode === 200);
      }
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.abort();
      resolve(false);
    });
    req.end();
  });
}

function findLatestJsonReport(dir: string) {
  if (!fs.existsSync(dir)) return null

  const entries = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({
      name: f,
      mtime: fs.statSync(path.join(dir, f)).mtime.getTime(),
    }))

  if (entries.length === 0) return null

  entries.sort((a, b) => b.mtime - a.mtime)
  return path.join(dir, entries[0].name)
}

function exitWithUsage() {
  console.log("🤖 Ollama QA Assistant - Cypress Test Fixer");
  console.log("Usage: npx ts-node ai/ollamaFix.ts <path/to/test/file> [errorMessage]");
  console.log("Example: npx ts-node ai/ollamaFix.ts cypress/e2e/login.cy.ts \"AssertionError: expected ...\"");
  console.log("\nEnvironment variables:");
  console.log("  OLLAMA_HOST  - Ollama server URL (default: http://localhost:11434)");
  console.log("  OLLAMA_MODEL - Model to use (default: deepseek-coder)");
  process.exit(1);
}

const testPath = process.argv[2];
const explicitError = process.argv[3];

if (!testPath) {
  exitWithUsage();
}

if (!fs.existsSync(promptPath)) {
  console.error(`❌ Missing prompt template: ${promptPath}`);
  process.exit(1);
}

if (!fs.existsSync(testPath)) {
  console.error(`❌ Test file does not exist: ${testPath}`);
  process.exit(1);
}

const originalTest = fs.readFileSync(testPath, "utf-8");

let errorMessage = explicitError;

function findFirstFailedTest(report: any) {
  function scanSuite(suite: any): any | null {
    if (Array.isArray(suite.tests)) {
      const failed = suite.tests.find((t: any) => t.state === "failed")
      if (failed) return failed
    }
    if (Array.isArray(suite.suites)) {
      for (const child of suite.suites) {
        const found = scanSuite(child)
        if (found) return found
      }
    }
    return null
  }

  for (const result of report.results || []) {
    if (!Array.isArray(result.suites)) continue
    for (const suite of result.suites) {
      const found = scanSuite(suite)
      if (found) return found
    }
  }

  return null
}

if (!errorMessage) {
  const reportPath = findLatestJsonReport(reportDir)
  if (reportPath) {
    try {
      const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
      const firstFailed = findFirstFailedTest(report)
      if (firstFailed) {
        errorMessage = firstFailed.err?.message || ""
      }
    } catch (err) {
      // ignore - we may not have a report yet
    }
  }
}

if (!errorMessage) {
  errorMessage = "<no error message provided>";
}

// ===== MAIN EXECUTION =====
async function main() {
  console.log("🤖 Ollama QA Assistant - Cypress Test Fixer\n");
  
  // Check if Ollama is running
  console.log(`Checking Ollama connection at ${OLLAMA_HOST}...`);
  const ollamaAvailable = await isOllamaRunning(OLLAMA_HOST);
  
  if (!ollamaAvailable) {
    console.error(`❌ Ollama service not responding at ${OLLAMA_HOST}`);
    console.error("Please ensure Ollama is running:");
    console.error("  - Run 'start ollama serve' in PowerShell/CMD");
    console.error("  - Or ensure ollama application is running");
    process.exit(1);
  }
  
  console.log(`✅ Ollama is running\n`);
  
  const promptTemplate = fs.readFileSync(promptPath, "utf-8");
  const prompt = promptTemplate
    .replace("{{TEST}}", originalTest)
    .replace("{{ERROR}}", errorMessage);

  console.log(`📄 Test file: ${testPath}`);
  console.log(`🧠 Model: ${OLLAMA_MODEL}`);
  console.log(`📝 Error message: ${errorMessage.substring(0, 80)}${errorMessage.length > 80 ? "..." : ""}\n`);
  console.log("⏳ Calling Ollama to generate a fixed test...\n");

  const result = spawnSync(
    "ollama",
    ["run", OLLAMA_MODEL, prompt],
    {
      encoding: "utf-8",
      maxBuffer: 20 * 1024 * 1024,
      timeout: 120000, // 2 minute timeout
    }
  );

  if (result.error) {
    console.error(`❌ Failed to run ollama: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`❌ Ollama exited with status ${result.status}`);
    if (result.stderr) {
      console.error("Error output:", result.stderr);
    }
    if (result.stdout) {
      console.error("Output:", result.stdout);
    }
    process.exit(1);
  }

  const aiOutput = result.stdout.trim();
  if (!aiOutput) {
    console.error("❌ Ollama returned empty output");
    process.exit(1);
  }

  // Basic validation: check if output looks like test code
  if (!aiOutput.includes("describe") && !aiOutput.includes("it(")) {
    console.warn("⚠️  Warning: AI output doesn't look like test code");
    console.warn("You may want to review the output before applying\n");
  }

  fs.writeFileSync(fixedPath, aiOutput + "\n", "utf-8");
  
  console.log("✅ Success! AI-generated fix has been written to:");
  console.log(`   ${fixedPath}\n`);
  console.log("📋 Next steps:");
  console.log("   1. Review the generated fix:");
  console.log(`      cat ai/fixedTest.ts`);
  console.log("   2. If it looks good, apply it:");
  console.log(`      npx ts-node ai/fixTests.ts ${testPath}`);
  console.log("   3. Run your tests to verify:");
  console.log("      npm run cy:run\n");
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err.message);
  process.exit(1);
});
