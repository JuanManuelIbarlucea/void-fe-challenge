/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.valorant-api.com",
      "loremflickr.com",
      "cloudflare-ipfs.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
