/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      appDir: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Port Anda, biasanya 3000 saat development
        pathname: "/**", // Semua path di localhost
      },
      {
        protocol: "http",
        hostname: "192.168.1.114",
        port: "3000", // Port Anda, biasanya 3000 saat development
        pathname: "/**", // Semua path di localhost
      },
    ],
  },
};
