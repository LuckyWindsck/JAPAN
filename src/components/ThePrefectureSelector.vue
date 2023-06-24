<script setup lang="ts">
import { storeToRefs } from 'pinia'

import usePrefecturesStore from '@/stores/prefectures'

import AppCheckboxPrefecture from './AppCheckboxPrefecture.vue'

const prefecturesStore = usePrefecturesStore()
const { prefectures } = storeToRefs(prefecturesStore)
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
      @update:is-selected="(newValue) => (prefecture.isSelected = newValue)"
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
