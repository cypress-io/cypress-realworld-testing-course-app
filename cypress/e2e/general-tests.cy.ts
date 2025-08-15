describe("template spec", () => {
  it("passes", () => {
    cy.visit("/")
    cy.contains("Testing Next.js Applications with Cypress")
  })
})
