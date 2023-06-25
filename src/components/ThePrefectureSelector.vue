<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

import AppCheckboxPrefecture from '@/components/AppCheckboxPrefecture.vue'
import useResasApi from '@/composables/useResasApi'
import usePrefecturesStore from '@/stores/prefectures'

import type { Prefecture } from '@/types/prefecture'
import type { PopulationCompositionData } from '@/types/search-response'

const prefecturesStore = usePrefecturesStore()
const { prefectures } = storeToRefs(prefecturesStore)

/* eslint-disable no-param-reassign */
const updatePrefecture = (prefecture: Prefecture) => {
  // We can extract type of a single emit by InstanceType<TComponent>['$emit']. However for a
  // component with multiple emits defined, the type we extercted will be an intersection type of emit
  // function types. It seems to be difficult to extract a specific emit function type, so what we can
  // do is to ensure the type here match the parameter types of respective emit.
  return (newValue: boolean) => {
    prefecture.isSelected = newValue

    if (prefecture.isSelected && prefecture.populationComposition === null) {
      const path = `/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}`
      const { data, error, isLoading } = useResasApi<PopulationCompositionData>(path)

      watch(isLoading, () => {
        if (error.value instanceof Error) throw error.value
        if (data.value === undefined) return

        prefecture.populationComposition = data.value.result
      })
    }
  }
}
/* eslint-enable no-param-reassign */
</script>

<template>
  <div class="prefecture-selector">
    <!-- We are not sure why the following code doesn't work:
         > @update:is-selected="updatePrefecture(prefecture)"
         So we wrap updatePrefecture to solve this problem. -->
    <AppCheckboxPrefecture
      v-for="prefecture of prefectures"
      :key="prefecture.prefCode"
      :pref-code="prefecture.prefCode"
      :pref-name="prefecture.prefName"
      :is-selected="prefecture.isSelected"
      data-test-class="prefecture-checkbox"
      @update:is-selected="(newValue) => updatePrefecture(prefecture)(newValue)"
    />
  </div>
</template>

<style scoped>
.prefecture-selector {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1em;
  column-gap: 2em;
}
</style>
