import { describe, expect, it } from 'vitest'

import usePrefecture from '@/composables/usePrefecture'
import prefactureFactory from '@/utils/test/factories/prefecture'
import { nonNullPopulationComposition } from '@/utils/test/fixtures/prefectures'
import { sleep } from '@/utils/test/helpers/sleep'

import type { Second } from '@/utils/test/helpers/sleep'

// Q1: Why do we actually wait for the HTTP Request?
// A1: Since we couldn't find a better solution, we have to actually wait for the expected outcome.
//     In the case of using `vitest`, it appears that there is no direct way to access the data
//     returned by a mocked function. Therefore, even if we mock `useResasApi`, we are unable to
//     modify the values of its returned refs. As a result, testing anything that occurs after
//     calling `useResasApi`, such as verifying whether the population composition data is
//     successfully saved to the prefecture after data fetching, becomes quite challenging.
const wait: Second = 3

describe.concurrent('usePrefecture', () => {
  it('fetch prefecture composition', async () => {
    const prefecture = prefactureFactory({
      populationComposition: null,
      isSelected: true,
    })
    const { fetchPopulationComposition } = usePrefecture(prefecture)

    fetchPopulationComposition()
    await sleep(wait)

    expect(prefecture.populationComposition).not.toBeNull()
  })

  describe.concurrent('updateIsSelected', () => {
    it('should update isSelected property of given prefecture', async () => {
      const prefecture1 = prefactureFactory({ isSelected: false })
      const prefecture2 = prefactureFactory({ isSelected: true })
      const prefecture3 = prefactureFactory({ isSelected: false })
      const prefecture4 = prefactureFactory({ isSelected: true })

      // Update with same value
      usePrefecture(prefecture1).updateIsSelected(false)
      usePrefecture(prefecture2).updateIsSelected(true)
      // Update with different value
      usePrefecture(prefecture3).updateIsSelected(true)
      usePrefecture(prefecture4).updateIsSelected(false)
      await sleep(wait)

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
      const { updateIsSelected } = usePrefecture(prefecture)

      updateIsSelected(true)
      await sleep(wait)

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
      usePrefecture(prefecture1).updateIsSelected(true)
      // Update the `isSelected` property of a selected prefecture to `false`.
      usePrefecture(prefecture2).updateIsSelected(false)
      usePrefecture(prefecture3).updateIsSelected(false)
      await sleep(wait)

      expect(prefecture1.populationComposition).toBe(nonNullPopulationComposition)
      expect(prefecture2.populationComposition).toBe(null)
      expect(prefecture3.populationComposition).toBe(nonNullPopulationComposition)
    })
  })
})
