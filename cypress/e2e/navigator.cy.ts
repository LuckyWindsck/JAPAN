type Alias = string
type Path = string
type Selector = string

const selectors: Record<string, Selector> = {
  graph: '[data-test-class="population-transition-line-chart"]',
  prefectureCheckbox: '[data-test-class="prefecture-checkbox"]',
}

const apis: [Alias, Path][] = [
  ['fetchPrefectures', '/api/v1/prefectures'],
  ['fetchPopulationComposition', '/api/v1/population/composition/perYear?*'],
]

const baseURL = Cypress.env('VITE_RESAS_API_BASE_URL') as string

describe('Navigator', () => {
  it('renders the population graph and checkboxes', () => {
    apis.forEach(([alias, path]) => {
      cy.intercept({ method: 'GET', url: new URL(path, baseURL).toString() }).as(alias)
    })

    // 1. Visits the app root url
    cy.visit('/')

    // 2. Shows the graph
    cy.get(selectors.graph)
      .should('be.visible')
      .as('graph')
      .screenshot('before', { overwrite: true })

    // 3. Fetches all prefectures from RESAS API
    cy.wait('@fetchPrefectures')

    // 4. Renders checkboxes of all prefectures
    cy.get(selectors.prefectureCheckbox)
      .as('prefecture-checkboxes')
      .should('be.visible')
      .should('have.length', 47)

    // 5. Selects Tokyo by default
    cy.get('@prefecture-checkboxes')
      .find(':checked')
      .should('have.length', 1)
      .invoke('attr', 'id')
      .then((id) => cy.get(`label[for="${id ?? ''}"]`))
      .should('contain.text', '東京')

    // 7. Fetches the population composition data of respective prefecture from RESAS-API
    cy.wait('@fetchPopulationComposition')

    // 8. Renders population transition on the line chart
    cy.get(selectors.graph).screenshot('after', { overwrite: true })

    cy.readFile('cypress/screenshots/before.png', 'base64')
      .then((before) => {
        // When using the following assertion approach:
        // > cy.readFile('cypress/screenshots/after.png', 'base64').should('not.equal', before)
        // Cypress will display a lengthy base64 string in the test result output if the assertion
        // passes. We avoid it by comparing the two base64 string directly.
        cy.readFile('cypress/screenshots/after.png', 'base64').should((after) => {
          expect(before !== after, 'screenshot comparison').equal(true)
        })
      })
      .log('↑ assert that line chart has been changed by comparing screenshots.')
  })
})
