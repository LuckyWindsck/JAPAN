import type { PopulationCompositionData, PrefectureData } from '@/types/search-response'

export type Prefecture = PrefectureData & {
  populationComposition: PopulationCompositionData | null
  isSelected: boolean
}
