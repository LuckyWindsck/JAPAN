import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import useResasApi from '@/composables/useResasApi'
import usePrefecturesStore from '@/stores/prefectures'
import { integerFactory, prefectureCountInJapan } from '@/utils/test/factories/faker'
import prefecturesFactory from '@/utils/test/factories/prefectures'
import { tokyo } from '@/utils/test/fixtures/prefectures'

tokyo.populationComposition = null
tokyo.isSelected = false

vi.mock('@/composables/useResasApi', () => ({
  default: vi.fn(() => ({
    isLoading: vi.fn,
    data: ref(),
  })),
}))

describe('ThePrefectureSelector', () => {
  it('renders correct number of prefecture checkboxes', async () => {
    const wrapper = mount(ThePrefectureSelector, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    const prefecturesStore = usePrefecturesStore()
    const prefectureCount = integerFactory({ min: 1, max: prefectureCountInJapan })

    // Initial state
    let prefectureCheckboxes = wrapper.findAllByTestClass('prefecture-checkbox')

    expect(prefecturesStore.prefectures).toHaveLength(0)
    expect(prefectureCheckboxes).toHaveLength(0)

    // After update
    prefecturesStore.prefectures = prefecturesFactory(prefectureCount)
    await nextTick()
    prefectureCheckboxes = wrapper.findAllByTestClass('prefecture-checkbox')

    expect(prefecturesStore.prefectures).toHaveLength(prefectureCount)
    expect(prefectureCheckboxes).toHaveLength(prefectureCount)
  })

  it('fetches population composition data', async () => {
    const wrapper = mount(ThePrefectureSelector, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              prefectures: {
                prefectures: [tokyo],
              },
            },
          }),
        ],
      },
    })
    const prefecturesStore = usePrefecturesStore()
    const prefectureCheckboxes = wrapper.findAllByTestClass('prefecture-checkbox')
    const tokyoCheckbox = prefectureCheckboxes[0].find('input[type="checkbox"]')

    // Should fetch data only when the checkbox is checked and population composition does not exist
    prefecturesStore.prefectures[0].populationComposition = null
    await tokyoCheckbox.setValue(true) // Check for the first time

    expect(useResasApi).toHaveBeenCalledTimes(1)

    // Should not fetch data when population composition already exists, even if checkbox is checked
    prefecturesStore.prefectures[0].populationComposition = { boundaryYear: 1, data: [] }
    await tokyoCheckbox.setValue(false) // Uncheck
    await tokyoCheckbox.setValue(true) // Check again

    expect(useResasApi).toHaveBeenCalledTimes(1)
  })
})
