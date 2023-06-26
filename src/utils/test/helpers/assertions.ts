import { expect } from 'vitest'

const arrayWithExactContents = <A = unknown, B = unknown>(array1: Array<A>, array2: Array<B>) => {
  expect(array1).toEqual(expect.arrayContaining(array2))
  expect(array2).toEqual(expect.arrayContaining(array1))
}

const assertions = {
  arrayWithExactContents,
}

export { assertions }
