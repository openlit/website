const { withContentlayer } = require('next-contentlayer2')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'self' *.s3.amazonaws.com *.s3.us-west-1.amazonaws.com openlit.io docs.openlit.io mintcdn.com;
  connect-src *;
  font-src 'self';
  frame-src openlit.io story.screenspace.io;
  frame-ancestors 'none';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  {
    key: 'X-Llms-Txt',
    value: 'https://openlit.io/llms.txt',
  },
  {
    key: 'Link',
    value:
      '<https://openlit.io/llms.txt>; rel="llms-txt", <https://openlit.io/llms-full.txt>; rel="llms-full-txt"',
  },
]

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    experimental: {
      optimizePackageImports: ['lucide-react'],
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'github.com',
        },
        {
          protocol: 'https',
          hostname: 'miro.medium.com',
        },
      ],
    },
    async rewrites() {
      return [
        { source: '/index.md', destination: '/markdown' },
        { source: '/pricing.md', destination: '/markdown/pricing' },
        { source: '/about-us.md', destination: '/markdown/about-us' },
        { source: '/compare.md', destination: '/markdown/compare' },
        { source: '/compare/:slug.md', destination: '/markdown/compare/:slug' },
      ]
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
        {
          // Immutable cache for hashed Next.js static chunks
          source: '/_next/static/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
        {
          // Long-lived cache for public static assets (images, fonts, favicons)
          source: '/static/(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          ],
        },
      ]
    },
    webpack: (config, options) => {
      config.plugins.push(new DuplicatePackageCheckerPlugin())

      // Disabling source maps in development breaks HMR and causes
      // "Cannot read properties of undefined (reading 'call')" chunk errors.
      if (!options.dev) {
        config.devtool = false
        if (config.cache) {
          config.cache = Object.freeze({
            type: 'memory',
          })
          config.cache.maxMemoryGenerations = 0
        }
      }
      return config
    },
  })
}
