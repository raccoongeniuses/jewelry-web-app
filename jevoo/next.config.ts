import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.jevoo-jewellery.com',
        port: '',
        pathname: '/api/media/**',
      },
    ],
  },
  // Add API rewrites to avoid CORS issues
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/cart/:path*',
  //       destination: 'https://api.jevoo-jewellery.com/api/cart/:path*',
  //     },
  //     {
  //       source: '/api/proxy/cart/:path*',
  //       destination: 'https://api.jevoo-jewellery.com/api/cart/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
