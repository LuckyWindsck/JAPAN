<script setup lang="ts">
import { watch } from 'vue'

import TheDataPresenter from '@/components/TheDataPresenter.vue'
import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import useResasApi from '@/composables/useResasApi'
import usePrefecturesStore from '@/stores/prefectures'

import type { PrefectureData } from '@/types/search-response'

const prefecturesStore = usePrefecturesStore()

const { data, error, isLoading } = useResasApi<PrefectureData[]>('/api/v1/prefectures')

watch(isLoading, () => {
  if (error.value instanceof Error) throw error.value
  if (data.value === undefined) return

  prefecturesStore.prefectures = data.value.result.map((prefectureData) => ({
    ...prefectureData,
    populationComposition: null,
    isSelected: false,
  }))
})
</script>

<template>
  <main>
    <TheDataPresenter data-test-class="data-presenter" />
    <ThePrefectureSelector data-test-class="prefecture-selector" />
  </main>
</template>

<!-- <style scoped></style> -->
