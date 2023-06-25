import { fakerJA } from '@faker-js/faker'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import usePrefecturesStore from '@/stores/prefectures'

import type { Prefecture } from '@/types/prefecture'

const prefectureCountInJapan = 47
const randomSelectedPrefectureCount = fakerJA.number.int({ min: 1, max: prefectureCountInJapan })
const nonSelectedPrefectureCount = prefectureCountInJapan - randomSelectedPrefectureCount

const generateRandomPrefectureWithOption = (isSelected: boolean): Prefecture => ({
  prefCode: fakerJA.number.int({ min: 1, max: prefectureCountInJapan }),
  prefName: fakerJA.location.state(),
  populationComposition: null,
  isSelected,
})

describe('Prefectures Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('contains no prefecture initially', () => {
    const prefecturesStore = usePrefecturesStore()

    expect(prefecturesStore.prefectures).toHaveLength(0)
  })

  it('filters selected and non-selected prefectures', () => {
    const prefecturesStore = usePrefecturesStore()

    const selectedPrefectures = Array.from({ length: randomSelectedPrefectureCount }, () =>
      generateRandomPrefectureWithOption(true),
    )
    const nonSelectedPrefectures = Array.from({ length: nonSelectedPrefectureCount }, () =>
      generateRandomPrefectureWithOption(false),
    )
    prefecturesStore.prefectures = fakerJA.helpers.shuffle([
      ...selectedPrefectures,
      ...nonSelectedPrefectures,
    ])

    expect(prefecturesStore.prefectures).toHaveLength(prefectureCountInJapan)
    expect(prefecturesStore.selectedPrefectures).toHaveLength(randomSelectedPrefectureCount)
    expect(prefecturesStore.nonSelectedPrefectures).toHaveLength(nonSelectedPrefectureCount)
  })
})
