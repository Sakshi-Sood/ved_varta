/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        pathname: '/v1/storage/**'
      },
      {
        protocol: 'https',
        hostname: '*.hostingersite.com',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any domain for Hostinger custom domains
        pathname: '/uploads/**'
      }
    ]
  }
  // output: 'export'

};

export default nextConfig;
