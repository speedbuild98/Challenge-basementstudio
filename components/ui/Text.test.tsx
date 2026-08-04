import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Text } from "@/components/ui/Text";

describe("Text", () => {
  it("renders as a paragraph by default", () => {
    render(<Text>Body copy</Text>);
    expect(screen.getByText("Body copy").tagName).toBe("P");
  });

  it("supports polymorphic elements", () => {
    render(
      <Text as="h1" variant="h1">
        Heading
      </Text>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Heading" })).toBeInTheDocument();
  });
});
