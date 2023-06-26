export type Second = number
export const sleep = (second: number) =>
  new Promise((r) => {
    setTimeout(r, second * 1000)
  })
