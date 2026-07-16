import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'g0w00m40-8001.inc1.devtunnels.ms',
      },
      {
        protocol: 'https',
        hostname: '*.devtunnels.ms',
      },
    ],
  },
};

export default nextConfig;
