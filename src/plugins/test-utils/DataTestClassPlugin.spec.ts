import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import DataTestClassPlugin from '@/plugins/test-utils/DataTestClassPlugin'
import { integerFactory, testClassFactory } from '@/utils/test/factories/faker'

const testClass = testClassFactory()
const elementCount = integerFactory({ min: 1, max: 10 })
const template = `<div data-test-class="${testClass}" />`.repeat(elementCount)
const TestComponent = defineComponent({ template })

describe.concurrent('DataTestClassPlugin', () => {
  it('can find all elements with findAllByTestClass', () => {
    const wrapper = mount(TestComponent)
    const { findAllByTestClass } = DataTestClassPlugin(wrapper)

    expect(findAllByTestClass(testClass)).toHaveLength(elementCount)
  })
})
