/* eslint-disable no-param-reassign */
import { useResasApi } from './useResasApi'

import type { PopulationCompositionDataLabel as Label, Prefecture } from '@/types/prefecture'
import type {
  PopulationByAge,
  PopulationCompositionData,
  PopulationInTotal,
} from '@/types/search-response'

type PopulationCompositionByLabel<L extends Label> = L extends PopulationInTotal['label']
  ? PopulationInTotal
  : L extends PopulationByAge['label']
  ? PopulationByAge
  : never

const usePrefecture = (prefecture: Prefecture) => {
  const fetchPopulationComposition = () => {
    const params = new URLSearchParams({
      prefCode: String(prefecture.prefCode),
      cityCode: '-',
    })

    const path = `/api/v1/population/composition/perYear?${params.toString()}`

    return useResasApi<PopulationCompositionData>(path, {
      onSuccess(data) {
        prefecture.populationComposition = data.result
      },
    })
  }

  // In order to extract the type of a single emit function from a component, we can use the syntax
  // InstanceType<TComponent>['$emit']. However, if a component has multiple emits defined, the
  // extracted type will be an intersection of the emit function types. Extracting a specific emit
  // function type from this intersection type seems to be difficult. Therefore, in this situation,
  // we MUST ensure that the type used here matches the parameter types of the respective emit
  // functions. In this case, the `update:isSelected` emit in `AppCheckboxPrefecture`.
  const updateIsSelected = (newValue: boolean) => {
    prefecture.isSelected = newValue

    if (prefecture.isSelected && prefecture.populationComposition === null) {
      return fetchPopulationComposition()
    }

    return undefined
  }

  const getPopulationComposityonDataByLabel = <L extends Label>(
    label: L,
  ): PopulationCompositionByLabel<L> => {
    const { populationComposition } = prefecture
    if (populationComposition === null) {
      throw Error(
        `Prefecture ${prefecture.prefName} does not have population composition data. Please fetch the data first.`,
      )
    }

    const found = (populationComposition.data as PopulationCompositionByLabel<L>[]).find(
      (data) => data.label === label,
    )
    if (found === undefined) throw Error('RESAS API return incorrect data')

    const populationInTotal = found

    return populationInTotal
  }

  return {
    fetchPopulationComposition,
    updateIsSelected,
    getPopulationComposityonDataByLabel,
  }
}

export { usePrefecture }
