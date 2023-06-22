import axios from 'axios'
import type { SearchResponse } from '../types/search-response'

const baseURL = import.meta.env.VITE_RESAS_API_BASE_URL
const resasAPI = axios.create({ baseURL })

const fetch = async <T>(path: string) => {
  const response = await resasAPI.get<SearchResponse<T>>(path)

  return response.data
}

const useResasApi = { fetch }

export default useResasApi
