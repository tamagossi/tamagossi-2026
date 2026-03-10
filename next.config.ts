import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.md": {
        as: "*.js",
        loaders: ["raw-loader"],
      },
    },
  },
};

export default nextConfig;
