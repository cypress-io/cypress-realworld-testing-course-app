// describe("home page", () => {
//   it("the h1 contains the correct text", () => {
//     cy.visit("http://localhost:3000")
//     // cy.get() to get the h1 element on our home page. chaining contains onto the cy.get() which accepts a string. 
//     cy.get("h1").contains("Testing Next.js Applications with Cypress")
//   })
// })

// describe("home page", () => {
//   it("the h1 contains the correct text", () => {
//     // .visit if there are multiple urls
//     cy.visit("http://localhost:3000")
//     cy.get("[data-test='hero-heading']").contains(
//       "Testing Next.js Applications with Cypress"
//     )
//   })

//   it.only("the features on the homepage are correct", () => {
//     cy.visit("http://localhost:3000")
//     cy.get("dt").eq(0).contains("4 Courses")
//   })
// })

// In this lesson, you learned how to install Cypress and configure it for E2E testing. You also learned how to create spec files and write Cypress tests. 
// Along the way, you learned some Cypress best practices for getting elements. 
// Finally, you learned how to refactor and clean up your tests using a beforeEach hook.

// Declare a new namespace for Cypress
declare namespace Cypress {

  // Define a new Chainable interface that extends Cypress' default one
  interface Chainable {
    // Add new method to chainables 
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
  }
}
// Add the new command 
Cypress.Commands.add("getByData", (selector) => {
  // Implementation uses cy.get() and selector
  return cy.get(`[data-test=${selector}]`)

  // Returns the element so it can be chained
})
// Now can use:
// cy.getByData('username') 
// Instead of: 
// cy.get('[data-test="username"]')
// The command handles wrapping into a jQuery object 
// and returning a Chainable automatically

// Home page tests // contains header, subheader, pathname 

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })
// filter by section 
  context("Hero section", () => {
    // description
    it("the h1 contains the correct text", () => {
      // grab data through inspect and should contain words
      cy.getByData("hero-heading").contains(
        "Testing Next.js Applications with Cypress"
      )
    })
    // description
    it("the features on the homepage are correct", () => {
        // grab data through inspect and should contain words by line 0-2
      cy.get("dt").eq(0).contains("4 Courses")
      cy.get("dt").eq(1).contains("25+ Lessons")
      cy.get("dt").eq(2).contains("Free and Open Source")
    })
  })

  context("Courses section", () => {
    it("Course: Testing Your First Next.js Application", () => {
      // grab data by finding 'a' that contains get started and click 
      cy.getByData("course-0").find("a").contains("Get started").click()
      // pathname should be what is listed 
      cy.location("pathname").should("equal", "/testing-your-first-application")
    })

    it("Course: Testing Foundations", () => {
      cy.getByData("course-1").find("a").contains("Get started").click()
      cy.location("pathname").should("equal", "/testing-foundations")
    })

    it("Course: Cypress Fundamentals", () => {
      cy.getByData("course-2").find("a").contains("Get started").click()
      cy.location("pathname").should("equal", "/cypress-fundamentals")
    })
  })
})



// Newsletter 

// subscribe.cy.ts

describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    // visit page
    cy.visit("http://localhost:3000")
  })
// description
  it("allows users to subscribe to the email list", () => {
    // input data
    cy.getByData("email-input").type("tom@aol.com")
    // submit data
    cy.getByData("submit-button").click()
    // should be sucessfull
    cy.getByData("success-message").should("exist").contains("tom@aol.com")
  })

  it("does NOT allow an invalid email address", () => {
    // invalid email
    cy.getByData("email-input").type("tom")
    // submit data
    cy.getByData("submit-button").click()
    // successfull message saying unsuccessfull
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow already subscribed email addresses", () => {
    cy.getByData("email-input").type("john@example.com")
    cy.getByData("submit-button").click()
    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists. Please use a different email address.")
  })
})

// Writing our user journey test

describe("User Journey", () => {
  it("a user can find a course on the home page and complete the courses lessons", () => {
    cy.visit("http://localhost:3000")
        // Start the first course
    cy.getByData("course-0").find("a").contains('Get started').click()
        // Verify navigation to course page
    cy.location("pathname").should("equal", "/testing-your-first-application")
        // Move to first lesson
    cy.getByData("next-lesson-button").click()
        // Verify navigation to first lesson 
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/app-install-and-overview"
    )
    // Answer first challenge
    cy.getByData("challenge-answer-0").click()
        // Move to next lesson
    cy.getByData("next-lesson-button").should("exist").click()
        // Verify navigation to next lesson
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
        // Answer next challenge
    cy.getByData("challenge-answer-0").click()
        // Move to next lesson
    cy.getByData("next-lesson-button").should("exist").click()
        // Verify navigation to next lesson
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/setting-up-data-before-each-test"
    )
        // Answer next challenge
    cy.getByData("challenge-answer-0").click()
        // Move to next lesson
    cy.getByData("next-lesson-button").should("exist").click()
    // End up back on home page 
    cy.location("pathname").should("equal", "/")
  })
})



