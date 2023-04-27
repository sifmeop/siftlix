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
  }
}

module.exports = nextTranslate(nextConfig)
