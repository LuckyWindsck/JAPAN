import type { VueWrapper } from '@vue/test-utils'

const DataTestClassPlugin = (wrapper: VueWrapper) => {
  const findByTestClass: typeof wrapper.findByTestClass = (selector) =>
    wrapper.find(`[data-test-class="${selector}"]`)

  const findAllByTestClass: typeof wrapper.findAllByTestClass = (selector) =>
    wrapper.findAll(`[data-test-class="${selector}"]`)

  return {
    findByTestClass,
    findAllByTestClass,
  }
}

export default DataTestClassPlugin
