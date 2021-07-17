import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    mode: 'development',
    base: '/',
    manifest: {
      theme_color: '#1F2937',
      icons: [
        {
          src: '/icons/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globDirectory: 'dist',
      globPatterns: ['assets/*.*', 'icons/*.*', 'index.html']
    }
  })],
  resolve: {
    alias: [{
      find: '@',
      replacement: '/src'
    }]
  }
})
