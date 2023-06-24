/* eslint-disable @typescript-eslint/no-unused-vars */
import type { VueWrapper } from '@vue/test-utils'

const DataTestClassPlugin = (wrapper: VueWrapper) => {
  const findAllByTestClass = (selector) => {
    // TO BE IMEPLEMENTED
  }

  return {
    findAllByTestClass,
  }
}

export default DataTestClassPlugin
