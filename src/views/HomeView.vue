<script setup lang="ts">
import TheDataPresenter from '../components/TheDataPresenter.vue'
import ThePrefectureSelector from '../components/ThePrefectureSelector.vue'

const prefectures = [
  {
    prefCode: 11,
    prefName: '埼玉県',
  },
  {
    prefCode: 12,
    prefName: '千葉県',
  },
  {
    prefCode: 13,
    prefName: '東京都',
  },
  {
    prefCode: 14,
    prefName: '神奈川県',
  },
]
</script>

<template>
  <main>
    <TheDataPresenter />
    <ThePrefectureSelector :prefectures="prefectures" />
  </main>
</template>
