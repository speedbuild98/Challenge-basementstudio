import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { mockPosts } from "@/test/fixtures/post";

describe("PrevNextNav", () => {
  it("returns null when both sides are empty", () => {
    const { container } = render(<PrevNextNav />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders previous and next links", () => {
    render(
      <PrevNextNav previous={mockPosts[0]} next={mockPosts[1]} />,
    );

    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      `/blog/${mockPosts[0].slug}`,
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      `/blog/${mockPosts[1].slug}`,
    );
    expect(
      screen.getByRole("link", { name: mockPosts[0].title }),
    ).toBeInTheDocument();
  });
});
