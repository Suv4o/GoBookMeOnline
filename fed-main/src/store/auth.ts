import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      accessToken: '',
      accessTokenExpirationTime: 0,
    }
  },
})
