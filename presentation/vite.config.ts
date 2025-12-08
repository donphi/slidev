import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Allow all hosts (needed for Railway/Docker deployment)
    allowedHosts: true,
    // Allow connections from any IP
    host: '0.0.0.0',
  },
})

