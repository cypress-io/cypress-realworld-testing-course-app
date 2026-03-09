import fs from "fs"
import path from "path"

const reportDir = path.resolve(__dirname, "../cypress/reports")

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

const reportPath = findLatestJsonReport(reportDir)
if (!reportPath) {
  console.error(
    "Could not find a mochawesome JSON report in:",
    reportDir,
    "\nMake sure cypress-mochawesome-reporter is configured with saveJson: true."
  )
  process.exit(1)
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"))

function collectFailedTestsFromSuite(suite: any, out: any[], currentFile: string | null) {
  const file = suite.fullFile || suite.file || currentFile

  if (Array.isArray(suite.tests)) {
    suite.tests.forEach((test: any) => {
      if (test.state === "failed") {
        out.push({
          file,
          title: test.title,
          fullTitle: test.fullTitle,
          error: test.err?.message || "",
        })
      }
    })
  }

  if (Array.isArray(suite.suites)) {
    suite.suites.forEach((child: any) => collectFailedTestsFromSuite(child, out, file))
  }
}

function getFailedTests(report: any) {
  const failed: any[] = []

  report.results.forEach((result: any) => {
    if (Array.isArray(result.suites)) {
      result.suites.forEach((suite: any) => collectFailedTestsFromSuite(suite, failed, null))
    }
  })

  return failed
}

const failedTests = getFailedTests(report)

console.log("FAILED TESTS:")
console.log(JSON.stringify(failedTests, null, 2))