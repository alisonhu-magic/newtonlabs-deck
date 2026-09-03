import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Hide the dev-tools indicator (bottom-left "N" circle) so it never shows up
  // in exported screenshots / PDFs captured from the dev server.
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
