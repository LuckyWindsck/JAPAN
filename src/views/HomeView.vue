<script setup lang="ts">
import TheDataPresenter from '@/components/TheDataPresenter.vue'
import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import useResasApi from '@/composables/useResasApi'
import usePrefecturesStore from '@/stores/prefectures'

import type { PrefectureData } from '@/types/search-response'

const prefecturesStore = usePrefecturesStore()
const { fetch } = useResasApi()

fetch<PrefectureData[]>('/api/v1/prefectures')
  .then((data) => {
    prefecturesStore.prefectures = data.result.map((prefectureData) => ({
      ...prefectureData,
      populationComposition: null,
      isSelected: false,
    }))
  })
  .catch(() => {})
</script>

<template>
  <main>
    <TheDataPresenter data-test-class="data-presenter" />
    <ThePrefectureSelector data-test-class="prefecture-selector" />
  </main>
</template>
