describe("Email Subscribe", function () {
  it("allows users to subscribe to our email list", function () {
    cy.visit("/")
    cy.getBySel("email-input").type("tom@aol.com")
    cy.getBySel("submit-button").click()

    cy.location("pathname").should("eq", "/api/subscribe")
  })
})
