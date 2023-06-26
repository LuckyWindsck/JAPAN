<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import TheLineChart from '@/components/TheLineChart.vue'
import usePrefecturesStore from '@/stores/prefectures'

import type { Prefecture } from '@/types/prefecture'
import type { PopulationInTotal } from '@/types/search-response'

type NonNullablePopulationComposition = {
  populationComposition: NonNullable<Prefecture['populationComposition']>
}
type FetchedPrefecture = Prefecture & NonNullablePopulationComposition

const getPopulationInTotal = (prefecture: FetchedPrefecture) => {
  const { populationComposition } = prefecture
  const found = populationComposition.data.find(
    (data): data is PopulationInTotal => data.label === '総人口',
  )
  if (found === undefined) throw Error('RESAS API return incorrect data')

  const populationInTotal = found

  return populationInTotal
}

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
  const populationInTotal = getPopulationInTotal(prefecture)

  return populationInTotal.data.map(({ year }) => String(year))
})

const datasets = computed(() =>
  displayedPrefectures.value.map((prefecture) => {
    const populationInTotal = getPopulationInTotal(prefecture)

    return {
      label: prefecture.prefName,
      data: populationInTotal.data.map(({ value }) => value),
    }
  }),
)
</script>

<template>
  <div class="the-data-presenter">
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
  justify-content: center;
}
</style>
