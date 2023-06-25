import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheLineChart from '@/components/TheLineChart.vue'

// Q1: Why is there no test for how line chart render data?
// A1: Since we shouldn't check its implementation, we can only check if there is an element which
//     is in charge of rendering data in a line chart. To test whether it renders data correctly, we
//     should use a visual regression test, but that is not the responsibility for this component
//     test.

describe('TheLineChart', () => {
  it('renders a line chart', () => {
    const wrapper = mount(TheLineChart, {
      shallow: true,
      props: {
        labels: [],
        datasets: [],
      },
    })
    const lintChart = wrapper.findAllByTestClass('line-chart')

    expect(lintChart).toHaveLength(1)
  })
})
