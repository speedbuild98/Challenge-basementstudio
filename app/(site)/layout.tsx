import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { getSiteChrome } from "@/lib/content/chrome";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigation, footerColumns, footerText } = await getSiteChrome();

  return (
    <div className="flex min-h-dvh flex-col bg-black text-white">
      <SkipLink />
      <CustomCursor />
      <SiteHeader navigation={navigation} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter columns={footerColumns} footerText={footerText} />
    </div>
  );
}
