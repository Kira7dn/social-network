/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "www.gravatar.com",
      "files.edgestore.dev",
      "i.ytimg.com",
    ],
  },
};

module.exports = nextConfig;
