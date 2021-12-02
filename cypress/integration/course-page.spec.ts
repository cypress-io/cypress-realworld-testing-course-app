/* 
  Note: These tests rely upon local storage state from previous tests, 
  so make sure to run all of them at once and in order
*/
import coursesJson from "../../data/courses.json"
const { _ } = Cypress
const sectionSlug = "cypress-fundamentals"
const lessons = coursesJson[sectionSlug].lessons

describe("Next Lesson Button on Course Pages", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    // @ts-ignore
    cy.saveLocalStorage()
  })

  it("says 'Start Course' and links to the first lesson if none of the lessons have been completed", () => {
    cy.visit(`/${sectionSlug}`)
    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Start Course")
      expect(href).to.eq(
        `/${sectionSlug}/${coursesJson[`${sectionSlug}`].lessons[0].slug}`
      )
    })
  })

  it("says 'Next Lesson' and links to the 2nd lesson if the first lesson has been completed", () => {
    cy.visit(`/${sectionSlug}/how-to-write-a-test`)
    cy.get("#answer-0").click()

    cy.visit(`/${sectionSlug}`)

    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Next Lesson")
      expect(href).to.eq(
        `/${sectionSlug}/${coursesJson[`${sectionSlug}`].lessons[1].slug}`
      )
    })
  })

  it("says 'Course Completed' and links to the home page if all of the lessons have been completed", () => {
    cy.visit(`/${sectionSlug}/${coursesJson[sectionSlug].lessons[0].slug}`)

    _.each(lessons, (lesson, index) => {
      cy.location("pathname").should(
        "eq",
        `/${sectionSlug}/${coursesJson[sectionSlug].lessons[index].slug}`
      )
      cy.getBySel(
        `"challenge-answer-${lesson["challenges"][0]["correctAnswerIndex"]}"`
      ).click()
      cy.getBySel("lesson-complete-0").should("have.class", "bg-blue-600")
      cy.getBySel("next-lesson-button").click()
    })

    cy.visit(`/${sectionSlug}`)

    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Course Completed")
      expect(href).to.eq("/")

      cy.wrap($btn).click()
    })

    cy.location("pathname").should("eq", "/")
  })
})

export {}
