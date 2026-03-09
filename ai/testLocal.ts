/**
 * Local Testing Script for AI QA Assistant
 * 
 * This script helps test the Ollama AI workflow locally before committing
 * Usage: npx ts-node ai/testLocal.ts <test-file>
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const testFile = process.argv[2];

if (!testFile) {
  console.log("🧪 AI QA Assistant - Local Testing Script\n");
  console.log("Usage: npx ts-node ai/testLocal.ts <path/to/test>\n");
  console.log("Example: npx ts-node ai/testLocal.ts cypress/e2e/general-tests.cy.ts\n");
  console.log("This script will:");
  console.log("  1. Run the test file to capture failures");
  console.log("  2. Call Ollama to generate fixes");
  console.log("  3. Apply the fix to a temporary copy");
  console.log("  4. Run the test again to verify the fix\n");
  process.exit(0);
}

const testPath = path.resolve(testFile);
const repoRoot = process.cwd();

if (!fs.existsSync(testPath)) {
  console.error(`❌ Test file not found: ${testFile}`);
  process.exit(1);
}

async function runTest(filePath: string, description: string): Promise<{ success: boolean; output: string }> {
  console.log(`\n📋 ${description}...`);
  try {
    const output = execSync(`npx cypress run --spec "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    console.log("✅ Tests PASSED");
    return { success: true, output };
  } catch (error: any) {
    const output = error.stdout || error.stderr || error.message;
    console.log("❌ Tests FAILED");
    return { success: false, output };
  }
}

async function main() {
  console.log("🧪 AI QA Assistant - Local Testing\n");
  console.log(`Test file: ${testFile}\n`);

  // Step 1: Run original test
  console.log("=".repeat(60));
  const originalResult = await runTest(testPath, "Step 1: Running original test");
  console.log("=".repeat(60));

  if (originalResult.success) {
    console.log("\n✅ Test already passes! No fix needed.");
    process.exit(0);
  }

  // Step 2: Generate fix with Ollama
  console.log("\n=".repeat(60));
  console.log("Step 2: Generating fix with Ollama...\n");
  try {
    execSync(`npx ts-node ai/ollamaFix.ts "${testPath}"`, {
      stdio: "inherit",
    });
  } catch (err) {
    console.error("❌ Failed to generate fix");
    process.exit(1);
  }
  console.log("=".repeat(60));

  // Step 3: Create temporary copy with fix
  const tmpPath = testPath.replace(/\.ts$/, `.tmp-${Date.now()}.ts`);
  const fixedPath = path.resolve(__dirname, "fixedTest.ts");

  if (!fs.existsSync(fixedPath)) {
    console.error("❌ No fix generated");
    process.exit(1);
  }

  const fixedCode = fs.readFileSync(fixedPath, "utf-8");
  fs.copyFileSync(testPath, tmpPath);
  fs.writeFileSync(testPath, fixedCode);

  console.log("\n=".repeat(60));
  const fixedResult = await runTest(testPath, "Step 3: Testing the AI-generated fix");
  console.log("=".repeat(60));

  // Restore original
  fs.copyFileSync(tmpPath, testPath);
  fs.unlinkSync(tmpPath);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 TEST RESULTS SUMMARY");
  console.log("=".repeat(60));
  console.log(`Original test:  ${originalResult.success ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`Fixed test:     ${fixedResult.success ? "✅ PASS" : "❌ FAIL"}`);

  if (fixedResult.success && !originalResult.success) {
    console.log("\n✨ SUCCESS! The AI fix resolved the issue!\n");
    console.log("Next steps:");
    console.log("  1. Review the generated fix:");
    console.log(`     cat ai/fixedTest.ts`);
    console.log("  2. Apply the fix:");
    console.log(`     npx ts-node ai/fixTests.ts ${testFile}`);
    console.log("  3. Commit and push");
  } else if (fixedResult.success && originalResult.success) {
    console.log("\n⚠️  Test was already passing. No changes needed.");
  } else {
    console.log("\n❌ The AI fix did not resolve the issue. Manual review needed.\n");
    console.log("Tips:");
    console.log("  - Review the fix: cat ai/fixedTest.ts");
    console.log("  - Check error logs above for clues");
    console.log("  - Manual fix may be needed");
  }

  console.log("=".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
