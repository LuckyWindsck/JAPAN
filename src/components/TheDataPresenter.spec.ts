import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import TheDataPresenter from '@/components/TheDataPresenter.vue'
import TheLineChart from '@/components/TheLineChart.vue'
import { hokkaido, kyoto, okinawa, tokyo } from '@/utils/test/fixtures/prefectures'
import { assertions } from '@/utils/test/helpers/assertions'

import type { A2A, ArrayElement, ComponentProps } from '@/types/utility'

type LineChartPropsType = ComponentProps<typeof TheLineChart>
type TLabel = A2A<LineChartPropsType['labels']>
type TDatasets = A2A<LineChartPropsType['datasets']>
type TData = A2A<ArrayElement<TDatasets>['data']>

describe.concurrent('TheDataPresenter', () => {
  it('renders a line chart that shows population transition', () => {
    const wrapper = mount(TheDataPresenter, {
      shallow: true,
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })

    const populationTransitionLineChart = wrapper.findAllByTestClass(
      'population-transition-line-chart',
    )
    expect(populationTransitionLineChart).toHaveLength(1)
  })

  it('renders only selected prefectures', () => {
    const wrapper = mount(TheDataPresenter, {
      shallow: true,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              prefectures: {
                prefectures: [hokkaido, okinawa, kyoto, tokyo],
              },
            },
          }),
        ],
      },
    })

    // Data from prefecture tokyo
    const expectedLabels: TLabel = ['1960', '1965', '1970']
    const expectedData: TData = [9683802, 10869244, 11408071]

    const lineChartProps = wrapper.findComponent(TheLineChart).props()
    const lineChartLabel = lineChartProps.labels as TLabel
    const lineChartData = (lineChartProps.datasets as TDatasets).map(({ data }) => data)[0]

    assertions.arrayWithExactContents(expectedLabels, lineChartLabel)
    assertions.arrayWithExactContents(expectedData, lineChartData)
  })
})
