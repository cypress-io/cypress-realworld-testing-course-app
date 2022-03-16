// @ts-nocheck

describe("Courses API", () => {
  it("returns the correct courses and all of their respective lessons", () => {
    cy.request("/api/courses").as("courses")
    cy.get("@courses").should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body["cypress-fundamentals"].lessons.length).to.eq(3)
      expect(response.body["testing-foundations"].lessons.length).to.eq(3)
      expect(
        response.body["testing-your-first-application"].lessons.length
      ).to.eq(3)
    })
  })
})

export {}
