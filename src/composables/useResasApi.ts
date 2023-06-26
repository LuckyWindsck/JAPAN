import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'

import type { SearchResponse } from '@/types/search-response'
import type { UseAxiosOptions } from '@vueuse/integrations/useAxios'

const baseURL = import.meta.env.VITE_RESAS_API_BASE_URL
const resasAPI = axios.create({ baseURL })

const useResasApi = <T>(path: string, options?: UseAxiosOptions<SearchResponse<T>>) =>
  useAxios<SearchResponse<T>>(path, resasAPI, { immediate: true, ...options })

export default useResasApi
