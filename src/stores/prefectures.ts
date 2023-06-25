import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Prefecture } from '@/types/prefecture'

const usePrefecturesStore = defineStore('prefectures', () => {
  const prefectures = ref<Prefecture[]>([])
  const selectedPrefectures = computed(() =>
    prefectures.value.filter((prefecture) => prefecture.isSelected),
  )
  const nonSelectedPrefectures = computed(() =>
    prefectures.value.filter((prefecture) => !prefecture.isSelected),
  )

  return {
    prefectures,
    selectedPrefectures,
    nonSelectedPrefectures,
  }
})

export default usePrefecturesStore
