import { defineStore } from 'pinia'
import { AuthStateUser } from '../types/interfaces'

export interface AuthState {
  accessToken: string
  accessTokenExpirationTime: number
  user: AuthStateUser | null
  isUserReady: boolean
  isUserAuthCompleted: boolean
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => {
    return {
      accessToken: '',
      accessTokenExpirationTime: 0,
      user: null,
      isUserReady: false,
      isUserAuthCompleted: true,
    }
  },
  getters: {
    userInitials(state) {
      if (state.user && state.user.firstName && state.user.lastName) {
        return state.user.firstName[0].toUpperCase() + state.user.lastName[0].toUpperCase()
      }
      return ''
    },
  },
})
