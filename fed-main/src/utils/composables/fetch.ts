import { ref } from 'vue'
import { useAuthStore } from '../../store/auth'
import { auth } from '../../config/firebase.config'

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
  credentials: boolean
}

export async function useFetch(options: FetchOptions = { url: '', method: 'GET', body: {}, credentials: true }) {
  const data = ref(null)
  const error = ref(null as Error | null)
  const isLoading = ref(false)

  const { url, method, body, credentials } = options
  const useAuthState = useAuthStore()

  const responseOptions: Partial<ResponseOptions> = {
    method,
    headers: {
      'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
    },
  }

  if (responseOptions.headers && credentials) {
    const currentTime = new Date().getTime()
    const expirationTime = useAuthState.accessTokenExpirationTime

    if (!useAuthState.accessToken || currentTime < expirationTime) {
      const currentUser = auth.currentUser
      if (currentUser) {
        useAuthState.accessToken = await currentUser.getIdToken(true)
        useAuthState.accessTokenExpirationTime = currentTime + 3600 * 1000 // +1 hour
      }
      responseOptions.headers.Authorization = `Bearer ${useAuthState.accessToken}`
    }
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
    } catch (err) {
      if (err instanceof Error) {
        isLoading.value = false
        error.value = err
      }
    }
  }

  await fetchApi()

  return { data, error, isLoading }
}
