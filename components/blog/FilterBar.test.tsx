import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FilterBar } from "@/components/blog/FilterBar";
import { mockCategory } from "@/test/fixtures/post";

describe("FilterBar", () => {
  it("marks All posts as current when no slug is active", () => {
    render(<FilterBar categories={[mockCategory]} />);
    expect(screen.getByRole("link", { name: "All posts" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Design" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the active category as current", () => {
    render(<FilterBar categories={[mockCategory]} activeSlug="design" />);
    expect(screen.getByRole("link", { name: "Design" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "All posts" })).toHaveAttribute(
      "href",
      "/#knowledge",
    );
  });
});
