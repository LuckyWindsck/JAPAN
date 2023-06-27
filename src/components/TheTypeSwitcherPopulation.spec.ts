import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheTypeSwitcherPopulation from '@/components/TheTypeSwitcherPopulation.vue'
import { useConstants } from '@/composables/useConstants'

const { defaultSelectedDataType, populationCompositionDataLabels } = useConstants()

describe.concurrent('TheTypeSwitcherPopulation', () => {
  it('renders radio buttons for labels', () => {
    const wrapper = mount(TheTypeSwitcherPopulation, {
      global: {
        provide: { selectedDataType: defaultSelectedDataType },
      },
    })
    const labelCount = populationCompositionDataLabels.length

    const radioButtons = wrapper.findAllByTestClass('data-type-radio-button')

    expect(radioButtons).toHaveLength(labelCount)
  })
})
