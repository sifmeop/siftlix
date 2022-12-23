const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { isServer, webpack }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    unoptimized: true
  }
}

module.exports = nextTranslate(nextConfig)
