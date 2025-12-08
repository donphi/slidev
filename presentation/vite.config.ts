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
  },
})
