import { fakerJA } from '@faker-js/faker'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import useResasApi from '@/composables/useResasApi'
import usePrefecturesStore from '@/stores/prefectures'

import type { Prefecture } from '@/types/prefecture'

const generateRandomPrefecture = (): Prefecture => ({
  prefCode: fakerJA.number.int({ min: 1, max: 47 }),
  prefName: fakerJA.location.state(),
  populationComposition: null,
  isSelected: false,
})

const tokyo = {
  prefCode: 13,
  prefName: '東京都',
  populationComposition: null,
  isSelected: false,
}

vi.mock('@/composables/useResasApi', () => ({
  default: vi.fn(() => ({
    isLoading: vi.fn,
    data: ref(1),
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
    const prefectureCount = fakerJA.number.int({ min: 1, max: 47 })

    // Initial state
    let prefectureCheckboxes = wrapper.findAllByTestClass('prefecture-checkbox')

    expect(prefecturesStore.prefectures).toHaveLength(0)
    expect(prefectureCheckboxes).toHaveLength(0)

    // After update
    prefecturesStore.prefectures = Array.from({ length: prefectureCount }, generateRandomPrefecture)
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
