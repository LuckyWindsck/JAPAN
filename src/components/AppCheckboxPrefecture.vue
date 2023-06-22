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
})
</script>

<template>
  <div class="prefecture-checkbox">
    <input :id="prefName" type="checkbox" name="prefecture" :value="prefCode" />
    <label :for="prefName">{{ prefName }}</label>
  </div>
</template>

<style scoped>
.prefecture-checkbox {
  display: flex;
  column-gap: 1em;
}
</style>
