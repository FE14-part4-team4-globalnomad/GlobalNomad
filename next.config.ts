import type { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.[jt]sx?$/],
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;