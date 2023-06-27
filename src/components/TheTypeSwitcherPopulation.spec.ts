import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheTypeSwitcherPopulation from '@/components/TheTypeSwitcherPopulation.vue'

describe.concurrent('TheTypeSwitcherPopulation', () => {
  it('renders 4 radio buttons for labels', () => {
    const wrapper = mount(TheTypeSwitcherPopulation)

    const radioButtons = wrapper.findAllByTestClass('data-type-radio-button')

    expect(radioButtons).toHaveLength(4)
  })
})
