/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "www.gravatar.com",
      "files.edgestore.dev",
      "i.ytimg.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
