# Real World Testing with Cypress - Course App - Small Cypress Framework

In this repo cypress learning application is used in aim to create small cypres e2e testing framework proof of concept.

Main aspects shown here are:

1. Cypress installation as a part of app repo
2. Cypress folder structure
3. Page Object Model vs cypress commands (s way to make tests scalable)
4. Mocha Awesome Report
5. Test Case Execution in GitHub Actions

How to run:

1. Clone repo with git
2. Install needed software (Node.js, VSCode)
3. Install dependencies with: npm install
4. Start application with: npm run dev
5. Start cypress with: npx cypress open
6. Execute tests from CLI: npx cypress run --browser chrome

Mocha Awesome Report

Mocha awesome report is configured. Cypress store report to: cypress\reports folder. Report is available as github pipeline artifactory. Local reports are ignored by git.
