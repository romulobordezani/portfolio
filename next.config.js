/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  reactStrictMode: true,
};

const plugins = [
    [optimizedImages, {}],
    [
        withPWA,
        {
            pwa: {
                dest: 'public',
                runtimeCaching
            },
        },
    ],
];

module.exports = async (phase, { defaultConfig }) =>
    withPlugins(plugins, nextConfig)(phase, { ...defaultConfig, ...nextConfig });
