import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheLineChart from '../TheLineChart.vue'

// Source: https://github.com/hustcc/jest-canvas-mock/issues/2#issuecomment-369608229
//
// npm package `canvas` has been added as a devDependency to resolve the
// following error:
//
// > stderr | src/components/__tests__/TheLineChart.spec.ts > TheLineChart > renders a line chart
// > Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)
//
// TODO: check which package is better to use, `canvas` or `jest-canvas-mock`.

// Q1: Why there is no test for how line chart render data?
// A1: Since we shouldn't check its implementation, we can only check if there is an element which
//     is in charge of rendering data in a line chart. To test whether it renders data correctly, we
//     should use a visual regression test, but that is not the responsibility for this component
//     test.

describe('TheLineChart', () => {
  it('renders a line chart', () => {
    const props = {
      labels: [],
      datasets: [],
    }

    const wrapper = mount(TheLineChart, { props })
    const lintChart = wrapper.findAll('[data-test-class="line-chart"]')

    expect(lintChart.length).toBe(1)
  })
})
