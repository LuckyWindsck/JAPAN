<script setup lang="ts">
import TheLineChart from '@/components/TheLineChart.vue'

const [start, end, step] = [1960, 2045, 5]
const lineCount = 3

const yearCount = (end - start) / 5 + 1
const years = Array.from({ length: yearCount }, (_, idx) => start + step * idx)

const labels = years.map(String)
const datasets = Array.from({ length: lineCount }, (_, i) => i + 1).map((idx) => ({
  label: `東京都-${idx}`,
  data: Array.from({ length: yearCount }, () => 10 ** 7 * (0.75 + Math.random() / 2)),
}))
</script>

<template>
  <TheLineChart :labels="labels" :datasets="datasets" />
</template>

<!-- <style scoped></style> -->
