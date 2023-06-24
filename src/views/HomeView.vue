<script setup lang="ts">
import { ref } from 'vue'

import TheDataPresenter from '../components/TheDataPresenter.vue'
import ThePrefectureSelector from '../components/ThePrefectureSelector.vue'
import useResasApi from '../composables/useResasApi'

import type { PrefectureData } from '@/types/search-response'

const { fetch } = useResasApi()

const prefectures = ref<PrefectureData[]>([])

fetch<PrefectureData[]>('/api/v1/prefectures')
  .then((data) => {
    prefectures.value = data.result
  })
  .catch(() => {})
</script>

<template>
  <main>
    <TheDataPresenter data-test-class="data-presenter" />
    <ThePrefectureSelector :prefectures="prefectures" data-test-class="prefecture-selector" />
  </main>
</template>
