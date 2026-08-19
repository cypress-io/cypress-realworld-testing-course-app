describe('Login user', () => {
    it('Should log in', () => {
        cy.loginByApi("Won Thein", "password12").then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})