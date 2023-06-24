import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Prefecture } from '../types/prefecture'

const usePrefecturesStore = defineStore('prefectures', () => {
  const prefectures = ref<Prefecture[]>([])

  return { prefectures }
})

export default usePrefecturesStore
