<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import TheLineChart from '@/components/TheLineChart.vue'
import TheTypeSwitcherPopulation from '@/components/TheTypeSwitcherPopulation.vue'
import { usePrefecture } from '@/composables/usePrefecture'
import { usePrefecturesStore } from '@/stores/prefectures'

import type { Prefecture } from '@/types/prefecture'

type NonNullablePopulationComposition = {
  populationComposition: NonNullable<Prefecture['populationComposition']>
}
type FetchedPrefecture = Prefecture & NonNullablePopulationComposition

const prefecturesStore = usePrefecturesStore()
const { selectedPrefectures } = storeToRefs(prefecturesStore)

const displayedPrefectures = computed(() =>
  selectedPrefectures.value.filter(
    (prefecture): prefecture is FetchedPrefecture => prefecture.populationComposition !== null,
  ),
)

const labels = computed(() => {
  if (displayedPrefectures.value.length === 0) return []

  const prefecture = displayedPrefectures.value[0]
  const populationInTotal = usePrefecture(prefecture).getPopulationComposityonDataByLabel('総人口')

  return populationInTotal.data.map(({ year }) => String(year))
})

const datasets = computed(() =>
  displayedPrefectures.value.map((prefecture) => {
    const populationInTotal =
      usePrefecture(prefecture).getPopulationComposityonDataByLabel('総人口')

    return {
      label: prefecture.prefName,
      data: populationInTotal.data.map(({ value }) => value),
    }
  }),
)
</script>

<template>
  <div class="the-data-presenter">
    <TheTypeSwitcherPopulation />
    <TheLineChart
      :labels="labels"
      :datasets="datasets"
      data-test-class="population-transition-line-chart"
    />
  </div>
</template>

<style scoped>
.the-data-presenter {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
}
</style>
