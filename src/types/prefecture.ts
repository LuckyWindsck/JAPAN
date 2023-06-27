import type { PopulationCompositionDataLabel } from '@/composables/useConstants'
import type { PopulationCompositionData, PrefectureData } from '@/types/search-response'

type Prefecture = PrefectureData & {
  populationComposition: PopulationCompositionData | null
  isSelected: boolean
}

export type { PopulationCompositionDataLabel, Prefecture }
