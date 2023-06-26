import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import { useResasApi } from '@/composables/useResasApi'
import { usePrefecturesStore } from '@/stores/prefectures'
import { integerFactory, prefectureCountInJapan } from '@/utils/test/factories/faker'
import { prefactureFactory } from '@/utils/test/factories/prefecture'
import { prefecturesFactory } from '@/utils/test/factories/prefectures'
import { nonNullPopulationComposition } from '@/utils/test/fixtures/prefectures'
import { assertions } from '@/utils/test/helpers/assertions'

vi.mock('@/composables/useResasApi', () => ({ useResasApi: vi.fn() }))

describe.concurrent('ThePrefectureSelector', () => {
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

    expect(prefectureCheckboxes).toHaveLength(0)

    // After update
    const generatedPrefectures = prefecturesFactory(prefectureCount)
    prefecturesStore.prefectures = generatedPrefectures
    await nextTick() // Await for component update
    prefectureCheckboxes = wrapper.findAllByTestClass('prefecture-checkbox')

    expect(prefectureCheckboxes).toHaveLength(prefectureCount)

    // Check for label text rendering
    const checkboxTexts = prefectureCheckboxes.map((checkbox) => checkbox.text())
    const generatedPrefectureNames = generatedPrefectures.map(({ prefName }) => prefName)

    assertions.arrayWithExactContents(generatedPrefectureNames, checkboxTexts)
  })

  it('fetches population composition data', async () => {
    const prefecture = prefactureFactory({
      populationComposition: null,
      isSelected: false,
    })
    const wrapper = mount(ThePrefectureSelector, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              prefectures: {
                prefectures: [prefecture],
              },
            },
          }),
        ],
      },
    })
    const checkbox = wrapper.findByTestClass('prefecture-checkbox').find('input[type="checkbox"]')

    // Should fetch data only when the checkbox is checked and population composition does not exist
    await checkbox.setValue(true) // Check for the first time
    expect(useResasApi).toHaveBeenCalledTimes(1)

    // Should not fetch data when population composition already exists, even if checkbox is checked
    prefecture.populationComposition = nonNullPopulationComposition
    await checkbox.setValue(false) // Uncheck
    await checkbox.setValue(true) // Check again

    expect(useResasApi).toHaveBeenCalledTimes(1)
  })
})
