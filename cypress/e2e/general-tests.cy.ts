describe("General Basic Tests - Playground", () => {
  beforeEach(() => {
    cy.loadApp(5800) // Custom command to load the app with a timeout
  })
  it("TC1: Validate title value", () => {
    cy.loadApp(5800)
    cy.contains("Testing Next.js Applications with Cypress")
  })

  it("TC2: Check expected amount of available courses", () => {
    cy.get("dt").eq(0).contains("4 Courses")
  })
})
