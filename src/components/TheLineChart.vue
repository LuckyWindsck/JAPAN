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

import type { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js'
import type { TypedChartComponent } from 'node_modules/vue-chartjs/dist/types'
import type { PropType } from 'vue'

// Type

type ExtractChartType<ChartComponent> = ChartComponent extends TypedChartComponent<
  infer TType extends keyof ChartTypeRegistry
>
  ? TType
  : never

type TType = ExtractChartType<typeof Line>
type TData = number[]
type TLabel = string

type TDataSet = {
  label: TLabel
  data: TData
}

// Props

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

// Initialize

ChartJS.register(
  CategoryScale, // X scale
  LinearScale, // Y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Colors,
)

// Reactivity

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
