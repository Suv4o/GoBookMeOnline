import { defineStore } from 'pinia'
import { AuthStateUser } from '../types/interfaces'

export interface AuthState {
  accessToken: string
  accessTokenExpirationTime: number
  user: AuthStateUser | null
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => {
    return {
      accessToken: '',
      accessTokenExpirationTime: 0,
      user: null,
    }
  },
})
