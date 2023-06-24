import { fakerJA } from '@faker-js/faker'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppCheckboxPrefecture from '@/components/AppCheckboxPrefecture.vue'

describe('AppCheckboxPrefecture', () => {
  it('renders prefecture name', () => {
    const prefecture = {
      prefCode: fakerJA.number.int({ min: 1, max: 47 }),
      prefName: fakerJA.location.state(),
      isSelected: false,
    }

    const wrapper = mount(AppCheckboxPrefecture, { props: prefecture })

    expect(wrapper.text()).toContain(prefecture.prefName)
  })
})
