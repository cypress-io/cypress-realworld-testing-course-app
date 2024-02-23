describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscribe to the email list", () => {
    cy.getByData("email-input").type("gferraz@santacruz.g12.br")
    cy.getByData("submit-button").click()
    cy.getByData("success-message")
      .should("exist")
      .contains("gferraz@santacruz.g12.br")
  })

  it("does NOT allows an invalid email address ", () => {
    cy.getByData("email-input").type("gferraz")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow an already registered email address", () => {
    cy.getByData("email-input").type("john@example.com")
    cy.getByData("submit-button").click()
    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists. Please use a different email address")
  })
})
