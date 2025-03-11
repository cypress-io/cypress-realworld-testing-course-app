describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("displays all 3 courses on the home page", () => {
    cy.getBySel("course-0").within(() => {
      cy.getBySel("course-title").should(
        "contain",
        "Testing Your First Next.js Application"
      )
      cy.getBySel("course-description").should(
        "contain",
        "How to test a Next.js e-commerce app with Cypress."
      )
    })

    cy.getBySel("course-1").within(() => {
      cy.getBySel("course-title").should("contain", "Testing Foundations")
      cy.getBySel("course-description").should(
        "contain",
        "The fundamentals you need to write great tests."
      )
    })

    cy.getBySel("course-2").within(() => {
      cy.getBySel("course-title").should("contain", "Cypress Fundamentals")
      cy.getBySel("course-description").should(
        "contain",
        "The aspects of Cypress you must know."
      )
    })
  })

  it("subscribes for updates", () => {
    cy.getBySel("email-input").type("tom@example.com")
    cy.getBySel("submit-button").click()
    cy.getBySel("success-message").should(
      "contain",
      "Success: tom@example.com has been successfully subscribed"
    )
  })
})
