import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** Site CSP — Studio needs a looser policy (separate source below). */
const siteCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.api.sanity.io https://*.sanity.io https://cdn.sanity.io https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const studioCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://cdn.sanity.io",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.apicdn.sanity.io",
  "font-src 'self' data: https://cdn.sanity.io",
  "connect-src 'self' https://*.api.sanity.io https://*.sanity.io https://cdn.sanity.io https://*.apicdn.sanity.io",
  "frame-src 'self' https://*.sanity.io",
  "worker-src 'self' blob:",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Slightly tighter default compression for LCP / image-delivery insight
    qualities: [60, 70, 75],
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          ...securityHeaders,
          { key: "Content-Security-Policy", value: studioCsp },
        ],
      },
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          { key: "Content-Security-Policy", value: siteCsp },
        ],
      },
    ];
  },
};

export default nextConfig;
