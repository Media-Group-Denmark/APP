/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
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
