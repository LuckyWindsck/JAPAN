import { describe, expect, it } from 'vitest'

import { usePrefecture } from '@/composables/usePrefecture'
import { prefactureFactory } from '@/utils/test/factories/prefecture'
import { nonNullPopulationComposition, tokyo } from '@/utils/test/fixtures/prefectures'

describe.concurrent('usePrefecture', () => {
  describe.concurrent('fetchPopulationComposition', () => {
    it('fetch data', async () => {
      const prefecture = prefactureFactory({
        populationComposition: null,
        isSelected: true,
      })

      await usePrefecture(prefecture).fetchPopulationComposition()

      expect(prefecture.populationComposition).not.toBeNull()
    })
  })

  describe.concurrent('updateIsSelected', () => {
    it('should update isSelected property of given prefecture', async () => {
      const prefecture1 = prefactureFactory({ isSelected: false })
      const prefecture2 = prefactureFactory({ isSelected: true })
      const prefecture3 = prefactureFactory({ isSelected: false })
      const prefecture4 = prefactureFactory({ isSelected: true })

      // Update with same value
      await usePrefecture(prefecture1).updateIsSelected(false)
      await usePrefecture(prefecture2).updateIsSelected(true)
      // Update with different value
      await usePrefecture(prefecture3).updateIsSelected(true)
      await usePrefecture(prefecture4).updateIsSelected(false)

      expect(prefecture1.isSelected).toBe(false)
      expect(prefecture2.isSelected).toBe(true)
      expect(prefecture3.isSelected).toBe(true)
      expect(prefecture4.isSelected).toBe(false)
    })

    it('should fetch when prefecture is selected and has no population composition data', async () => {
      const prefecture = prefactureFactory({
        populationComposition: null,
        isSelected: false,
      })

      await usePrefecture(prefecture).updateIsSelected(true)

      expect(prefecture.populationComposition).not.toBeNull()
    })

    it('should not fetch when prefecture is not selected or has population composition data', async () => {
      const prefecture1 = prefactureFactory({
        populationComposition: nonNullPopulationComposition,
        isSelected: false,
      })
      const prefecture2 = prefactureFactory({
        populationComposition: null,
        isSelected: true,
      })
      const prefecture3 = prefactureFactory({
        populationComposition: nonNullPopulationComposition,
        isSelected: true,
      })

      // Update the `isSelected` property of a prefecture that owns population composition data to `true`.
      await usePrefecture(prefecture1).updateIsSelected(true)
      // Update the `isSelected` property of a selected prefecture to `false`.
      await usePrefecture(prefecture2).updateIsSelected(false)
      await usePrefecture(prefecture3).updateIsSelected(false)

      expect(prefecture1.populationComposition).toBe(nonNullPopulationComposition)
      expect(prefecture2.populationComposition).toBe(null)
      expect(prefecture3.populationComposition).toBe(nonNullPopulationComposition)
    })
  })

  describe.concurrent('getPopulationComposityonDataByLabel', () => {
    it('can get corresponding population composition data by label', () => {
      const labels = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const
      const { getPopulationComposityonDataByLabel } = usePrefecture(tokyo)

      labels.forEach((label) => {
        const data = getPopulationComposityonDataByLabel(label)
        expect(data.label).toBe(label)
      })
    })
  })
})
