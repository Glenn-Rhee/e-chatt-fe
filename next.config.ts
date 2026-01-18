import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "g3ot8x7e17.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
