describe('Subscribe User Form', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    }
    )
    context('Subscribing', () => {
    it('allows user to subscribe to newsletter', () => {

        cy.getByData('email-input').type('tom@aol.com')
        cy.getByData('submit-button').click()
        cy.get('success-message').should('exist').contains('tom@aol.com')

    })

    it.only('does not allow a user to subscribe to newsletter', () => {

        cy.getByData('email-input').type('john@example.com', {force: true})
        cy.getByData('submit-button').click({force: true})
        cy.getByData('success-message').should('not.exist')

    })
    })



})