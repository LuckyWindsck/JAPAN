<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { computed, ref } from 'vue'
import { Line } from 'vue-chartjs'

import type { ChartType } from '@/types/utility'
import type { ChartData, ChartOptions, Plugin } from 'chart.js'
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

// TODO: consider about resize
const viewPortWidth = window.visualViewport?.width ?? 0

const loadingOverlay: Plugin = {
  id: 'loadingOverlay',
  // It should be after `beforeRender` hook.
  beforeDraw: (chart) => {
    if (chart.data.datasets.length !== 0) return

    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart

    // Render background
    ctx.fillStyle = '#C0C0C080'
    ctx.fillRect(left, top, width, height)

    // Render text
    let size = 1
    if (viewPortWidth >= 600) size = 2
    if (viewPortWidth >= 1024) size = 4

    const fontSize = `${size}rem`
    const fontFamily = 'sans-serif'
    ctx.font = `${fontSize} ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    const [x, y] = [left + width / 2, top + height / 2]
    ctx.fillText('Loading', x, y)
  },
}

ChartJS.register(
  CategoryScale, // X scale
  LinearScale, // Y scale
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  Colors,
)

const chartData = computed<ChartData<TType, TData, TLabel>>(() => ({
  labels: props.labels,
  datasets: props.datasets,
}))

const chartOptions = ref<ChartOptions<TType>>({
  aspectRatio: viewPortWidth >= 600 ? 2 : 1,
  scales: {
    x: {
      title: {
        display: true,
        text: '年度',
      },
    },
    y: {
      title: {
        display: true,
        text: '人口数',
      },
      ticks: {
        callback(tickValue) {
          const formatter = new Intl.NumberFormat('ja-JP', { notation: 'compact' })
          const numericTickValue =
            typeof tickValue === 'string' ? parseInt(tickValue, 10) : tickValue

          return formatter.format(numericTickValue)
        },
      },
    },
  },
  plugins: {
    colors: {
      forceOverride: true,
    },
    title: {
      display: true,
      text: '人口推移',
    },
  },
})

const chartPlugins = ref<Plugin<TType>[]>([loadingOverlay])
</script>

<template>
  <div class="line-chart-container">
    <Line
      :data="chartData"
      :options="chartOptions"
      :plugins="chartPlugins"
      data-test-class="line-chart"
    />
  </div>
</template>

<style scoped>
.line-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
