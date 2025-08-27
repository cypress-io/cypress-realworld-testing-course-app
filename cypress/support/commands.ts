/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
const performanceMeasurementTitle = "performanceMeasurement"
declare global {
  namespace Cypress {
    interface Chainable {
      loadApp(timeoutCustomValue: number): void
      startPerformanceMeasurement(): void
      finishPerformanceMeasurement(threshold: number): void
    }
  }
}
// --Load app cy command --
Cypress.Commands.add("loadApp", (timeout: number) => {
  cy.visit("/", { timeout })
})
// --Performance measurement commands --
Cypress.Commands.add("startPerformanceMeasurement", () => {
  cy.window().its("performance").invoke("mark", performanceMeasurementTitle)
})

Cypress.Commands.add("finishPerformanceMeasurement", (threshold: number) => {
  cy.window()
    .its("performance")
    .invoke("measure", performanceMeasurementTitle)
    .its("duration")
    .should("be.lessThan", threshold)
})

// Make the file a module:
export {}
