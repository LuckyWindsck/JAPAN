import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import TheDataPresenter from '@/components/TheDataPresenter.vue'
import TheLineChart from '@/components/TheLineChart.vue'

import type { Prefecture } from '@/types/prefecture'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'

// Source: https://stackoverflow.com/questions/68602712/extracting-the-prop-types-of-a-component-in-vue-3-typescript-to-use-them-somew#answer-73784241
type ComponentProps<C extends Component> = C extends new (...args: unknown[]) => unknown
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// Somehow @typescript-eslint can not determinded type correctly, so we need to this workaound to
// transform ArrayType like this.
type A2A<A extends readonly unknown[]> = ArrayElement<A>[]

type LineChartPropsType = ComponentProps<typeof TheLineChart>
type TLabel = LineChartPropsType['labels']
type TDatasets = LineChartPropsType['datasets']
type TData = ArrayElement<TDatasets>['data']

// not selected & no population composition data
const hokkaido: Prefecture = {
  prefCode: 1,
  prefName: '北海道',
  populationComposition: null,
  isSelected: false,
}

// not selected & has population composition data
const okinawa: Prefecture = {
  prefCode: 47,
  prefName: '沖縄県',
  populationComposition: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 883122 },
          { year: 1965, value: 934176 },
          { year: 1970, value: 945111 },
        ],
      },
    ],
  },
  isSelected: false,
}

// is selected & no population composition data
// this might happened when resas-api is fetching or when fetching failed
const kyoto: Prefecture = {
  prefCode: 26,
  prefName: '京都府',
  populationComposition: null,
  isSelected: true,
}

// is selected & has population composition data
const tokyo: Prefecture = {
  prefCode: 13,
  prefName: '東京都',
  populationComposition: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 9683802 },
          { year: 1965, value: 10869244 },
          { year: 1970, value: 11408071 },
        ],
      },
    ],
  },
  isSelected: true,
}

describe('TheDataPresenter', () => {
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

    const expectedLabels = ['1960', '1965', '1970'] as A2A<TLabel>
    const expectedData = [9683802, 10869244, 11408071] as A2A<TData>

    const lineChartProps = wrapper.findComponent(TheLineChart).props() as LineChartPropsType
    const lineChartLabel = lineChartProps.labels as A2A<TLabel>
    const lineChartData = (lineChartProps.datasets as A2A<TDatasets>).map(({ data }) => data)[0]

    expect(lineChartLabel).toEqual(expect.arrayContaining(expectedLabels))
    expect(expectedLabels).toEqual(expect.arrayContaining(lineChartLabel))

    expect(lineChartData).toEqual(expect.arrayContaining(expectedData))
    expect(expectedData).toEqual(expect.arrayContaining(lineChartData))
  })
})
