import type { NavItem } from "@/types/content";

export type FooterColumn = {
  title: string;
  links: NavItem[];
  external?: boolean;
};

/** Figma Desktop Blog footer (19:1096) — real Basement destinations. */
export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Website",
    links: [
      { label: "Home", href: "https://basement.studio/" },
      { label: "Services", href: "https://basement.studio/services" },
      { label: "Showcase", href: "https://basement.studio/showcase" },
      { label: "People", href: "https://basement.studio/people" },
      { label: "Blog", href: "/" },
      { label: "Lab", href: "https://basement.studio/lab" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "https://basement.studio/terms" },
      {
        label: "Terms and Conditions",
        href: "https://basement.studio/terms-and-conditions",
      },
      { label: "Privacy Policy", href: "https://basement.studio/privacy" },
      { label: "Trust Center", href: "https://basement.studio/trust" },
    ],
  },
  {
    title: "Connect",
    external: true,
    links: [
      { label: "X (Twitter)", href: "https://x.com/basementstudio" },
      { label: "Instagram", href: "https://www.instagram.com/basementstudio" },
      { label: "Github", href: "https://github.com/basementstudio" },
    ],
  },
];

/**
 * Keep Figma column structure. CMS footer.links may only hold a few items
 * (e.g. Blog + socials) — never collapse Website/Legal to that incomplete set.
 */
export function resolveFooterColumns(
  cmsLinks?: NavItem[] | null,
): FooterColumn[] {
  if (!cmsLinks?.length) return defaultFooterColumns;

  const external = cmsLinks.filter((link) => /^https?:\/\//i.test(link.href));
  const social = external.filter((link) =>
    /twitter|x\.com|instagram|github/i.test(`${link.label} ${link.href}`),
  );

  return [
    defaultFooterColumns[0],
    defaultFooterColumns[1],
    {
      title: "Connect",
      external: true,
      links: social.length ? social : defaultFooterColumns[2].links,
    },
  ];
}
