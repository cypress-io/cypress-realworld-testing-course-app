import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
      return config
    },
    baseUrl: "http://localhost:3000",
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "Cypress Test Report",
    reportFilename: "test-results",
    embeddedScreenshots: true,
    inlineAssets: true, // shows screenshots inline in the report
    saveAllAttempts: false,
  },
})
