import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CategoryPill } from "@/components/ui/CategoryPill";

describe("CategoryPill", () => {
  it("renders a plain label when no href is provided", () => {
    render(<CategoryPill label="Design" />);
    expect(screen.getByText("Design").tagName).toBe("SPAN");
  });

  it("renders a link when href is provided", () => {
    render(<CategoryPill label="Design" href="/category/design" />);
    expect(screen.getByRole("link", { name: "Design" })).toHaveAttribute(
      "href",
      "/category/design",
    );
  });

  it("applies dark tone styles", () => {
    const { container } = render(
      <CategoryPill label="Case Study" tone="dark" />,
    );
    expect(container.firstChild).toHaveClass("bg-[#2e2e2e]");
  });
});
