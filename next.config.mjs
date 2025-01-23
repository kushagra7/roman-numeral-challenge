/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      {
        source: '/romannumeral',
        destination: '/api/romannumeral',
      },
    ];
  },
};

export default nextConfig;