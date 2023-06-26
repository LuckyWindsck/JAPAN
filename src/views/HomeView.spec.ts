import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import useResasApi from '@/composables/useResasApi'
import HomeView from '@/views/HomeView.vue'

vi.mock('@/composables/useResasApi', () => ({ default: vi.fn() }))

describe.concurrent('HomeView', () => {
  it('renders data presenter and prefecture selector', () => {
    // We need to stub ThePrefectureSelectore in order to pass the test. To do that, we can make a
    // default stub. Moreever, we think that we can shallow mount the whole HomeView view component.
    // So we set { shallow: true } for this mounting.
    const wrapper = mount(HomeView, {
      shallow: true,
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })

    expect(useResasApi).toHaveBeenCalledTimes(1)

    const dataPresenter = wrapper.findAllByTestClass('data-presenter')
    expect(dataPresenter).toHaveLength(1)

    const prefectureSelector = wrapper.findAllByTestClass('prefecture-selector')
    expect(prefectureSelector).toHaveLength(1)
  })
})
