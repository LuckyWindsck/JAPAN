/* eslint-disable @typescript-eslint/no-unused-vars */
import type { VueWrapper } from '@vue/test-utils'

const DataTestClassPlugin = (wrapper: VueWrapper) => {
  const findByTestClass: typeof wrapper.findByTestClass = (selector) => {
    // To be implemented
  }

  const findAllByTestClass: typeof wrapper.findAllByTestClass = (selector) =>
    wrapper.findAll(`[data-test-class="${selector}"]`)

  return {
    findByTestClass,
    findAllByTestClass,
  }
}

export default DataTestClassPlugin
