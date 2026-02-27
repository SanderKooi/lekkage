/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  async rewrites() {
    return [
      {
        // /lekkage/amsterdam/ → intern /stad/amsterdam/
        // Exclude: /lekkage/dienst/... en /lekkage/lekkage-*/... en /lekkage/ zelf
        source: '/lekkage/:stad((?!dienst|lekkage-|riool-|vochtprobleem|kelderafdichting)[^/]+)',
        destination: '/stad/:stad',
      },
    ]
  },
}

module.exports = nextConfig
