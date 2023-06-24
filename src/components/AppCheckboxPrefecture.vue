<script setup lang="ts">
defineProps({
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

defineEmits<{
  'update:is-selected': [newValue: boolean]
}>()
</script>

<template>
  <div class="prefecture-checkbox">
    <input
      :id="prefName"
      type="checkbox"
      name="prefecture"
      :value="isSelected"
      @change="$emit('update:is-selected', (<HTMLInputElement>$event.target).checked)"
    />
    <label :for="prefName">{{ prefName }}</label>
  </div>
</template>

<style scoped>
.prefecture-checkbox {
  display: flex;
  column-gap: 1em;
}
</style>
