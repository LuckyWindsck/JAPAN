<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps({
  prefCode: {
    type: Number,
    required: true,
  },
  prefName: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits<{
  'update:isSelected': [newValue: boolean]
}>()

const isSelectedModel = useVModel(props, 'isSelected', emit)
</script>

<template>
  <div class="prefecture-checkbox">
    <input :id="prefName" v-model="isSelectedModel" type="checkbox" name="prefecture" />
    <label :for="prefName">{{ prefName }}</label>
  </div>
</template>

<style scoped>
.prefecture-checkbox {
  display: flex;
  column-gap: 1em;
}
</style>
