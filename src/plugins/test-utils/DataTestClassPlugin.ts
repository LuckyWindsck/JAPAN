import type { VueWrapper } from '@vue/test-utils'

const DataTestClassPlugin = (wrapper: VueWrapper) => {
  const findAllByTestClass: typeof wrapper.findAllByTestClass = (selector) => {
    const dataSelector = `[data-test-class="${selector}"]`

    return wrapper.findAll(dataSelector)
  }

  return {
    findAllByTestClass,
  }
}

export default DataTestClassPlugin
