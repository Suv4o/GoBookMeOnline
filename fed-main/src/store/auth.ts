import { defineStore } from 'pinia'
import { AuthStateUser } from '../types/interfaces'

export interface AuthState {
  accessToken: string
  accessTokenExpirationTime: number
  user: AuthStateUser | null
  isUserReady: boolean
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => {
    return {
      accessToken: '',
      accessTokenExpirationTime: 0,
      user: null,
      isUserReady: false,
    }
  },
  getters: {
    userInitials(state) {
      if (state.user) {
        return state.user.firstName[0].toUpperCase() + state.user.lastName[0].toUpperCase()
      }
      return ''
    },
  },
})
