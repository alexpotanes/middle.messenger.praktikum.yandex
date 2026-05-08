import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        nav: 'nav.html',
        app: 'index.html'
      }
    }
  },
  preview: {
    open: '/nav.html'
  }
})
