import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Editorial",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-white text-black antialiased">{children}</div>
  );
}
