import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  build: {
    // I don't care to minify for a toy program that will only run on my own computer. It's all local. There are no
    // bandwidth constraints for local development.
    minify: false
  }
})
