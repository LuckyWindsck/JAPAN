import { expect } from 'vitest'

const assertions = {
  arrayWithExactContents<A = unknown, B = unknown>(array1: Array<A>, array2: Array<B>) {
    expect(array1).toEqual(expect.arrayContaining(array2))
    expect(array2).toEqual(expect.arrayContaining(array1))
  },
}

export default assertions
