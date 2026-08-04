import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "@/components/ui/Skeleton";

describe("Skeleton", () => {
  it("is aria-hidden", () => {
    const { container } = render(<Skeleton className="h-4 w-20" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden");
  });

  it("uses light tone background on cream surfaces", () => {
    const { container } = render(<Skeleton tone="light" />);
    expect(container.firstChild).toHaveClass("bg-black/8");
  });
});
