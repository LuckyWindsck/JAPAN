<script setup lang="ts">
import { ref } from 'vue'

import TheDataPresenter from '../components/TheDataPresenter.vue'
import ThePrefectureSelector from '../components/ThePrefectureSelector.vue'
import useResasApi from '../composables/useResasApi'

import type { Prefectures } from '@/types/search-response'

const { fetch } = useResasApi

const prefectures = ref<Prefectures>([])

fetch<Prefectures>('/api/v1/prefectures')
  .then((data) => {
    prefectures.value = data.result
  })
  .catch(() => {})
</script>

<template>
  <main>
    <TheDataPresenter />
    <ThePrefectureSelector :prefectures="prefectures" />
  </main>
</template>
