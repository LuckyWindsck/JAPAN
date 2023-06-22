<script setup lang="ts">
import AppCheckboxPrefecture from './AppCheckboxPrefecture.vue'

const prefecture = {
  prefCode: 13,
  prefName: '東京都',
}
</script>

<template>
  <AppCheckboxPrefecture :pref-code="prefecture.prefCode" :pref-name="prefecture.prefName" />
</template>

<!-- <style scoped></style> -->
