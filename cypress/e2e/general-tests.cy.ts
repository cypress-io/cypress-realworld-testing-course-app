import { HomePage } from "../pages/testing-your-first-application"

describe("Home Page Tests", () => {
  const homePage = new HomePage()

  beforeEach(() => {
    cy.loadApp(6000)
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
      cy.get("dt").eq(0).should("contain.text", "4 Courses")
    })

    it("should display all course cards", () => {
      homePage.courseListItems().should("have.length.greaterThan", 0)
    })

    it("should have clickable course links", () => {
      homePage.courseListItems().first().find("a").should("exist")
    })
  })

  describe("Navigation", () => {
    it("should display the menu button", () => {
      homePage.menuButton().should("be.visible")
    })

    it("should open the menu when clicking the menu button", () => {
      homePage.clickMenu()
      homePage.verifyMenuIsVisible()
    })
  })
})
