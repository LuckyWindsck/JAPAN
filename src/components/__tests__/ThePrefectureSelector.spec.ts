import { fakerJA } from '@faker-js/faker'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import usePrefecturesStore from '@/stores/prefectures'

import ThePrefectureSelector from '../ThePrefectureSelector.vue'

import type { Prefecture } from '../../types/prefecture'
import type { VueWrapper } from '@vue/test-utils'

const generateRandomPrefecture = (): Prefecture => ({
  prefCode: fakerJA.number.int({ min: 1, max: 47 }),
  prefName: fakerJA.location.state(),
  populationComposition: null,
  isSelected: false,
})

const generateRandomPrefectures = (prefectureCount: number) =>
  Array.from({ length: prefectureCount }, generateRandomPrefecture)

const findAllPrefectureCheckboxes = (wrapper: VueWrapper) =>
  wrapper.findAll('[data-test-class="prefecture-checkbox"]')

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
    let prefectureCheckboxes = findAllPrefectureCheckboxes(wrapper as VueWrapper)

    expect(prefecturesStore.prefectures).toHaveLength(0)
    expect(prefectureCheckboxes).toHaveLength(0)

    // After update
    prefecturesStore.prefectures = generateRandomPrefectures(prefectureCount)
    await nextTick()
    prefectureCheckboxes = findAllPrefectureCheckboxes(wrapper as VueWrapper)

    expect(prefecturesStore.prefectures).toHaveLength(prefectureCount)
    expect(prefectureCheckboxes).toHaveLength(prefectureCount)
  })
})
