describe("template spec", () => {
  it("TC1: Load via custom command", () => {
    cy.loadApp(3) // Custom command to load the app with a timeout
    cy.contains("Testing Next.js Applications with Cypress")
  })

  it("TC2: ", () => {
    cy.visit("/")
    cy.contains("Testing Next.js Applications with Cypress")
  })
})
