import { describe, expect, it } from "vitest";

import { FIGMA_HERO_TITLE, formatHeroTitle } from "@/lib/content/hero-title";

describe("formatHeroTitle", () => {
  it("maps the default flat copy to Figma breaks", () => {
    expect(
      formatHeroTitle(
        "Research, insights, and the science behind building brands & websites.",
      ),
    ).toBe(FIGMA_HERO_TITLE);
  });

  it("keeps CMS titles that already include newlines", () => {
    expect(formatHeroTitle("Line one\nLine two")).toBe("Line one\nLine two");
  });

  it("returns custom single-line titles unchanged", () => {
    expect(formatHeroTitle("A custom hero")).toBe("A custom hero");
  });
});
