import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative asset paths so images/scripts load correctly when the app is
  // deployed under a subpath (or opened from `dist/` via file://).
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      // Prefer IPv4 loopback to avoid occasional IPv6/localhost resolution issues.
      '/api': 'http://127.0.0.1:4000',
      '/uploads': 'http://127.0.0.1:4000',
    },
  },
})
