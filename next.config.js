/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
  reactStrictMode: true
};

module.exports = withPlugins([
    [optimizedImages, {}],
    [
        withPWA,
        {
            pwa: {
                dest: 'public',
                disable: false,
                register: true,
                scope: '/',
                sw: 'service-worker.js',
            },
        },
    ],
], nextConfig);
