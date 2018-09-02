describe("My First Test", function() {
  it("Visits the Kitchen Sink", function() {
    cy.visit("./build/index.html")

    cy.contains("Options").click()
  })
})
