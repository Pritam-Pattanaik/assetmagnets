/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Add any external image domains here
  },
  // Server Actions are enabled by default in Next.js 14+
  // No need for experimental config
};

module.exports = nextConfig;