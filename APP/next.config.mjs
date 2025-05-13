/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Ignores TypeScript Errors
    ignoreBuildErrors: true,
  },
  experimental: {
    urlImports: ['https://themer.sanity.build/'],
    taint: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "shikimori.one",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: '_rsc',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;