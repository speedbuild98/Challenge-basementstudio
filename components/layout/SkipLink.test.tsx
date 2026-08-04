import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SkipLink } from "@/components/layout/SkipLink";

describe("SkipLink", () => {
  it("points to main content by default", () => {
    render(<SkipLink />);
    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
  });
});
