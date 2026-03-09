import { defineConfig } from "cypress"

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    saveJson: true, // keep the mochawesome JSON output so our AI helper can read it
    charts: true,
    reportPageTitle: "Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
      return config
    },

    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
})