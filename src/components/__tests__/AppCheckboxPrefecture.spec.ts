import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { fakerJA } from '@faker-js/faker'
import AppCheckboxPrefecture from '../AppCheckboxPrefecture.vue'

describe('AppCheckboxPrefecture', () => {
  it('renders prefecture name', () => {
    const prefecture = {
      prefCode: fakerJA.number.int({ min: 1, max: 47 }),
      prefName: fakerJA.location.state(),
    }

    const wrapper = mount(AppCheckboxPrefecture, { props: prefecture })
    expect(wrapper.text()).toContain(prefecture.prefName)
  })
})
