/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Ignores TypeScript Errors
    ignoreBuildErrors: true,
  },
    experimental: {urlImports: ['https://themer.sanity.build/']},
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
            }
          ],
        },
        experimental: {
          taint: true,
        },
        transpilePackages: ["geist"],
};

export default nextConfig;
