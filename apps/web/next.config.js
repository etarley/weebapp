/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@weebapp/ui"],
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
