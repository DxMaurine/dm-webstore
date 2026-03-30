/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For simplicity in this demo and to avoid potential issues with local image loading in some environments
  },
};

export default nextConfig;
