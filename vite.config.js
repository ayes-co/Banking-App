import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use relative base for production so assets load correctly on GitHub Pages
  base: import.meta.env.PROD ? './' : '/',
  plugins: [react()],
})

