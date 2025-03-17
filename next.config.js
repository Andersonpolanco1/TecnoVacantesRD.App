/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },
  reactStrictMode: true,
  devIndicators: {
    autoPreRender: false,
  },
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
