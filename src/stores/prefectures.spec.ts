import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import usePrefecturesStore from '@/stores/prefectures'
import { integerFactory, prefectureCountInJapan } from '@/utils/test/factories/faker'
import prefecturesFactory from '@/utils/test/factories/prefectures'
import { tokyo } from '@/utils/test/fixtures/prefectures'
import { shuffle } from '@/utils/test/helpers/faker'

describe.concurrent('Prefectures Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // States
  it('specify Tokyo as default prefecture to select', () => {
    const prefecturesStore = usePrefecturesStore()

    expect(prefecturesStore.defaultPrefecture).toContain('東京')
  })

  it('contains no prefecture initially', () => {
    const prefecturesStore = usePrefecturesStore()

    expect(prefecturesStore.prefectures).toHaveLength(0)
  })

  // Getters
  it('filters selected and non-selected prefectures', () => {
    const prefecturesStore = usePrefecturesStore()

    const selectedPrefectureCount = integerFactory({ max: prefectureCountInJapan })
    const nonSelectedPrefectureCount = prefectureCountInJapan - selectedPrefectureCount
    const selectedPrefectures = prefecturesFactory(selectedPrefectureCount, { isSelected: true })
    const nonSelectedPrefectures = prefecturesFactory(nonSelectedPrefectureCount, {
      isSelected: false,
    })
    prefecturesStore.prefectures = shuffle([...selectedPrefectures, ...nonSelectedPrefectures])

    expect(prefecturesStore.prefectures).toHaveLength(prefectureCountInJapan)
    expect(prefecturesStore.selectedPrefectures).toHaveLength(selectedPrefectureCount)
    expect(prefecturesStore.nonSelectedPrefectures).toHaveLength(nonSelectedPrefectureCount)
  })

  // Actions
  it('select specified prefecture', async () => {
    const prefectureCount = integerFactory({ min: 1, max: prefectureCountInJapan })
    const randomIndex = integerFactory({ min: 0, max: prefectureCount - 1 })
    const prefectures = prefecturesFactory(prefectureCount)
    const prefecturesStore = usePrefecturesStore()
    prefecturesStore.prefectures = prefectures
    const prefecture = prefectures[randomIndex]

    await prefecturesStore.selectPrefecture(prefecture.prefName)

    expect(prefecture.isSelected).toBeTruthy()
  })

  it('select default prefecture', async () => {
    const prefecturesStore = usePrefecturesStore()
    prefecturesStore.prefectures = [tokyo]

    await prefecturesStore.selectDefaultPrefecture()

    expect(tokyo.isSelected).toBeTruthy()
  })
})
