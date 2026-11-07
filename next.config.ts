import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * NEXT_PUBLIC_BASE_PATH is set by the deploy workflow to "/<repo-name>"
 * for project sites. Leave it empty for a custom domain or a
 * <username>.github.io repository.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
