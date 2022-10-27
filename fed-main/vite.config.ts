import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl(), eslintPlugin()],
  server: {
    port: 3000,
    https: true,
  },
  envDir: './env',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    globals: true,
    setupFiles: 'src/config/vitest.config.ts',
    includeSource: ['src/**/*.{js,ts,vue}'],
  },
})
