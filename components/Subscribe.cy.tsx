import Subscribe from "./Subscribe"

describe("Subscribe", () => {
  beforeEach(function () {
    cy.mount(<Subscribe />)
  })

  const EMAIL = "tom@aol.com"
  const SUBSCRIBED_EMAIL = "john@example.com"

  it("contains the correct placeholder text", () => {
    cy.get("input").should("have.attr", "placeholder", "Subscribe for Updates")
  })

  it("allows users to subscribe to the email list", function () {
    cy.intercept("POST", "/api/subscribe", {
      body: {
        message: `Success: ${EMAIL} has been successfully subscribed`,
      },
    }).as("emailSubscribe")
    cy.getBySel("email-input").type(EMAIL)
    cy.getBySel("submit-button").click()
    cy.wait("@emailSubscribe")
    cy.getBySel("success-message").should("exist").contains(EMAIL)
  })

  it("does NOT allow a invalid email address", function () {
    cy.getBySel("email-input").type("tom")
    cy.getBySel("submit-button").click()
    cy.getBySel("success-message").should("not.exist")
  })

  it("the email input cannot be blank", function () {
    cy.getBySel("email-input")
    cy.getBySel("submit-button").click()
    cy.getBySel("success-message").should("not.exist")
    cy.getBySel("error-message").should("exist")
  })

  it("does NOT allow already subscribed email addresses", function () {
    cy.intercept("POST", "/api/subscribe", {
      body: {
        message: `Error: ${SUBSCRIBED_EMAIL} already exists. Please use a different email address.`,
      },
    }).as("emailSubscribe")

    cy.getBySel("email-input").type(SUBSCRIBED_EMAIL)
    cy.getBySel("submit-button").click()

    cy.wait("@emailSubscribe")

    cy.getBySel("server-error-message")
      .should("exist")
      .contains(
        `Error: ${SUBSCRIBED_EMAIL} already exists. Please use a different email address.`
      )
  })
})
