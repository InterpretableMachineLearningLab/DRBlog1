import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Nova ships as a fully static site: `next build` emits plain HTML to /out.
  output: "export",
  // Emit `/articles/my-post/index.html` so URLs work on any static host
  // (Cloudflare Pages, Netlify, GitHub Pages, S3, nginx…) without rewrites.
  trailingSlash: true,
  reactStrictMode: true,
  // Pin the workspace root so stray lockfiles in parent folders never confuse
  // the build (safe to remove in a clean checkout).
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
