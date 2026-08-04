import { demoNav } from "@/lib/content/demo";
import { resolveFooterColumns, type FooterColumn } from "@/lib/content/footer";
import { CACHE_TAGS } from "@/lib/constants";
import { allowDemoContent } from "@/lib/site";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries/settings";
import type { NavItem, SiteSettings } from "@/types/content";

export type SiteChrome = {
  navigation: NavItem[];
  footerColumns: FooterColumn[];
  footerText?: string | null;
  settings: SiteSettings | null;
};

export async function getSiteChrome(): Promise<SiteChrome> {
  try {
    const settings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: [CACHE_TAGS.siteSettings],
    });

    return {
      settings,
      navigation: settings?.navigation?.length ? settings.navigation : demoNav,
      footerColumns: resolveFooterColumns(settings?.footer?.links),
      footerText: settings?.footer?.text,
    };
  } catch (error) {
    console.error("[content/chrome] settings fetch failed", error);
    if (!allowDemoContent()) {
      return {
        settings: null,
        navigation: demoNav,
        footerColumns: resolveFooterColumns(null),
        footerText: null,
      };
    }
    return {
      settings: null,
      navigation: demoNav,
      footerColumns: resolveFooterColumns(null),
      footerText: null,
    };
  }
}

export async function getSiteNavigation(): Promise<NavItem[]> {
  const chrome = await getSiteChrome();
  return chrome.navigation;
}
