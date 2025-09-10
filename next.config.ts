import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async function () {
    return [
      {
        source: '/',
        destination: '/auth/sign-in',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
