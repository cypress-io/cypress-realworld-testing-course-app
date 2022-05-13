import Subscribe from "./Subscribe"

describe("Subscribe", () => {
  it("contains the correct placeholder text", () => {
    cy.mount(<Subscribe />)
    cy.get("input").should("have.attr", "placeholder", "Subscribe for Updates")
  })
})
