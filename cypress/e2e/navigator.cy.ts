type Alias = string
type Path = string
type Selector = string

const selectors: Record<string, Selector> = {
  graph: '[data-test-class="population-transition-line-chart"]',
  prefectureCheckbox: '[data-test-class="prefecture-checkbox"]',
  dataTypeRadioButton: '[data-test-class="data-type-radio-button"]',
}

const apis: [Alias, Path][] = [
  ['fetchPrefectures', '/api/v1/prefectures'],
  ['fetchPopulationComposition', '/api/v1/population/composition/perYear?*'],
]

const baseURL = Cypress.env('VITE_RESAS_API_BASE_URL') as string

const compareScreenshots = (fileA: string, fileB: string) => {
  cy.readFile(`cypress/screenshots/${fileA}.png`, 'base64')
    .then((screenshotA: string) => {
      // When using the following assertion approach:
      // > cy.readFile(`cypress/screenshots/${b}.png`, 'base64').should('not.equal', a)
      // Cypress will display a lengthy base64 string in the test result output if the assertion
      // passes. We avoid it by comparing the two base64 string directly.
      cy.readFile(`cypress/screenshots/${fileB}.png`, 'base64').should((screenshotB: string) => {
        expect(screenshotA !== screenshotB, 'screenshot comparison').equal(true)
      })
    })
    .log('↑ assert that line chart has been changed by comparing screenshots.')
}

describe('Navigator', () => {
  it('renders the population graph and checkboxes', () => {
    apis.forEach(([alias, path]) => {
      cy.intercept({ method: 'GET', url: new URL(path, baseURL).toString() }).as(alias)
    })

    // 1. Visits the app root url
    cy.visit('/')

    // 2. Shows the graph
    cy.get(selectors.graph).should('be.visible').screenshot('initial', { overwrite: true })

    // 3. Fetches all prefectures from RESAS API
    cy.wait('@fetchPrefectures')

    // 4. Renders checkboxes of all prefectures
    cy.get(selectors.prefectureCheckbox).should('be.visible').should('have.length', 47)

    // 5. Selects Tokyo by default
    cy.get(selectors.prefectureCheckbox)
      .find(':checked')
      .should('have.length', 1)
      .invoke('attr', 'id')
      .then((id) => cy.get(`label[for="${id ?? ''}"]`))
      .should('contain.text', '東京')

    // 6. Fetches the population composition data of respective prefecture from RESAS-API
    cy.wait('@fetchPopulationComposition')

    // 7. Should render population composition of Tokyo
    cy.get(selectors.graph).screenshot('after-fetching-prefectures', { overwrite: true })

    compareScreenshots('initial', 'after-fetching-prefectures')

    // 8. Select prefecture -> Fetch data -> Should render data of selected prefecture
    cy.get(selectors.prefectureCheckbox).eq(0).click()
    cy.wait('@fetchPopulationComposition')
    cy.get(selectors.graph).screenshot('after-checking-prefecture', { overwrite: true })

    compareScreenshots('after-fetching-prefectures', 'after-checking-prefecture')

    // 9. Select the same prefecture -> Should not render data of selected prefecture
    cy.get(selectors.prefectureCheckbox).eq(0).click()
    cy.get(selectors.graph).screenshot('after-unchecking-prefecture', { overwrite: true })

    compareScreenshots('after-checking-prefecture', 'after-unchecking-prefecture')

    // 10. Select type of population composition -> Should render different type of data
    cy.get(selectors.dataTypeRadioButton).eq(1).click()
    cy.get(selectors.graph).screenshot('after-switching-data-type', { overwrite: true })

    compareScreenshots('after-unchecking-prefecture', 'after-switching-data-type')
  })
})
