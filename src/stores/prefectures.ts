import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import usePrefecture from '@/composables/usePrefecture'

import type { Prefecture } from '@/types/prefecture'

const usePrefecturesStore = defineStore('prefectures', () => {
  // States
  const defaultPrefecture = ref<Prefecture['prefName']>('東京都')
  const prefectures = ref<Prefecture[]>([])

  // Getters
  const selectedPrefectures = computed(() =>
    prefectures.value.filter((prefecture) => prefecture.isSelected),
  )
  const nonSelectedPrefectures = computed(() =>
    prefectures.value.filter((prefecture) => !prefecture.isSelected),
  )

  // Actions
  const selectPrefecture = (selectPrefName: Prefecture['prefName']) => {
    const found = prefectures.value.find(({ prefName }) => prefName === selectPrefName)
    if (found === undefined) return

    const prefecture = found
    const { updateIsSelected } = usePrefecture(prefecture)
    updateIsSelected(true)
  }

  const selectDefaultPrefecture = () => {
    selectPrefecture(defaultPrefecture.value)
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
