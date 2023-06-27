const populationCompositionDataLabels = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const

type PopulationCompositionDataLabel = (typeof populationCompositionDataLabels)[number]

const defaultSelectedDataType: PopulationCompositionDataLabel = '総人口'

const resasApiBaseURL = import.meta.env.VITE_RESAS_API_BASE_URL

const useConstants = () => ({
  populationCompositionDataLabels,
  defaultSelectedDataType,
  resasApiBaseURL,
})

export { useConstants }

// To avoid circular references, we cannot define `PopulationCompositionDataLabel` in other files.
export type { PopulationCompositionDataLabel }
