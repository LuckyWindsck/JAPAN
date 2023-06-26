<script setup lang="ts">
import { storeToRefs } from 'pinia'

import AppCheckboxPrefecture from '@/components/AppCheckboxPrefecture.vue'
import usePrefecture from '@/composables/usePrefecture'
import usePrefecturesStore from '@/stores/prefectures'

const prefecturesStore = usePrefecturesStore()
const { prefectures } = storeToRefs(prefecturesStore)
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
      @update:is-selected="(newValue) => usePrefecture(prefecture).updateIsSelected(newValue)"
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
