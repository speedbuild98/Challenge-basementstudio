/** Figma Desktop Blog (19:993) — exact hero line breaks. */
export const FIGMA_HERO_TITLE =
  "Research, insights, and the\nscience behind building brands\n& websites.";

const FIGMA_HERO_FLAT =
  "Research, insights, and the science behind building brands & websites.";

/** Prefer CMS newlines; map the default copy to Figma breaks. */
export function formatHeroTitle(title: string): string {
  const trimmed = title.replace(/\r\n/g, "\n").trim();
  if (trimmed.includes("\n")) return trimmed;

  const flat = trimmed.replace(/\s+/g, " ");
  if (flat === FIGMA_HERO_FLAT) return FIGMA_HERO_TITLE;

  return trimmed;
}
