import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppCheckboxPrefecture from '@/components/AppCheckboxPrefecture.vue'
import { prefactureFactory } from '@/utils/test/factories/prefecture'

describe.concurrent('AppCheckboxPrefecture', () => {
  it('renders prefecture name', () => {
    const prefecture = prefactureFactory()
    const wrapper = mount(AppCheckboxPrefecture, { props: prefecture })

    expect(wrapper.text()).toContain(prefecture.prefName)
  })
})
