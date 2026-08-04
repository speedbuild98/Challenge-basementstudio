import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/motion/JsonLd";
import {
  buildRootMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = buildRootMetadata();

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
        className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} min-h-dvh antialiased`}
      >
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
