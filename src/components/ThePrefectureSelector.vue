<script setup lang="ts">
import AppCheckboxPrefecture from '@/components/AppCheckboxPrefecture.vue'
import { usePrefecture } from '@/composables/usePrefecture'
import { usePrefecturesStore } from '@/stores/prefectures'

const prefecturesStore = usePrefecturesStore()
</script>

<template>
  <div class="prefecture-selector">
    <AppCheckboxPrefecture
      v-for="prefecture of prefecturesStore.prefectures"
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
  display: grid;

  /* 6rem is an appropriate magic number that we test on differenct devices.
     Basically, we can consider it as:
     > Checkbox (about 1 rem) + Label gap (0.5 rem) + Label width (4 rem) = 5.5rem
     and then we round it up to 6 rem. */
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  row-gap: 0.5rem;
}

@media (width >= 600px) {
  .prefecture-selector {
    row-gap: 1rem;
  }
}
</style>
