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
  }
};

export default nextConfig;
