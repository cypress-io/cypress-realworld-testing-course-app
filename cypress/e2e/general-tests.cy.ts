describe("template spec", () => {
  it("TC1: Load via custom command", () => {
    cy.loadApp(1000) // Custom command to load the app with a timeout
    cy.contains("Testing Next.js Applications with Cypress")
  })

  it("TC 2", () => {
    cy.visit("/")
    cy.contains("Testing Next.js Applications with Cypress")
  })
})
