import type { DOMWrapper } from '@vue/test-utils'

declare module '@vue/test-utils' {
  // eslint-disable-next-line import/prefer-default-export
  export class VueWrapper {
    // We MUST ensure that @/plugins/test-utils/DataTestClassPlugin is installed on VueWrapper
    // We install the plugin in @/configs/vitest/setup.ts
    findByTestClass(selector: string): DOMWrapper<Element>
    findAllByTestClass(selector: string): DOMWrapper<Element>[]
  }
}
