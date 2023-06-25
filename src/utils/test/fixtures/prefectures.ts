import type { Prefecture } from '@/types/prefecture'

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
    ],
  },
  isSelected: true,
}
