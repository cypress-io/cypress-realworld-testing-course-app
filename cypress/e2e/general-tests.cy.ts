describe("template spec", () => {
  it("TC 1", () => {
    cy.visit("/")
    cy.contains("Testing Next.js Applications with Cypress")
  })

  it("TC 2", () => {
    cy.visit("/")
    cy.contains("Testing Next.js Applications with Cypress")
  })
})
