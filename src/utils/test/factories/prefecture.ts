import { prefCodeFactory, prefNameFactory } from './faker'

import type { Prefecture } from '@/types/prefecture'

export type PrefactureFactoryOption = Partial<Prefecture>

const prefactureFactory = (options: PrefactureFactoryOption = {}): Prefecture => {
  const randomPrefecture = {
    prefCode: prefCodeFactory(),
    prefName: prefNameFactory(),
    populationComposition: null,
    isSelected: false,
  }

  return { ...randomPrefecture, ...options }
}

export default prefactureFactory
