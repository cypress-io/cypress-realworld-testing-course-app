describe("Cypress Fundamentals course", () => {
  beforeEach(() => {
    cy.intercept("GET", "/cypress-fundamentals/cypress-runs-in-the-browser").as(
      "runsInBrowser"
    )
    cy.visit("/cypress-fundamentals")
  })

  it("take the Cypress Fundamentals course", () => {
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      "/cypress-fundamentals/how-to-write-a-test"
    )
    cy.getBySel("challenge-answer-0").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("next-lesson-button").click()
    cy.wait("@runsInBrowser")
    cy.location("pathname").should(
      "eq",
      "/cypress-fundamentals/cypress-runs-in-the-browser"
    )
    cy.getBySel("challenge-answer-0").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      "/cypress-fundamentals/command-chaining"
    )
    cy.getBySel("challenge-answer-0").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should("eq", "/")

    cy.getBySel("course-2").within(() => {
      cy.getBySel("lesson-complete-0")
      cy.getBySel("lesson-complete-1")
      cy.getBySel("lesson-complete-2")
    })
  })
})
