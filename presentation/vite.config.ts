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
    // Allow serving files from node_modules (needed for export page)
    fs: {
      allow: ['..'],
    },
    // Configure HMR for proxied setup
    hmr: {
      // Use the same port as the server
      port: 3030,
      // Allow connections from proxy
      host: '0.0.0.0',
    },
  },
  // Optimize dependencies to ensure @slidev/client is properly bundled
  optimizeDeps: {
    include: ['@slidev/client'],
  },
})
