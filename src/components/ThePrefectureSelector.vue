<script setup lang="ts">
import AppCheckboxPrefecture from './AppCheckboxPrefecture.vue'

import type { Prefectures } from '../types/search-response'
import type { PropType } from 'vue'

defineProps({
  prefectures: {
    type: Object as PropType<Prefectures>,
    required: true,
  },
})
</script>

<template>
  <div class="prefecture-selector">
    <AppCheckboxPrefecture
      v-for="prefecture of prefectures"
      :key="prefecture.prefCode"
      :pref-code="prefecture.prefCode"
      :pref-name="prefecture.prefName"
      data-test-class="prefecture-checkbox"
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
