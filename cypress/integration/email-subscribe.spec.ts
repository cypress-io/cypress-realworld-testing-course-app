const { _ } = Cypress

describe("Email Subscribe", () => {
  beforeEach(function () {
    cy.intercept("POST", "/api/subscribe").as("emailSubscribe")
  })

  const EMAIL = "tom@aol.com"

  describe("UI Tests", () => {
    it("allows users to subscribe to the email list", function () {
      cy.visit("/")
      cy.getBySel("email-input").type(EMAIL)
      cy.getBySel("submit-button").click()
      cy.wait("@emailSubscribe")
      cy.getBySel("email-success-message").should("exist").contains(EMAIL)
      cy.getBySel("email-error-message").should("not.exist")
    })

    it("does NOT allow a bad email address", function () {
      cy.visit("/")
      cy.getBySel("email-input").type("tom")
      cy.getBySel("submit-button").click()
      cy.getBySel("email-success-message").should("not.exist")
    })

    it("the email input cannot be blank", function () {
      cy.visit("/")
      cy.getBySel("email-input")
      cy.getBySel("submit-button").click()
      cy.getBySel("email-success-message").should("not.be.visible")
      cy.getBySel("email-error-message").should("exist")
    })
  })

  describe("Network Tests", () => {
    it("the /api/subscribe endpoint only accepts POST requests", function () {
      const requests = ["GET", "PUT", "DELETE", "PATCH"]

      _.each(requests, (request) => {
        cy.request({
          method: request,
          url: "/api/subscribe",
          failOnStatusCode: false,
        }).as("getEmailSubscribe")

        cy.get("@getEmailSubscribe").should((response) => {
          // @ts-ignore
          expect(response.status).to.eq(400)
        })
      })
    })

    it("the API returns a status code of 400 if there is NOT an email address included in the request", function () {
      cy.request({
        method: "POST",
        url: "/api/subscribe",
        failOnStatusCode: false,
      }).as("postEmailSubscribe")

      cy.get("@postEmailSubscribe").should((response) => {
        // @ts-ignore
        expect(response.status).to.eq(400)
      })
    })

    it("the API returns a status code of 200 if there IS an email address included in the request", function () {
      cy.request({
        method: "POST",
        url: "/api/subscribe",
        failOnStatusCode: false,
        body: { email: EMAIL },
      }).as("postEmailSubscribe")

      cy.get("@postEmailSubscribe").should((response) => {
        // @ts-ignore
        expect(response.status).to.eq(200)
      })
    })
  })
})
