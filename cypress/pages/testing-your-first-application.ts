export class HomePage {
  // ===== LOCATORS =====
  heroHeading = () => cy.get('[data-test="hero-heading"]')
  courseListItems = () => cy.get("ul li")
  menuButton = () => cy.get('[data-test="menu-button"]')
  menuItems = () => cy.get('[data-test="menu-items"]')

  // ===== ACTIONS =====
  visit(): this {
    cy.visit("/")
    return this
  }

  clickMenu(): this {
    this.menuButton().click()
    return this
  }

  // ===== ASSERTIONS =====
  verifyHeroHeading(expectedText: string): this {
    this.heroHeading().should("contain.text", expectedText)
    return this
  }

  verifyCourseCount(expectedCount: number): this {
    this.courseListItems().should("have.length", expectedCount)
    return this
  }

  verifyMenuIsVisible(): this {
    this.menuItems().should("be.visible")
    return this
  }
}
