import { describe, it, expect } from 'vitest'
import useResasApi from '../useResasApi'
import type { Prefectures, PopulationComposition } from '../../types/search-response'

const { fetch } = useResasApi

const tokyo = {
  prefCode: 13,
  prefName: '東京都',
}

// We don't mock HTTP requests, since we want to test if the fetch composable really works.

describe('useResasApi', () => {
  it('fetch prefectures data from RESAS API', async () => {
    const data = await fetch<Prefectures>('/api/v1/prefectures')
    const prefecture = data.result[tokyo.prefCode - 1] // array is 0-indexed

    expect(prefecture.prefCode).toBe(tokyo.prefCode)
    expect(prefecture.prefName).toBe(tokyo.prefName)
  })

  it('fetch population composition data from RESAS API', async () => {
    const data = await fetch<PopulationComposition>(
      '/api/v1/population/composition/perYear?prefCode=13',
    )
    const { boundaryYear } = data.result

    expect(boundaryYear).toEqual(expect.any(Number))
  })
})
