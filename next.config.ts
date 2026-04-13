/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },
  output: "export", // 👈 ВАЖНО
};

module.exports = nextConfig;