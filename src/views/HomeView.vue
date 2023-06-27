<script setup lang="ts">
import TheDataPresenter from '@/components/TheDataPresenter.vue'
import ThePrefectureSelector from '@/components/ThePrefectureSelector.vue'
import { useResasApi } from '@/composables/useResasApi'
import { usePrefecturesStore } from '@/stores/prefectures'

import type { PrefectureData } from '@/types/search-response'

const prefecturesStore = usePrefecturesStore()

// eslint-disable-next-line @typescript-eslint/no-floating-promises
useResasApi<PrefectureData[]>('/api/v1/prefectures', {
  onSuccess(data) {
    prefecturesStore.prefectures = data.result.map((prefectureData) => ({
      ...prefectureData,
      populationComposition: null,
      isSelected: false,
    }))

    return prefecturesStore.selectDefaultPrefecture()
  },
})
</script>

<template>
  <main>
    <TheDataPresenter data-test-class="data-presenter" />
    <ThePrefectureSelector data-test-class="prefecture-selector" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
</style>
