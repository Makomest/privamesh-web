import createMDX from '@next/mdx'

// Content-Security-Policy. 'unsafe-inline' on script-src is required by Next's
// hydration bootstrap and by the inline gtag/beacon config snippets; the host
// allowlist is what does the real work. Styles are inline by Tailwind + Next.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  'upgrade-insecure-requests',
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // This guide targeted the same query as /best-private-messaging-apps.
        // It was reframed as a method for judging privacy claims, so the old
        // head-term URL points at the ranked list that now owns that intent.
        source: '/guides/most-private-messaging-app-2026',
        destination: '/best-private-messaging-apps',
        permanent: true,
      },
    ]
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
      },
      { key: 'Content-Security-Policy', value: CSP },
    ]
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
