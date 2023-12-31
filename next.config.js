/* eslint-disable */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });

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
