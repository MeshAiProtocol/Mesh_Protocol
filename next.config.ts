import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // Remove X-Frame-Options to allow iframe embedding from any origin
          // X-Frame-Options and CSP frame-ancestors conflict, so we only use CSP
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *", // Allow iframe embedding from any origin
          },
        ],
      },
    ];
  },
};

export default nextConfig;
