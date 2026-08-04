import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site";

/** Brand SEO aligned with https://basement.studio */
export const BRAND = {
  name: "basement.studio",
  shortName: "basement.",
  journalName: "basement. Journal",
  tagline: "We make cool shit that performs.",
  description:
    "basement.studio is a digital studio crafting brands, websites, 3D experiences, and products. We design and engineer cool shit that actually performs.",
  journalDescription:
    "Research, insights, and the science behind building brands & websites — from the basement.studio journal.",
  url: "https://basement.studio",
  twitter: "@basementstudio",
  ogImage: "/brand/og-image.png",
  locale: "en_US",
  sameAs: [
    "https://x.com/basementstudio",
    "https://www.instagram.com/basementstudio",
    "https://github.com/basementstudio",
  ],
} as const;

export function buildRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const title = `${BRAND.journalName} | ${BRAND.tagline}`;
  const description = BRAND.journalDescription;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${BRAND.name}`,
    },
    description,
    applicationName: BRAND.journalName,
    authors: [{ name: BRAND.name, url: BRAND.url }],
    creator: BRAND.name,
    publisher: BRAND.name,
    keywords: [
      "basement.studio",
      "digital studio",
      "web design",
      "brand identity",
      "Next.js",
      "GSAP",
      "WebGL",
      "creative development",
      "journal",
    ],
    category: "technology",
    referrer: "origin-when-cross-origin",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/brand/basement-logo.svg", type: "image/svg+xml" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/brand/basement-logo.svg" }],
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: BRAND.locale,
      url: siteUrl,
      siteName: BRAND.name,
      title,
      description,
      images: [
        {
          url: BRAND.ogImage,
          width: 1200,
          height: 642,
          alt: BRAND.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: BRAND.twitter,
      creator: BRAND.twitter,
      title,
      description,
      images: [BRAND.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: [
      "Basement Studio",
      "basement studio",
      "basement",
      "BSMNT",
      "basementstudio",
    ],
    url: BRAND.url,
    logo: `${siteUrl}/brand/basement-logo.svg`,
    image: `${siteUrl}${BRAND.ogImage}`,
    description: BRAND.description,
    sameAs: BRAND.sameAs,
    areaServed: "Worldwide",
    knowsAbout: [
      "Web design",
      "Brand identity",
      "3D interactive experiences",
      "Next.js development",
      "GSAP animation",
      "WebGL",
    ],
  };
}

export function websiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.journalName,
    url: siteUrl,
    description: BRAND.journalDescription,
    publisher: { "@id": `${BRAND.url}/#organization` },
    inLanguage: "en",
  };
}
