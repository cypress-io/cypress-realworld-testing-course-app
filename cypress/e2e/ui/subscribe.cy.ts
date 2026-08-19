describe('Newsletter subscribe form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Allows user to subscribe the new email list', () => {
        cy.getByData('email-input').type('won@gmail.com')
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('exist').contains('won@gmail.com')
    })

    it('Does not allow invalid email address', () => {
        cy.getByData('email-input').type('wongmailcom')
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('not.exist')
    })

     it.only('Does not allow already subscribed email address', () => {
        cy.getByData('email-input').type('john@example.com')
        cy.getByData('submit-button').click()
        cy.getByData('server-error-message').should('exist').contains('already exists. Please use a different email address.')
    })
})
