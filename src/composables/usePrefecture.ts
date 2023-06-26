/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Prefecture } from '@/types/prefecture'

const usePrefecture = (prefecture: Prefecture) => {
  const fetchPopulationComposition = () => {
    // To be implemented
  }

  const updateIsSelected = (newValue: boolean) => {
    // To be implemented
  }

  return {
    fetchPopulationComposition,
    updateIsSelected,
  }
}

export default usePrefecture
