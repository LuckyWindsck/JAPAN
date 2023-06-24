import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import usePrefecturesStore from '@/stores/prefectures'

describe('Prefectures Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('contains no prefecture initially', () => {
    const prefecturesStore = usePrefecturesStore()

    expect(prefecturesStore.prefectures).toHaveLength(0)
  })
})
