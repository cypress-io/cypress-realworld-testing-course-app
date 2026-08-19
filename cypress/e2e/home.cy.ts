describe('Home page', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000')
  })
  context('Text check', () => { 
  it.only('h1 contains text', () => {
   
    cy.getByData("hero-heading").contains('Testing Next.js Applications with Cypress')
  })

  it('the features on the home page are correct', ()=>{
 
    cy.get('dt').eq(0).contains('4 Courses')

  })
})
})