describe("Header", () => {
  it("links to the correct pages", () => {
    cy.visit("/")
    cy.getBySel("courses-dropdown").click()
    cy.getBySel("courses-dropdown-menu")
      .find("a")
      .contains("1. Testing Your First Next.js Application")
      .click()
    cy.location("pathname").should("eq", "/testing-your-first-application")
  })
})
