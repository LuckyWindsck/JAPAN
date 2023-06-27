<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, provide, ref } from 'vue'

import TheLineChart from '@/components/TheLineChart.vue'
import TheTypeSwitcherPopulation from '@/components/TheTypeSwitcherPopulation.vue'
import { useConstants } from '@/composables/useConstants'
import { usePrefecture } from '@/composables/usePrefecture'
import { usePrefecturesStore } from '@/stores/prefectures'

import type { PopulationCompositionDataLabel as Label, Prefecture } from '@/types/prefecture'

type NonNullablePopulationComposition = {
  populationComposition: NonNullable<Prefecture['populationComposition']>
}
type FetchedPrefecture = Prefecture & NonNullablePopulationComposition

const prefecturesStore = usePrefecturesStore()
const { selectedPrefectures } = storeToRefs(prefecturesStore)

const selectedDataType = ref<Label>(useConstants().defaultSelectedDataType)
provide('selectedDataType', selectedDataType)

const displayedPrefectures = computed(() =>
  selectedPrefectures.value.filter(
    (prefecture): prefecture is FetchedPrefecture => prefecture.populationComposition !== null,
  ),
)

const labels = computed(() => {
  if (displayedPrefectures.value.length === 0) return []

  const prefecture = displayedPrefectures.value[0]
  const { data } = usePrefecture(prefecture).getPopulationComposityonDataByLabel(
    selectedDataType.value,
  )

  return data.map(({ year }) => String(year))
})

const datasets = computed(() =>
  displayedPrefectures.value.map((prefecture) => {
    const { data } = usePrefecture(prefecture).getPopulationComposityonDataByLabel(
      selectedDataType.value,
    )

    return {
      label: prefecture.prefName,
      data: data.map(({ value }) => value),
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
