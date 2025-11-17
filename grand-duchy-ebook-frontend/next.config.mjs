/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    IMAGE_BB_SECRET: process.env.IMAGE_BB_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["crypto-js"],
  images: { unoptimized: true },
};

export default nextConfig;
