const { _ } = Cypress
import coursesJson from "../../data/courses.json"
const courses = Object.keys(coursesJson)

const verifyCourseLinks = (path) => {
  cy.visit(path)
  cy.getBySel("courses-dropdown").click()
  cy.getBySel("courses-dropdown-menu").within(() => {
    _.each(courses, (course, index) => {
      const title = coursesJson[course].title
      cy.get("a").its(index).contains(title)
    })
  })
}

describe("Header & Navigatiion", function () {
  it("renders the correct courses in the Courses dropdown menu", function () {
    verifyCourseLinks("/")
  })
})

export {}
