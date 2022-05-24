import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind/index.css'
import { auth } from './config/firebase.config'

const app = createApp(App)
app.provide('$auth', auth)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
