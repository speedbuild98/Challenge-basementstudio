import { demoNav } from "@/lib/content/demo";
import { CACHE_TAGS } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries/settings";
import type { NavItem, SiteSettings } from "@/types/content";

export async function getSiteNavigation(): Promise<NavItem[]> {
  try {
    const settings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: [CACHE_TAGS.siteSettings],
    });
    return settings?.navigation?.length ? settings.navigation : demoNav;
  } catch {
    return demoNav;
  }
}
