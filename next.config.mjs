/** @type {import('next').NextConfig} */
const nextConfig = {
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
