import { faker } from '@faker-js/faker'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import DataTestClassPlugin from '@/plugins/test-utils/DataTestClassPlugin'

const randomTestClass = faker.string.nanoid()
const randomElementCount = faker.number.int({ max: 10 })
const template = `<div data-test-class="${randomTestClass}" />`.repeat(randomElementCount)
const TestComponent = defineComponent({ template })

describe('DataTestClassPlugin', () => {
  it('can find all elements with findAllByTestClass', () => {
    const wrapper = mount(TestComponent)
    const { findAllByTestClass } = DataTestClassPlugin(wrapper)

    expect(findAllByTestClass(randomTestClass)).toHaveLength(randomElementCount)
  })
})
