<script setup lang="ts">
import { inject } from 'vue'

import { useConstants } from '@/composables/useConstants'

import type { PopulationCompositionDataLabel as Label } from '@/types/prefecture'
import type { Ref } from 'vue'

const labels = useConstants().populationCompositionDataLabels
const maxLabelLength = Math.max(...labels.map(({ length }) => length))
const labelMinWidth = `${maxLabelLength}rem`

const selectedDataType = inject('selectedDataType') as Ref<Label>
</script>

<template>
  <div class="type-switcher">
    <div
      v-for="label of labels"
      :key="label"
      class="data-type-radio-button"
      data-test-class="data-type-radio-button"
    >
      <input
        :id="label"
        v-model="selectedDataType"
        type="radio"
        name="data-type-radio-button"
        :value="label"
      />
      <label :for="label" class="data-type-label">{{ label }}</label>
    </div>
  </div>
</template>

<style scoped>
.type-switcher {
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
}

.data-type-radio-button {
  display: flex;
  column-gap: 0.5rem;
}

.data-type-label {
  min-width: v-bind('labelMinWidth');
}
</style>
