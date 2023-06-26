/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Prefecture } from '@/types/prefecture'

const usePrefecturesStore = defineStore('prefectures', () => {
  // States
  const defaultPrefecture = ref(/* To be implemented */)
  const prefectures = ref<Prefecture[]>([])

  // Getters
  const selectedPrefectures = computed(() =>
    prefectures.value.filter((prefecture) => prefecture.isSelected),
  )
  const nonSelectedPrefectures = computed(() =>
    prefectures.value.filter((prefecture) => !prefecture.isSelected),
  )

  // Actions
  const selectPrefecture = (selectPrefName) => {
    /* To be implemented */
  }

  const selectDefaultPrefecture = () => {
    /* To be implemented */
  }

  return {
    defaultPrefecture,
    prefectures,

    selectedPrefectures,
    nonSelectedPrefectures,

    selectPrefecture,
    selectDefaultPrefecture,
  }
})

export default usePrefecturesStore
