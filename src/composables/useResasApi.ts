import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'

import type { SearchResponse } from '@/types/search-response'

const baseURL = import.meta.env.VITE_RESAS_API_BASE_URL
const resasAPI = axios.create({ baseURL })

const useResasApi = <T>(path: string) => useAxios<SearchResponse<T>>(path, resasAPI)

export default useResasApi
