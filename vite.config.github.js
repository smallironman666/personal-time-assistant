import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment config
export default defineConfig({
  plugins: [react()],
  base: '/personal-time-assistant/',  // GitHub Pages需要这个路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
