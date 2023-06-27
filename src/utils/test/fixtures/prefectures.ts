import type { Prefecture } from '@/types/prefecture'

export const nonNullPopulationComposition = { boundaryYear: 1, data: [] }

// not selected & no population composition data
export const hokkaido: Prefecture = {
  prefCode: 1,
  prefName: '北海道',
  populationComposition: null,
  isSelected: false,
}

// not selected & has population composition data
export const okinawa: Prefecture = {
  prefCode: 47,
  prefName: '沖縄県',
  populationComposition: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 883122 },
          { year: 1965, value: 934176 },
          { year: 1970, value: 945111 },
        ],
      },
    ],
  },
  isSelected: false,
}

// is selected & no population composition data
// this might happened when resas-api is fetching or when fetching failed
export const kyoto: Prefecture = {
  prefCode: 26,
  prefName: '京都府',
  populationComposition: null,
  isSelected: true,
}

// is selected & has population composition data
export const tokyo: Prefecture = {
  prefCode: 13,
  prefName: '東京都',
  populationComposition: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 9683802 },
          { year: 1965, value: 10869244 },
          { year: 1970, value: 11408071 },
        ],
      },
      {
        label: '年少人口',
        data: [
          { year: 1960, value: 2249052, rate: 23.2 },
          { year: 1965, value: 2216945, rate: 20.3 },
          { year: 1970, value: 2400630, rate: 21 },
        ],
      },
      {
        label: '生産年齢人口',
        data: [
          { year: 1960, value: 7067087, rate: 72.9 },
          { year: 1965, value: 8183336, rate: 75.2 },
          { year: 1970, value: 8416630, rate: 73.7 },
        ],
      },
      {
        label: '老年人口',
        data: [
          { year: 1960, value: 367663, rate: 3.7 },
          { year: 1965, value: 468963, rate: 4.3 },
          { year: 1970, value: 590811, rate: 5.1 },
        ],
      },
    ],
  },
  isSelected: true,
}
