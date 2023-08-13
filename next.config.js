/* eslint-disable */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ["items-images-production.s3.us-west-2.amazonaws.com"]
  },
  pageExtensions: ["page.tsx"]
};

module.exports = nextConfig;
