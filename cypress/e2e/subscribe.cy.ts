describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscribe to the email list", () => {
    const email = "tom@aol.com"
    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("exist").contains(email)
  })

  it("does NOT allow an invalid email address", () => {
    const email = "tom"
    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow an an already subscribed email address", () => {
    const email = "john@example.com"
    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()
    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists. Please use a different email address.")
  })
})
