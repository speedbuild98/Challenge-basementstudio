import type { NavItem } from "@/types/content";

export type FooterColumn = {
  title: string;
  links: NavItem[];
  external?: boolean;
};

/** Real Basement destinations — never ship `#` placeholders. */
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
      { label: "Privacy Policy", href: "https://basement.studio/privacy" },
      { label: "Cookies", href: "https://basement.studio/cookies" },
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

export function resolveFooterColumns(
  cmsLinks?: NavItem[] | null,
): FooterColumn[] {
  if (!cmsLinks?.length) return defaultFooterColumns;

  const blog = { label: "Blog", href: "/" };
  const external = cmsLinks.filter((link) => /^https?:\/\//i.test(link.href));
  const internal = cmsLinks.filter((link) => !/^https?:\/\//i.test(link.href));

  return [
    {
      title: "Website",
      links: [
        blog,
        ...internal.filter((link) => link.href !== "/" && link.href !== "#"),
      ],
    },
    defaultFooterColumns[1],
    {
      title: "Connect",
      external: true,
      links: external.length ? external : defaultFooterColumns[2].links,
    },
  ];
}
