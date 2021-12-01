import coursesJson from "../../data/courses.json"
const { _ } = Cypress

describe("RWT Home", function () {
  beforeEach(function () {
    cy.visit("/")
  })

  it("renders all of the course titles, descriptions & lessons", function () {
    const courses = Object.keys(coursesJson)

    _.each(courses, (course, index) => {
      const title = coursesJson[course].title
      const description = coursesJson[course].description
      const lessons = coursesJson[course].lessons

      cy.getBySel(`course-${index}`).within(($course) => {
        cy.getBySel("course-title").contains(title)
        cy.getBySel("course-description").contains(description)

        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getBySel(`lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })
})

export {}
