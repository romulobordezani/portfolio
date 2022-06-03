/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  basePath: '/portfolio',
};

module.exports = withPlugins([
  [optimizedImages, {
    /* config for next-optimized-images */
  }]
], nextConfig);
