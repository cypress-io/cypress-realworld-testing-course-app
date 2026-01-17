import { HomePage } from "../pages/homePage"

describe("Home Page Tests", () => {
  const homePage = new HomePage()

  beforeEach(() => {
    cy.loadApp(6500)
  })

  describe("Hero Section", () => {
    it("should display the main heading", () => {
      homePage.verifyHeroHeading("Testing Next.js Applications with Cypress")
    })

    it("should display the hero section with correct styling", () => {
      homePage.heroHeading().should("be.visible")
    })
  })

  describe("Courses Section", () => {
    it("should display the expected number of courses", () => {
      homePage.verifyCourseStatsText("4 Courses")
    })

    it("should display all course cards", () => {
      homePage.courseCards().should("have.length", 4)
    })

    it("should have clickable course links", () => {
      homePage.courseLinks().first().should("exist")
    })
  })

  describe("Navigation", () => {
    it("should display the courses dropdown", () => {
      homePage.coursesDropdown().should("be.visible")
    })

    it("should open the courses menu when clicking the dropdown", () => {
      homePage.clickCoursesDropdown()
      homePage.verifyMenuIsVisible()
    })
  })
})
