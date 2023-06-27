type PopulationInTotal = {
  label: '総人口'
  data: {
    year: number
    value: number
  }[]
}

type PopulationByAge = {
  label: '年少人口' | '生産年齢人口' | '老年人口'
  data: {
    year: number
    value: number
    rate: number
  }[]
}

type PrefectureData = {
  prefCode: number
  prefName: string
}

type PopulationCompositionData = {
  boundaryYear: number
  data: (PopulationInTotal | PopulationByAge)[]
}

type SearchResponse<T> = {
  message: string | null
  result: T
}

export type {
  PopulationInTotal,
  PopulationByAge,
  PrefectureData,
  PopulationCompositionData,
  SearchResponse,
}
