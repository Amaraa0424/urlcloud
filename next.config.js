/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLOUDNAME: "dmn841od0",
    APIKEY: "312467562666144",
    APISECRET: "DlC8NBpOX7agbn4u-WYtgBwhLNk",
    PRESET: "prod_preset",
  },

  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
