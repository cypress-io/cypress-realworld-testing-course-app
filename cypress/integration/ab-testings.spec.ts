describe("A/B Testing with Google Optimize", () => {
  it("loads the original content for experiment 0", () => {
    cy.setCookie("ab-optimize", "MFY6FYIySra93KqA3vs9UQ.0")
    cy.visit(
      "https://edge-functions-ab-testing-google-optimize.vercel.app/about"
    )
    cy.get(".text_body__vKeGm").contains("This is the original about page")

    cy.visit(
      "https://edge-functions-ab-testing-google-optimize.vercel.app/marketing"
    )

    cy.get(".text_body__vKeGm").contains("This is the original marketing page")
  })

  it("loads the variant content for experiment 1", () => {
    cy.setCookie("ab-optimize", "MFY6FYIySra93KqA3vs9UQ.1")
    cy.visit(
      "https://edge-functions-ab-testing-google-optimize.vercel.app/about"
    )
    cy.get(".text_body__vKeGm").contains(
      "You're currently looking at the variant Variant 1"
    )

    cy.visit(
      "https://edge-functions-ab-testing-google-optimize.vercel.app/marketing"
    )

    cy.get(".text_body__vKeGm").contains(
      "You're currently looking at the variant Variant 1"
    )
  })

  it.only("the send event button sends a custom GTM event", () => {
    cy.setCookie("ab-optimize", "MFY6FYIySra93KqA3vs9UQ.1")
    cy.visit(
      "https://edge-functions-ab-testing-google-optimize.vercel.app/about"
    )

    cy.window().its("dataLayer").should("have.length", 5)

    cy.get("button").click()

    cy.window().its("dataLayer").should("have.length", 6)
  })
})
