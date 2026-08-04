import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "@/components/layout/Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports polymorphic tags and width variants", () => {
    const { container } = render(
      <Container as="section" width="narrow">
        Narrow
      </Container>,
    );
    expect(container.firstChild?.nodeName).toBe("SECTION");
    expect(container.firstChild).toHaveClass("max-w-[var(--container-narrow)]");
  });
});
