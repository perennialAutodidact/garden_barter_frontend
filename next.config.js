/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },

  rewrites: [
    {
      source: '/auth/login',
      destination: '/login',
    },
    {
      source: '/auth/signup',
      destination: '/signup'
    }
  ]
}

module.exports = nextConfig
