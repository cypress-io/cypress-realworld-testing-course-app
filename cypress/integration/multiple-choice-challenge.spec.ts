describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    cy.visit("/testing-foundations/testing-is-a-mindset")
  })

  it("gray's out and strikes through an incorrect answer", () => {
    cy.get("#answer-0").click()
    cy.get("label[for='answer-0']").should(
      "have.class",
      "line-through text-gray-300"
    )
  })

  it("it displays the next lesson button when an answer is correct and updates the progress sidebar", () => {
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
  })

  context("Disable Challenges Functionality", () => {
    beforeEach(() => {
      // @ts-ignore
      cy.restoreLocalStorage()
    })

    afterEach(() => {
      // @ts-ignore
      cy.saveLocalStorage()
    })

    it("toggles the display of the question if checked or not", () => {
      cy.getBySel("multiple-choice-challenge").should("be.visible")
      cy.getBySel("skip-challenge-input").click()
      cy.getBySel("multiple-choice-challenge").should("not.exist")

      cy.getBySel("skip-challenge-input").click()
      cy.getBySel("multiple-choice-challenge").should("exist")
      cy.getBySel("multiple-choice-challenge").should("be.visible")
    })

    it.only("displays the complete lesson button when checked", () => {
      cy.getBySel("skip-challenge-input").click()
      cy.getBySel("complete-lesson-button").should("be.visible")
      cy.getBySel("next-lesson-button").should("not.exist")
    })

    it("remains checked after page refresh", () => {
      cy.getBySel("skip-challenge-input").click()
      cy.reload()
      cy.getBySel("multiple-choice-challenge").should("not.exist")
    })
  })
})

export {}
