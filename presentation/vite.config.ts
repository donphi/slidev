import { defineConfig } from 'vite'

const normalizeBase = (value: string | undefined) => {
  if (!value || value === '/') return '/'
  let base = value
  if (!base.startsWith('/')) base = `/${base}`
  if (!base.endsWith('/')) base = `${base}/`
  return base
}

// Detect if we're in a container environment where polling might be needed
const usePolling = process.env.CHOKIDAR_USEPOLLING === 'true'

export default defineConfig({
  // Allow overriding base path via SLIDEV_BASE to support proxied deployments.
  base: normalizeBase(process.env.SLIDEV_BASE),
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    strictPort: true,
    // HMR configuration for Docker/proxied environments
    hmr: {
      // When accessed through proxy (/slidev), the WebSocket needs correct path
      // The editor proxy forwards /slidev/* to localhost:3030/slidev/*
      // Setting protocol/host auto-detects from the browser
    },
    watch: {
      // Only use polling if explicitly required (Windows/macOS Docker Desktop)
      // Linux with native volumes should use inotify (much faster!)
      usePolling,
      // If polling is used, check every 500ms (balance between speed and CPU)
      interval: usePolling ? 500 : undefined,
      // Watch for symlink changes (needed for our architecture)
      followSymlinks: true,
      // Ignore node_modules and other large directories
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    // Don't re-scan for dependencies on every reload
    holdUntilCrawlEnd: true,
  },
})
