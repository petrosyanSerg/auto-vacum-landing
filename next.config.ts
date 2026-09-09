import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    // Modern Sass API uses loadPaths; includePaths is kept for the legacy API.
    loadPaths: [path.join(process.cwd(), 'styles')],
    includePaths: [path.join(process.cwd(), 'styles')],
    // Every SCSS module gets the token/mixin layer without importing it by hand.
    additionalData: `@use "abstracts" as *;`,
    silenceDeprecations: ['import'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // These stills are soft phone footage; a little extra quality is cheap and
    // visible. Next 16 requires every value used by a component to be listed.
    qualities: [72, 75, 82],
    remotePatterns: [
      // YouTube poster frames for the "real work" video wall.
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
