import { ref } from 'vue'
import { useAuthStore } from '../../store/auth'
import { auth } from '../../config/firebase.config'

type ContentType =
  | 'application/EDI-X12'
  | 'application/EDIFACT'
  | 'application/javascript'
  | 'application/octet-stream'
  | 'application/ogg'
  | 'application/pdf'
  | 'application/xhtml+xml'
  | 'application/x-shockwave-flash'
  | 'application/json'
  | 'application/ld+json'
  | 'application/xml'
  | 'application/zip'
  | 'application/x-www-form-urlencoded'

interface ResponseOptions {
  method: string
  headers: Partial<{
    'Content-Type': ContentType
    Authorization: string
  }>
  body: string
}

interface FetchOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body: object
  credentials: boolean
  contentType: ContentType
}

export async function useFetch(options: Partial<FetchOptions>) {
  const data = ref(null)
  const error = ref(<null | Error>null)
  const isLoading = ref(false)

  const { url = '', method = 'GET', body = {}, contentType = 'application/json', credentials = true } = options
  const useAuthState = useAuthStore()

  const responseOptions: Partial<ResponseOptions> = {
    method,
    headers: {
      'Content-Type': contentType,
    },
  }

  if (responseOptions.headers && credentials) {
    const currentTime = new Date().getTime()
    const expirationTime = useAuthState.accessTokenExpirationTime

    if (!useAuthState.accessToken || currentTime < expirationTime) {
      const currentUser = await auth.currentUser
      if (currentUser) {
        try {
          const currentUserDetails = await currentUser?.getIdTokenResult(true)
          useAuthState.accessToken = currentUserDetails?.token
          useAuthState.accessTokenExpirationTime = Number(currentUserDetails?.claims.exp)
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message)
          }
        }
      }
      responseOptions.headers.Authorization = `Bearer ${useAuthState.accessToken}`
    }
  }

  if (Object.keys(body).length) {
    responseOptions.body = JSON.stringify(body)
  }

  async function fetchApi() {
    try {
      isLoading.value = true
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + url, responseOptions)
      if ([200, 201, 202, 203, 204, 205, 206, 207, 208, 226].includes(response.status)) {
        data.value = await response.json().catch(() => {
          return null
        })
      } else {
        error.value = await response.json()
      }
      isLoading.value = false
    } catch (err) {
      isLoading.value = false
      if (err instanceof Error) {
        error.value = err
      }
    }
  }

  await fetchApi()

  return { data, error, isLoading }
}
