import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a button element by default", () => {
    render(<Button>Read more</Button>);
    expect(screen.getByRole("button", { name: "Read more" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("renders a link when href is provided", () => {
    render(<Button href="/blog/hello">Read more</Button>);
    expect(screen.getByRole("link", { name: "Read more" })).toHaveAttribute(
      "href",
      "/blog/hello",
    );
  });

  it("applies the contact variant classes", () => {
    render(
      <Button variant="contact" href="/contact">
        Contact Us
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveClass(
      "bg-black",
    );
  });
});
