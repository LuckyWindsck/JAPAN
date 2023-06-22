import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// eslint-disable-next-line import/prefer-default-export
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value += 1
  }

  return { count, doubleCount, increment }
})
