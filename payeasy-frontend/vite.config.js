import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tic-payeasy-trial-server.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
