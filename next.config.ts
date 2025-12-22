import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.postimg.cc", "res.cloudinary.com", "www.svgrepo.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "i.postimg.cc",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "www.svgrepo.com",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
