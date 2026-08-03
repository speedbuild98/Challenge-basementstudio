import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { getSiteNavigation } from "@/lib/content/chrome";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getSiteNavigation();

  return (
    <div className="flex min-h-dvh flex-col bg-black text-white">
      <SkipLink />
      <SiteHeader navigation={navigation} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
