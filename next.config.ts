import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-tools indicator (bottom-left "N" circle) so it never shows up
  // in exported screenshots / PDFs captured from the dev server.
  devIndicators: false,
};

export default nextConfig;
