/* eslint-disable @typescript-eslint/no-non-null-assertion -- We will assert that data.value is not undefined */
import { describe, expect, it } from 'vitest'

import useResasApi from '@/composables/useResasApi'
import { tokyo } from '@/utils/test/fixtures/prefectures'

import type { PopulationCompositionData, PrefectureData } from '@/types/search-response'

// We don't mock HTTP requests, since we want to test if the fetch composable really works.

describe('useResasApi', () => {
  it('fetch prefectures data from RESAS API', async () => {
    const { data } = await useResasApi<PrefectureData[]>('/api/v1/prefectures')

    expect(data.value).not.toBeUndefined()

    const prefecture = data.value!.result[tokyo.prefCode - 1] // array is 0-indexed

    expect(prefecture.prefCode).toBe(tokyo.prefCode)
    expect(prefecture.prefName).toBe(tokyo.prefName)
  })

  it('fetch population composition data from RESAS API', async () => {
    const { data } = await useResasApi<PopulationCompositionData>(
      '/api/v1/population/composition/perYear?prefCode=13',
    )

    expect(data.value).not.toBeUndefined()

    const { boundaryYear } = data.value!.result

    expect(boundaryYear).toEqual(expect.any(Number))
  })
})
