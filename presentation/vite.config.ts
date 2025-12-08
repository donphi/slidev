import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for assets - ensures all asset URLs start with /slidev/
  base: '/slidev/',
  server: {
    // Allow all hosts (needed for Railway/Docker deployment)
    allowedHosts: true,
    // Allow connections from any IP
    host: '0.0.0.0',
    // Don't redirect if base path is wrong - just serve content
    strictPort: true,
  },
})

