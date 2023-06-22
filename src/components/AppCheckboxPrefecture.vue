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
  <div>
    <input :id="prefName" type="checkbox" name="prefecture" :value="prefCode" />
    <label :for="prefName">{{ prefName }}</label>
  </div>
</template>

<!-- <style scoped></style> -->
