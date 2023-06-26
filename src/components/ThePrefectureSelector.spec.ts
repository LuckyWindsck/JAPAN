import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import useResasApi from '@/composables/useResasApi'
import usePrefecturesStore from '@/stores/prefectures'
import { integerFactory, prefectureCountInJapan } from '@/utils/test/factories/faker'
import prefactureFactory from '@/utils/test/factories/prefecture'
import prefecturesFactory from '@/utils/test/factories/prefectures'
import { nonNullPopulationComposition } from '@/utils/test/fixtures/prefectures'

vi.mock('@/composables/useResasApi', () => ({
  default: vi.fn<never, Partial<ReturnType<typeof useResasApi>>>(() => ({
    isLoading: ref(true),
    data: ref(),
  })),
}))

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
    const checkboxTexts = prefectureCheckboxes.map((prefectureCheckbox) =>
      prefectureCheckbox.text(),
    )
    const generatedPrefectureNames = generatedPrefectures.map(
      (generatedPrefecture) => generatedPrefecture.prefName,
    )

    expect(checkboxTexts).toEqual(expect.arrayContaining(generatedPrefectureNames))
    expect(generatedPrefectureNames).toEqual(expect.arrayContaining(checkboxTexts))
  })

  it('fetches population composition data', async () => {
    const wrapper = mount(ThePrefectureSelector, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              prefectures: {
                prefectures: [
                  prefactureFactory({
                    populationComposition: null,
                    isSelected: false,
                  }),
                ],
              },
            },
          }),
        ],
      },
    })
    const prefecturesStore = usePrefecturesStore()
    const prefectureCheckboxes = wrapper.findAllByTestClass('prefecture-checkbox')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- This must exist, because that is how we set the initial state.
    const prefectureFound = prefecturesStore.prefectures.find(
      (prefecture) => !prefecture.isSelected && prefecture.populationComposition === null,
    )!
    const testPrefectureName = prefectureFound.prefName

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- It's tested in the 'Check for label text rendering' part of test 'renders correct number of prefecture checkboxes'
    const prefectureCheckboxFound = prefectureCheckboxes.find((checkbox) =>
      checkbox.text().includes(testPrefectureName),
    )!

    const prefectureCheckboxComponent = prefectureCheckboxFound
    const checkbox = prefectureCheckboxComponent.find('input[type="checkbox"]')

    // Should fetch data only when the checkbox is checked and population composition does not exist
    await checkbox.setValue(true) // Check for the first time
    expect(useResasApi).toHaveBeenCalledTimes(1)

    // Should not fetch data when population composition already exists, even if checkbox is checked
    prefectureFound.populationComposition = nonNullPopulationComposition
    await checkbox.setValue(false) // Uncheck
    await checkbox.setValue(true) // Check again

    expect(useResasApi).toHaveBeenCalledTimes(1)
  })
})
