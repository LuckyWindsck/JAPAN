<script setup lang="ts">
import { storeToRefs } from 'pinia'

import AppCheckboxPrefecture from '@/components/AppCheckboxPrefecture.vue'
import usePrefecturesStore from '@/stores/prefectures'

import type { Prefecture } from '@/types/prefecture'

const prefecturesStore = usePrefecturesStore()
const { prefectures } = storeToRefs(prefecturesStore)

// We can extract type of a single emit by InstanceType<TComponent>['$emit']. However for a
// component with multiple emits defined, the type we extercted will be an intersection type of emit
// function types. It seems to be difficult to extract a specific emit function type, so what we can
// do is to ensure the type here match the parameter types of respective emit.
//
// Also, we are not sure why the following code doesn't work:
// > const fn = (prefecture) => (newValue) => { prefecture.isSelected = newValue }
// > @update:is-selected="fn(prefecture)"

const updatePrefecture = (prefecture: Prefecture) => (newValue: boolean) =>
  Object.assign(prefecture, { isSelected: newValue })
</script>

<template>
  <div class="prefecture-selector">
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
