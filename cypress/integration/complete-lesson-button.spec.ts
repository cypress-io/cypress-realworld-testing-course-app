describe("Complete Lesson Button", () => {
  it("Links to the correct lesson when clicked", () => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/setting-up-data-before-each-test"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-use-cypress-commands"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/cypress-command-logs-snapshots-and-aliases"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/testing-what-isnt-there"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should("eq", "/")
  })

  it("only shows on 'testing your first application' lesson pages", () => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist")

    cy.visit("/testing-foundations/testing-is-a-mindset")
    cy.getBySel("complete-lesson-button").should("not.exist")

    cy.visit("/cypress-fundamentals/command-chaining")
    cy.getBySel("complete-lesson-button").should("not.exist")

    cy.visit("/advanced-cypress-concepts/intercepting-network-requests")
    cy.getBySel("complete-lesson-button").should("not.exist")
  })
})

export {}
