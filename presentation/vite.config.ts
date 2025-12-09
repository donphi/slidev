import { defineConfig } from 'vite'

const normalizeBase = (value: string | undefined) => {
  if (!value || value === '/') return '/'
  let base = value
  if (!base.startsWith('/')) base = `/${base}`
  if (!base.endsWith('/')) base = `${base}/`
  return base
}

export default defineConfig({
  // Allow overriding base path via SLIDEV_BASE to support proxied deployments.
  base: normalizeBase(process.env.SLIDEV_BASE),
  
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    strictPort: true,
    // Force full page reload on certain changes to prevent stale module issues
    hmr: {
      overlay: true,
    },
  },
  
  // ==========================================
  // CACHE BUSTING - Prevent stale module issues
  // ==========================================
  optimizeDeps: {
    // Force re-optimization on every server start
    // This prevents cached pre-bundled dependencies from causing issues
    force: true,
  },
  
  // Ensure proper cache busting for production builds
  build: {
    // Generate unique hashes for all assets
    rollupOptions: {
      output: {
        // Include content hash in filenames for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
})
