import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind/index.css'
import { auth } from './config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './store/auth'
export const pinia = createPinia()

const app = createApp(App)
app.provide('$auth', auth)
app.use(pinia)
app.use(router)

onAuthStateChanged(auth, user => {
  const useStoreAuth = useAuthStore(pinia)
  if (!user) {
    useStoreAuth.accessToken = ''
    useStoreAuth.accessTokenExpirationTime = 0
    useStoreAuth.user = null
  }
  router.isReady().then(() => {
    app.mount('#app')
  })
})
