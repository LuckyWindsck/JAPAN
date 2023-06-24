import { config } from '@vue/test-utils'

import DataTestClassPlugin from '@/plugins/test-utils/DataTestClassPlugin'

config.plugins.VueWrapper.install(DataTestClassPlugin)
