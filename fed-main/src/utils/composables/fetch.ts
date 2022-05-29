import { ref } from 'vue'
import { useAuthStore } from '../../store/auth'

interface ResponseOptions {
  method: string
  headers: Partial<{
    'Content-Type': string
    Authorization: string
  }>
  body: string
}

interface FetchOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body: object
}

export async function useFetch(options: FetchOptions = { url: '', method: 'GET', body: {} }) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const { url, method, body } = options
  const useAuthState = useAuthStore()

  const responseOptions: Partial<ResponseOptions> = {
    method,
    headers: {
      'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
    },
  }

  if (responseOptions.headers && useAuthState.accessToken) {
    responseOptions.headers.Authorization = `Bearer ${useAuthState.accessToken}`
  }

  if (body) {
    responseOptions.body = JSON.stringify(body)
  }

  async function fetchApi() {
    try {
      isLoading.value = true
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + url, responseOptions)
      if (response.status === 200) {
        data.value = await response.json()
      } else {
        error.value = await response.json()
      }
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      data.value = error as any
    }
  }

  await fetchApi()

  return { data, error, isLoading }
}
