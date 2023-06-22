<script setup lang="ts">
import type { PropType } from 'vue'
import AppCheckboxPrefecture from './AppCheckboxPrefecture.vue'
import type { Prefectures } from '../types/search-response'

defineProps({
  prefectures: {
    type: Object as PropType<Prefectures>,
    required: true,
  },
})
</script>

<template>
  <AppCheckboxPrefecture
    v-for="prefecture of prefectures"
    :key="prefecture.prefCode"
    :pref-code="prefecture.prefCode"
    :pref-name="prefecture.prefName"
    data-test-class="prefecture-checkbox"
  />
</template>

<!-- <style scoped></style> -->
