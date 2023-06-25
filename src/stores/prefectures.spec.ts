import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import usePrefecturesStore from '@/stores/prefectures'
import { integerFactory, prefectureCountInJapan } from '@/utils/test/factories/faker'
import prefecturesFactory from '@/utils/test/factories/prefectures'
import { shuffle } from '@/utils/test/helpers/faker'

const selectedPrefectureCount = integerFactory({ max: prefectureCountInJapan })
const nonSelectedPrefectureCount = prefectureCountInJapan - selectedPrefectureCount

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

    const selectedPrefectures = prefecturesFactory(selectedPrefectureCount, { isSelected: true })
    const nonSelectedPrefectures = prefecturesFactory(nonSelectedPrefectureCount, {
      isSelected: false,
    })
    prefecturesStore.prefectures = shuffle([...selectedPrefectures, ...nonSelectedPrefectures])

    expect(prefecturesStore.prefectures).toHaveLength(prefectureCountInJapan)
    expect(prefecturesStore.selectedPrefectures).toHaveLength(selectedPrefectureCount)
    expect(prefecturesStore.nonSelectedPrefectures).toHaveLength(nonSelectedPrefectureCount)
  })
})
