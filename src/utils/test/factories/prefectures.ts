import { fakerJA } from '@faker-js/faker'

import { shuffle } from '../helpers/faker'

import type { Prefecture } from '@/types/prefecture'
import type { PrefactureFactoryOption } from '@/utils/test/factories/prefecture'

type PrefacturesFactoryOption = Pick<
  PrefactureFactoryOption,
  'populationComposition' | 'isSelected'
>

// We MUST generate UNIQUE prefectures array to avoid test failures.
// In practice, we assumed that RESAS API doesn't contain duplicate prefectures. Therefore, our
// implementation might fail some tests if we generate random prefectures with duplicate value.
const prefecturesFactory = (length: number, options: PrefacturesFactoryOption = {}) => {
  // Workaround: .slice() to convert readonly array to array
  const prefectureNames: Prefecture['prefName'][] = fakerJA.definitions.location.state.slice()

  const prefectures: Prefecture[] = prefectureNames.map((prefName, index) => ({
    prefCode: index - 1,
    prefName,
    populationComposition: null,
    isSelected: false,
    ...options,
  }))

  // No need to limit `length`, as Array.prototype.slice handles it.
  return shuffle(prefectures).slice(0, length)
}

export default prefecturesFactory
