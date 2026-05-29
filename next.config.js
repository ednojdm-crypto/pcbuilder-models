/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['pub-*', 'r2.cloudflarestorage.com'],
  },
}

module.exports = nextConfig
