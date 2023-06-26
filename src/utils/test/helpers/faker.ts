import { faker } from '@faker-js/faker'

const shuffle = <T>(list: T[]) => faker.helpers.shuffle(list, { inplace: false })

export { shuffle }
