describe('Home page', () => {

  beforeEach(() => {
        cy.visit('http://localhost:3000')
  })

  it('The h1 contain the right text', () => {
    cy.get('[data-test="hero-heading"]').contains('Testing Next.js Applications with Cypress')
  })

  it('The feature on the homepage are correct', () => {
    cy.get('dt').eq(0).contains('4 Courses')
        cy.get('dt').eq(1).contains('25+ Lessons')

  })
})