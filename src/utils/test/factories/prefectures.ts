import prefactureFactory from '@/utils/test/factories/prefecture'

import type { PrefactureFactoryOption } from '@/utils/test/factories/prefecture'

type PrefacturesFactoryOption = PrefactureFactoryOption

const prefecturesFactory = (length: number, options: PrefacturesFactoryOption = {}) =>
  Array.from({ length }, () => prefactureFactory(options))

export default prefecturesFactory
