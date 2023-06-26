import { faker, fakerJA } from '@faker-js/faker'

export const prefectureCountInJapan = fakerJA.definitions.location.state.length

export const integerFactory = ({ min = 0, max = Number.MAX_SAFE_INTEGER } = {}) =>
  faker.number.int({ min, max })
export const prefCodeFactory = () => integerFactory({ min: 1, max: prefectureCountInJapan })
export const prefNameFactory = () => fakerJA.location.state()
export const testClassFactory = () => faker.string.nanoid()
