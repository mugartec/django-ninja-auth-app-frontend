import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Pages from "vite-plugin-pages";
import ViteComponents from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    ViteComponents(),
  ],
  resolve: {
      alias: {
          '@': path.resolve(__dirname, '/src'),
      }
  },
  server: {
    proxy: {
      '/api': process.env.VITE_API_URL || 'http://localhost:8000',
    },
  },
})
