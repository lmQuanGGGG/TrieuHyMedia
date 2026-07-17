import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.trieuhymedia.net" }],
        destination: "https://trieuhymedia.net/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
