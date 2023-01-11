describe("newsletter subscribe form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })
    it("allows user to subscribe to the email list", () => {
        cy.getByData("email-input").type("justyna@justyna.com")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("exist").contains("justyna@justyna.com")
    })

    it("does NOT allow invalid email address", () => {
        cy.getByData("email-input").type("justynom")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("not.exist")
    })

    it("email already exists", () => {
        cy.getByData("email-input").type("john@example.com ")
        cy.getByData("submit-button").click()
        cy.getByData("server-error-message").should("exist").contains("already exists. Please use a different email address.")
    })

})