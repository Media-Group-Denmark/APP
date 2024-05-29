/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Ignores TypeScript Errors
    ignoreBuildErrors: true,
  },
    experimental: {urlImports: ['https://themer.sanity.build/']},
     images: {
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
};

export default nextConfig;
