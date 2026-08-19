describe("Simple api testing", () => {
  it("Should fetch", () => {
    cy.request("GET", "https://dummyapi.io/explorer").then((response) => {
      expect(response.status).to.eq(200)
    })
  })
  it("Check response limit is 10", () => {
    cy.visit("https://dummyapi.io/explorer")
    cy.intercept({
      path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10",
    }).as("commentsPath")
    cy.get(".flex > :nth-child(5)").click()
    cy.wait("@commentsPath").then((intercept) => {
      cy.log(intercept.response.body.limit)
      expect(intercept.response.body.limit).eq(10)
    })
  })
  it("Check first object id is ", () => {
    cy.visit("https://dummyapi.io/explorer")
    cy.intercept({
      path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10",
    }).as("commentsPath")
    cy.get(".flex > :nth-child(5)").click()
    cy.wait("@commentsPath").then((intercept) => {
      cy.log(intercept.response.body.data[0].id)
      expect(intercept.response.body.data[0].id).to.eq(
        "66f5ca7111c3e076c0f750de"
      )
    })
  })
})

describe("API Testing with Cypress", () => {
  it("Should fetch a list of users", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/users").then(
      (response) => {
        cy.log(`Here is the response ${response.body[0]}`)
        // Assert the response status
        expect(response.status).to.eq(200)

        // Assert the response body
        expect(response.body).to.have.length(10) // Assuming 10 users
        expect(response.body[0]).to.have.property("name")
      }
    )
  })
  it("Should create a new user", () => {
    cy.fixture("example").then((data) => {
      cy.request(
        "POST",
        "https://jsonplaceholder.typicode.com/users",
        data
      ).then((response) => {
        // Assert the response status
        expect(response.status).to.eq(201)

        // Assert the response body
        expect(response.body).to.have.property("id") // Assuming the API generates an ID
        cy.log(JSON.stringify(response.body))
        expect(response.body.name).to.eq("Using fixtures to represent data")
        expect(response.body.email).to.eq("hello@cypress.io")
        expect(response.body.newUser.email).to.eq("won.thein@example.com")
      })
    })
  })
})

describe("API test with fixtures", () => {
  it("Should create a new user using fixtures", () => {
    cy.fixture("example").then((user) => {
      cy.log(`user from fixture ${JSON.stringify(user)}`)
      cy.request(
        "POST",
        "https://jsonplaceholder.typicode.com/users",
        user
      ).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.newUser.name).to.eq("Won Thein")
        cy.log(JSON.stringify(response.body.newUser))
      })
    })
  })
})

describe("Chained API Requests", () => {
  it("Should create and fetch a user", () => {
    const newUser = { name: "Mark Smith", email: "mark.smith@example.com" }

    cy.request(
      "POST",
      "https://jsonplaceholder.typicode.com/users",
      newUser
    ).then((postResponse) => {
      expect(postResponse.status).to.eq(201)
      const userId = postResponse.body.id

      // Need to find out why it doesn't work
      //   cy.request(
      //     "GET",
      //     `https://jsonplaceholder.typicode.com/users/${userId}`
      //   ).then((getResponse) => {
      //     expect(getResponse.status).to.eq(200)
      //     expect(getResponse.body.name).to.eq("Mark Smith")
      //   })
    })
  })
})

// cypress/tests/api/api-users.spec.ts
describe("get users", () => {
  context("GET /users", () => {
    it.only("gets a list of users", () => {
      cy.request("GET", "https://jsonplaceholder.typicode.com/users").then((response) => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body[0]))
        expect(response.body).length.to.be.greaterThan(1)
      })
    })
  })
})
