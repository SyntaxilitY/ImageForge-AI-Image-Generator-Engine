import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-static.aiease.ai",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
