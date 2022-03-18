describe("Mock SSR", () => {
  it("displays the correct book data from the mocked server response", () => {
    cy.visit("http://localhost:3000")

    cy.getBySel("book-title").contains("Lord of the Rings")
    cy.getBySel("book-description").contains(
      "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien."
    )
  })
})
