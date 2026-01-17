export class HomePage {
  // ===== LOCATORS =====
  heroHeading = () => cy.get('[data-test="hero-heading"]')
  courseCards = () =>
    cy.get(
      '[data-test="course-0"], [data-test="course-1"], [data-test="course-2"], [data-test="course-3"]'
    )
  courseTitles = () => cy.get('[data-test="course-title"]')
  courseLinks = () => cy.get('[data-test="course-title"]').parent().find("a")
  coursesDropdown = () => cy.get('[data-test="courses-dropdown"]')
  coursesDropdownMenu = () => cy.get('[data-test="courses-dropdown-menu"]')
  courseStats = () => cy.get("dt")

  // ===== ACTIONS =====
  visit(): this {
    cy.visit("/")
    return this
  }

  clickCoursesDropdown(): this {
    this.coursesDropdown().click()
    return this
  }

  // ===== ASSERTIONS =====
  verifyHeroHeading(expectedText: string): this {
    this.heroHeading().should("contain.text", expectedText)
    return this
  }

  verifyCourseCount(expectedCount: number): this {
    this.courseCards().should("have.length", expectedCount)
    return this
  }

  verifyCourseStatsText(expectedText: string): this {
    this.courseStats().eq(0).should("contain.text", expectedText)
    return this
  }

  verifyMenuIsVisible(): this {
    this.coursesDropdownMenu().should("be.visible")
    return this
  }
}
