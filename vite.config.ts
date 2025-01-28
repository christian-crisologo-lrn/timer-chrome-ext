// filepath: /Users/christiancrisologo/dev/projs/chrome-timer-ext/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/timer-chrome-ext/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ext: resolve(__dirname, 'ext.html'),
      },
    },
  },
})