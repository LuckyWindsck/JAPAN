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

export type PrefectureData = {
  prefCode: number
  prefName: string
}

export type PopulationCompositionData = {
  boundaryYear: number
  data: (PopulationInTotal | PopulationByAge)[]
}

export type SearchResponse<T> = {
  message: string | null
  result: T
}
