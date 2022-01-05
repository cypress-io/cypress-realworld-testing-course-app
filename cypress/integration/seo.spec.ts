import coursesJson from "../../data/courses.json"

describe("SEO titles and descriptions", function () {
  it("The homepage has the correct meta title and description", function () {
    cy.visit("/")

    cy.title().should("eq", "Testing Next.js Applications with Cypress")

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Learn from top industry experts and level-up your testing knowledge - for free."
    )
  })

  it("The course pages have the correct meta title and description", function () {
    cy.visit("/cypress-fundamentals")

    const title = coursesJson["cypress-fundamentals"].title
    const description = coursesJson["cypress-fundamentals"].description

    cy.title().should(
      "eq",
      `${title} | Testing Next.js Applications with Cypress`
    )

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      `${description}`
    )
  })

  it("The lesson pages have the correct meta title and description", function () {
    cy.visit("/testing-foundations/testing-is-a-mindset")

    const title = coursesJson["testing-foundations"].lessons[0].title
    const description =
      coursesJson["testing-foundations"].lessons[0].description

    cy.title().should(
      "eq",
      `${title} | Testing Next.js Applications with Cypress`
    )

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      `${description}`
    )
  })
})

export {}
