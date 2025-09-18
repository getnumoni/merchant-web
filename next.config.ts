import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async function () {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cpip-dev-public.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
