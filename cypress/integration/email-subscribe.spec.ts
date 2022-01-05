const { _ } = Cypress

describe("Email Subscribe", () => {
  beforeEach(function () {
    cy.intercept("POST", "/api/subscribe").as("emailSubscribe")
  })

  const EMAIL = "tom@aol.com"
  const SUBSCRIBED_EMAIL = "john@example.com"

  context("UI Tests", () => {
    it("allows users to subscribe to the email list", function () {
      cy.visit("/")
      cy.getBySel("email-input").type(EMAIL)
      cy.getBySel("submit-button").click()
      cy.wait("@emailSubscribe")
      cy.getBySel("success-message").should("exist").contains(EMAIL)
      cy.getBySel("server-error-message").should("not.exist")
      cy.getBySel("error-message").should("not.exist")
    })

    it("does NOT allow a invalid email address", function () {
      cy.visit("/")
      cy.getBySel("email-input").type("tom")
      cy.getBySel("submit-button").click()
      cy.getBySel("success-message").should("not.exist")
    })

    it("the email input cannot be blank", function () {
      cy.visit("/")
      cy.getBySel("email-input")
      cy.getBySel("submit-button").click()
      cy.getBySel("success-message").should("not.exist")
      cy.getBySel("error-message").should("exist")
    })

    it("does NOT allow already subscribed email addresses", function () {
      cy.visit("/")
      cy.getBySel("email-input").type(SUBSCRIBED_EMAIL)
      cy.getBySel("submit-button").click()
      cy.getBySel("success-message").should("not.exist")
      cy.getBySel("server-error-message")
        .should("exist")
        .contains("already exists. Please use a different email address.")
    })
  })

  context("Network Tests", () => {
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

    it("the API returns a status code of 403 if the email has already been subscribed", function () {
      cy.request({
        method: "POST",
        url: "/api/subscribe",
        failOnStatusCode: false,
        body: { email: SUBSCRIBED_EMAIL },
      }).as("postEmailSubscribe")

      cy.get("@postEmailSubscribe").should((response) => {
        // @ts-ignore
        expect(response.status).to.eq(403)
      })
    })

    it("the request must be sent as content-type application/json", function () {
      cy.intercept("POST", "/api/subscribe", (req) => {
        req.headers["Content-Type"] = "text/html"
      }).as("wrongHeader")

      cy.visit("/")
      cy.getBySel("email-input").type(EMAIL)
      cy.getBySel("submit-button").click()

      cy.getBySel("success-message").should("not.exist")
      cy.getBySel("server-error-message")
        .should("exist")
        .contains("request must be sent as JSON")
    })
  })
})

export {}
