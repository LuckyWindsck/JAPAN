import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders data presenter and prefecture selector', () => {
    const wrapper = mount(HomeView)
    const dataPresenter = wrapper.find('[data-test-class="data-presenter"]')
    const prefectureSelector = wrapper.find('[data-test-class="prefecture-selector"]')

    expect(dataPresenter.exists()).toBe(true)
    expect(prefectureSelector.exists()).toBe(true)
  })
})
