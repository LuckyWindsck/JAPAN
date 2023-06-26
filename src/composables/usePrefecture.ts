/* eslint-disable no-param-reassign */
import useResasApi from './useResasApi'

import type { Prefecture } from '@/types/prefecture'
import type { PopulationCompositionData } from '@/types/search-response'

const usePrefecture = (prefecture: Prefecture) => {
  const fetchPopulationComposition = () => {
    const path = `/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}`

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

  return {
    fetchPopulationComposition,
    updateIsSelected,
  }
}

export default usePrefecture
