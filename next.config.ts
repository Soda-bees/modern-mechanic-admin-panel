/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
      loader: 'custom',
      // Set this to your base path or deployment path
      path: '/',
    },
  };
  
  module.exports = nextConfig;
  