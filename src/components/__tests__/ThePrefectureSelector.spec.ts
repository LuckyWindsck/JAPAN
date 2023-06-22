import { fakerJA } from '@faker-js/faker'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ThePrefectureSelector from '../ThePrefectureSelector.vue'

const generateRandomPrefecture = () => ({
  prefCode: fakerJA.number.int({ min: 1, max: 47 }),
  prefName: fakerJA.location.state(),
})

describe('ThePrefectureSelector', () => {
  it('renders correct number of prefecture checkboxes', () => {
    const prefectureCount = fakerJA.number.int({ min: 1, max: 47 })
    const prefectures = Array.from({ length: prefectureCount }, generateRandomPrefecture)

    const wrapper = mount(ThePrefectureSelector, { props: { prefectures } })
    const prefectureCheckboxes = wrapper.findAll('[data-test-class="prefecture-checkbox"]')

    expect(prefectureCheckboxes.length).toBe(prefectureCount)
  })
})
