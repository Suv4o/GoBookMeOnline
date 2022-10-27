import * as dotenv from 'dotenv'
import { defineConfig } from 'cypress'
const env = dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

export default defineConfig({
  env: {
    BACKEND_URL: env.parsed?.VITE_BACKEND_URL,
  },
  e2e: {
    baseUrl: env.parsed?.VITE_FRONTEND_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
