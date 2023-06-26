<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { computed, ref } from 'vue'
import { Line } from 'vue-chartjs'

import type { ChartType } from '@/types/utility'
import type { ChartData, ChartOptions } from 'chart.js'
import type { PropType } from 'vue'

type TType = ChartType<typeof Line>
type TLabel = string
type TData = number[]
type TDataSet = {
  label: TLabel
  data: TData
}

const props = defineProps({
  labels: {
    type: Array as PropType<TLabel[]>,
    required: true,
  },
  datasets: {
    type: Array as PropType<TDataSet[]>,
    required: true,
  },
})

ChartJS.register(
  CategoryScale, // X scale
  LinearScale, // Y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Colors,
)

const chartData = computed<ChartData<TType, TData, TLabel>>(() => ({
  labels: props.labels,
  datasets: props.datasets,
}))

const chartOptions = ref<ChartOptions<TType>>({
  plugins: {
    colors: {
      forceOverride: true,
    },
  },
})
</script>

<template>
  <div class="line-chart-container">
    <Line :data="chartData" :options="chartOptions" data-test-class="line-chart" />
  </div>
</template>

<style scoped>
.line-chart-container {
  position: relative;

  display: flex;
  justify-content: center;

  width: 80vw;
  height: 40vh;
}
</style>
