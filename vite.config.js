import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',        // <-- path matches your repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),   // <-- lets you use "@/..." imports
    },
  },
})
