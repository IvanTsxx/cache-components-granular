import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  cacheComponents: true,
  reactStrictMode: true,
  rewrites() {
    return [
      {
        destination: "/llms.mdx/docs/:path*",
        source: "/docs/:path*.mdx",
      },
    ];
  },
  typedRoutes: true,
};

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

export default withMDX(config);
