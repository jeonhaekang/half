/* eslint-disable */
/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
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
  pageExtensions: ["page.tsx", "page.ts", "route.ts"]
};

module.exports = nextConfig;
