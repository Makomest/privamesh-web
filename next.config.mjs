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
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  // Google Ads fires remarketing pixels at the visitor's own google.<tld> -
  // google.com.ua, google.de and ~190 others - and CSP cannot wildcard a TLD.
  // Allowing any https image is the only workable rule. Images cannot execute,
  // so the directive that actually matters for security, script-src, stays a
  // strict allowlist.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // Google Ads drops a conversion-linker iframe; default-src 'self' would block it.
  "frame-src 'self' https://td.doubleclick.net https://googleads.g.doubleclick.net https://www.googletagmanager.com",
  "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.googleadservices.com https://*.doubleclick.net https://www.google.com",
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
      // The App Store listing and the release repo's static docs reference
      // .html paths that never existed on this site. Redirect rather than 404 -
      // an App Review link that dead-ends is a rejection.
      { source: '/support.html', destination: '/support', statusCode: 301 },
      { source: '/ru/support.html', destination: '/ru/support', statusCode: 301 },
      { source: '/privacy-policy.html', destination: '/privacy-policy', statusCode: 301 },
      { source: '/terms.html', destination: '/terms', statusCode: 301 },
      { source: '/privacy.html', destination: '/privacy', statusCode: 301 },
      { source: '/index.html', destination: '/', statusCode: 301 },
      // Page 1 of the blog lives at /blog, so the paginated route starts at 2
      // and /blog/page/1 404s. It is a guessable URL, so point it home instead.
      { source: '/blog/page/1', destination: '/blog', statusCode: 301 },
      { source: '/ru/blog/page/1', destination: '/ru/blog', statusCode: 301 },
      // Tag slugs Google indexed that no longer exist, or that duplicate a tag
      // we do keep. Redirecting beats leaving a 404 Search Console keeps
      // re-reporting. Targets are noindex,follow - they pass link equity on
      // without competing for the query themselves.
      { source: '/blog/tag/serverless-chat', destination: '/blog/tag/serverless', statusCode: 301 },
      { source: '/blog/tag/serverless-messenger', destination: '/blog/tag/serverless', statusCode: 301 },
      { source: '/blog/tag/serverless-messaging', destination: '/blog/tag/serverless', statusCode: 301 },
      { source: '/blog/tag/encrypted-chat', destination: '/blog/tag/encryption', statusCode: 301 },
      { source: '/blog/tag/encrypted-messenger', destination: '/blog/tag/encryption', statusCode: 301 },
      { source: '/blog/tag/e2e', destination: '/blog/tag/encryption', statusCode: 301 },
      { source: '/blog/tag/cipher', destination: '/blog/tag/encryption', statusCode: 301 },
      { source: '/blog/tag/secure-messenger', destination: '/blog/tag/private-messenger', statusCode: 301 },
      { source: '/blog/tag/anonymous-messenger', destination: '/blog/tag/private-messenger', statusCode: 301 },
      { source: '/blog/tag/private-messaging', destination: '/blog/tag/private-messenger', statusCode: 301 },
      // /audit and /how-it-works were on the plan but would duplicate the intent
      // of pages that already exist. Redirect rather than publish two pages
      // competing for the same query.
      { source: '/audit', destination: '/security', statusCode: 301 },
      { source: '/how-it-works', destination: '/architecture', statusCode: 301 },
      // In-chat SOL transfers, NFT avatars and the nickname marketplace were
      // designed but never shipped: sendSOL and sendSOLNote have no callers, and
      // mintNickname only writes to a local array. The page marketed a product
      // that does not exist, so it is gone and the URL points at the page about
      // what the account actually is.
      { source: '/features/sol-transfers', destination: '/features/seed-phrase-accounts', statusCode: 301 },
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
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Apple fetches this file with no Accept header and refuses anything that
        // is not application/json. Served from /public it would go out as
        // application/octet-stream and universal links would silently never work.
        source: '/.well-known/apple-app-site-association',
        headers: [
          ...securityHeaders,
          { key: 'Content-Type', value: 'application/json' },
        ],
      },
    ]
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
