import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSiteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "basement. Journal",
    template: `%s · basement.`,
  },
  description:
    "Research, insights, and the science behind building brands & websites.",
  applicationName: "basement. Journal",
  icons: {
    icon: [{ url: "/brand/basement-logo.svg", type: "image/svg+xml" }],
    shortcut: ["/brand/basement-logo.svg"],
    apple: [{ url: "/brand/basement-logo.svg" }],
  },
  openGraph: {
    type: "website",
    siteName: "basement. Journal",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="color-scheme-dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
