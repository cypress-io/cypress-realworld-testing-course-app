describe("Performance Tests", () => {
  it("should load the page within acceptable time", () => {
    cy.startPerformanceMeasurement()
    cy.visit("/")
    cy.finishPerformanceMeasurement(6000)
  })
})
