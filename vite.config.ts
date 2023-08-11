import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/team': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/project': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/task': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/process-type': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/common': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  plugins: [react()],
})
