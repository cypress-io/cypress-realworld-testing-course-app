
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Argument: putanja do originalnog test fajla
const originalTestArg = process.argv[2];
if (!originalTestArg) {
  console.error("❌ Please provide a test file path");
  console.error("Usage: npx ts-node ai/fixTests.ts <path/to/test>");
  console.error("Example: npx ts-node ai/fixTests.ts cypress/e2e/general-tests.cy.ts");
  process.exit(1);
}

const repoRoot = process.cwd();
const repoName = path.basename(repoRoot);

function resolveTestPath(p: string) {
  const candidate = path.isAbsolute(p) ? p : path.resolve(repoRoot, p);
  if (fs.existsSync(candidate)) return candidate;

  // If user passed a path that starts with the repo folder name, strip it
  const prefix = `${repoName}${path.sep}`;
  if (p.startsWith(prefix)) {
    const stripped = p.slice(prefix.length);
    const alt = path.resolve(repoRoot, stripped);
    if (fs.existsSync(alt)) return alt;
  }

  return candidate;
}

const originalTestPath = resolveTestPath(originalTestArg);
if (!fs.existsSync(originalTestPath)) {
  console.error(`❌ Test file does not exist: ${originalTestArg}`);
  console.error(`   Tried: ${originalTestPath}`);
  process.exit(1);
}

// Check if fixedTest.ts exists and has content
const fixedTestPath = path.resolve(__dirname, "fixedTest.ts");
if (!fs.existsSync(fixedTestPath)) {
  console.error(`❌ No AI fix available at ${fixedTestPath}`);
  console.error("   First run: npx ts-node ai/ollamaFix.ts <test-file>");
  process.exit(1);
}

const fixedTest = fs.readFileSync(fixedTestPath, "utf8");
if (fixedTest.length < 50) {
  console.error(`❌ The fixed test appears to be empty or invalid`);
  console.error(`   Content length: ${fixedTest.length} bytes`);
  process.exit(1);
}

console.log("📝 Applying AI-generated fix...\n");
console.log(`   Original: ${originalTestPath}`);
console.log(`   Fixed:    ${fixedTestPath}\n`);

// Backup original test
const backupPath = originalTestPath.replace(/\.ts$/, `.backup-${Date.now()}.ts`);
fs.copyFileSync(originalTestPath, backupPath);
console.log(`✅ Backup created: ${backupPath}\n`);

// Apply fix
fs.writeFileSync(originalTestPath, fixedTest);
console.log(`✅ Fix applied to ${originalTestPath}\n`);

// Git workflow (optional - only if git repo exists)
try {
  execSync("git rev-parse --git-dir", { stdio: "pipe" });
  
  console.log("📋 Git workflow:");
  const branchName = `ai-test-fix/${Date.now()}`;
  
  try {
    execSync(`git checkout -b ${branchName}`, { stdio: "pipe" });
    console.log(`   ✅ Created branch: ${branchName}`);
  } catch (err) {
    // Branch might already exist, try using it as is
    console.log(`   ℹ️  Using current branch`);
  }

  execSync(`git add ${originalTestPath}`, { stdio: "pipe" });
  console.log(`   ✅ Staged changes`);

  execSync(`git commit -m "fix(tests): AI-generated fix for ${path.basename(originalTestPath)}"`, { 
    stdio: "pipe" 
  });
  console.log(`   ✅ Committed changes\n`);

  console.log("Next steps:");
  console.log(`  1. Review the changes: git diff ${branchName}~1..HEAD`);
  console.log(`  2. Test locally: npm run cy:run`);
  console.log(`  3. If tests pass, push: git push origin ${branchName}`);
  console.log(`  4. Create a pull request on GitHub\n`);

} catch (err) {
  console.log("ℹ️  Not a git repository, skipping git workflow\n");
  console.log("Next steps:");
  console.log("  1. Review the fixed test file");
  console.log("  2. Run tests: npm run cy:run");
  console.log("  3. If tests pass, commit manually");
}