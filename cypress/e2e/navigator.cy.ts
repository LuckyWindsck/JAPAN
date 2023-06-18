describe('Navigator', () => {
  it('renders the population graph and checkboxes', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    }).as('fetchPrefectures')

    cy.intercept({
      method: 'GET',
      url: 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
    }).as('fetchPopulationComposition')

    // 1. Visits the app root url
    cy.visit('/')

    // 2. Shows the graph
    cy.get('[data-cy="graph"]').should('be.visible').screenshot('before', { overwrite: true })

    // 3. Fetches all prefectures from RESAS API
    cy.wait('@fetchPrefectures')

    // 4. Renders checkboxes of all prefectures
    cy.get('[data-cy="checkboxes"')
      .children('[data-cy="prefecture-checkbox"')
      .as('prefecture-checkboxes')
      .should('be.visible')
      .should('have.length', 47)

    // 5. Selects Tokyo by default
    cy.get('@prefecture-checkboxes')
      .find(':checked')
      .should('have.length', 1)
      .should('have.text', '東京')

    // 7. Fetches the population composition data of respective prefecture from RESAS-API
    cy.wait('@fetchPopulationComposition')

    // 8. Renders population transition on the line chart
    cy.get('[data-cy="graph"]').screenshot('after', { overwrite: true })

    cy.readFile('cypress/screenshots/before.png', 'base64').then((before) => {
      cy.readFile('cypress/screenshots/after.png', 'base64').should('not.equal', before)
    })
  })
})
