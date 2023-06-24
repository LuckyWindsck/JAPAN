import type { PopulationCompositionData, PrefectureData } from './search-response'

export type Prefecture = PrefectureData & {
  populationComposition: PopulationCompositionData | null
  isSelected: boolean
}
