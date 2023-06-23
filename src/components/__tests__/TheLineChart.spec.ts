import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheLineChart from '../TheLineChart.vue'

// Since we shouldn't check its implementation, we can only check if there is an element which is in
// charge of rendering data in a line chart. To test whether it renders data correctly, we should
// use a visual regression test, but that is not the responsibility for this component test.

describe('TheLineChart', () => {
  it('renders a line chart', () => {
    const data = {}

    const wrapper = mount(TheLineChart, { props: { data } })
    const lintChart = wrapper.findAll('[data-test-class="line-chart"]')

    expect(lintChart.length).toBe(1)
  })
})
