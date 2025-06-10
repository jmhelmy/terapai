import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // legacy (uncomment if you prefer):
    // domains: ["images.pexels.com"],

    // recommended in Next 15+:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        // optionally add pathname: "/photos/**"
      },
    ],
  },
  // …any other config you already have
};

export default nextConfig;
