import { faker } from '@faker-js/faker'

// eslint-disable-next-line import/prefer-default-export
export const shuffle = <T>(list: T[]) => faker.helpers.shuffle(list, { inplace: false })
