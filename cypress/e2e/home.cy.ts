describe('Homepage', () => {
 beforeEach(()=>{
  cy.visit('http://localhost:3000/')

 })


context("Hero Section", ()=>{
  it('the h1 contains the correct text', () => {
    cy.getByData("hero-heading").contains("Testing Next.js Applications with Cypress")
  })
  
  it("the features on the homepage are correct", () => {
    cy.get("dt").eq(0).contains("4 Courses")
    cy.get("dt").eq(1).contains("25+ Lessons")
    cy.get("dt").eq(2).contains("Free and Open Source")
  
  })
  })


  context("Courses Section", ()=> {

it.only("Course: Testing your first Next.js Application", ()=>{
  cy.getByData("course-0").find("a").contains("Get started").click()
  cy.location("pathname").should("equal", "/testing-your-first-application")
})


it.only("Course: Testing foundations", ()=>{
cy.getByData("course-1").find("a").contains("Get started").click()
cy.location("pathname").should("equal", "/testing-foundations")
})

it.only("Course: Cypress Fundamentals", ()=>{
  cy.getByData("course-2").find("a").contains("Get started").click()
  cy.location("pathname").should("equal", "/cypress-fundamentals")

})

  })

 
})



