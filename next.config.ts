import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger shared hosting caps how many processes a build may start, so
  // keep the build to one worker.
  experimental: { cpus: 1 },
  images: {
    // The widest thing on the site is a full-bleed hero on a desktop screen.
    // Next's defaults go up to 3840, which made the optimiser build enormous
    // variants of every photograph on first load and left the page waiting on
    // sixteen pending requests. Nothing here needs more than 1920.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
