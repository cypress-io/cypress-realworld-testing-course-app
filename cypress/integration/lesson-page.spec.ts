const { _ } = Cypress

describe("Lesson Pages", () => {
  beforeEach(() => {
    cy.visit("/testing-your-first-application/app-install-and-overview")
  })

  it("the TOC links to the correct content section when clicked", () => {
    cy.getBySel("toc-sidebar").within(() => {
      cy.get("a").each(($link) => {
        const href = $link.attr("href")
        console.log(href)
        cy.wrap($link).click()

        cy.window().then(($window) => {
          expect($window.scrollY).to.be.closeTo(
            Math.ceil(cy.$$(`${href}`).offset().top),
            5
          )
        })
      })
    })
  })

  it("shows the challenge", () => {
    cy.getBySel("multiple-choice-challenge").should("exist")
  })

  context("Lesson Progress Sidebar", () => {
    it("the lessons in the progress sidebar link to the correct lessons", () => {
      cy.visit("/testing-your-first-application/app-install-and-overview")
      cy.getBySel("lesson-progress-link-0").click()
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/app-install-and-overview"
      )

      cy.getBySel("lesson-progress-link-1").click()
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
      )

      cy.getBySel("lesson-progress-link-2").click()
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/setting-up-data-before-each-test"
      )
    })
  })
})

export {}
