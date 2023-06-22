import type { SearchResponse } from '../types/search-response'

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- to be implemented
const fetch = async <T>(path: string): Promise<SearchResponse<T>> => {
  // To be implemented
}

const useResasApi = { fetch }

export default useResasApi
