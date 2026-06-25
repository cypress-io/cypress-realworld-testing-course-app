describe('User-Journey', () => {
    beforeEach(()=>{
     cy.visit('http://localhost:3000/')
   
    })

    context("User-Journey Courses", ()=>{

        it.only("User-journey for course: Testing your first Next.js Application", ()=>{
            cy.getByData("course-0").find("a").contains("Get started").click()
            cy.location("pathname").should("equal", "/testing-your-first-application")
            cy.getByData("next-lesson-button").click()
            cy.location("pathname").should("equal", "/testing-your-first-application/app-install-and-overview")
            cy.getByData("challenge-answer-0").click()
            cy.getByData("next-lesson-button").click()
            cy.location("pathname").should("equal", "/testing-your-first-application/installing-cypress-and-writing-our-first-test")
            cy.getByData("challenge-answer-0").click()
            cy.getByData("next-lesson-button").click()
            cy.location("pathname").should("equal", "/testing-your-first-application/setting-up-data-before-each-test")
            cy.getByData("challenge-answer-0").click()
            cy.getByData("next-lesson-button").click()
            cy.location("pathname").should("equal", '/')
            // testing
            // testing 123
        })
        






    })

})
