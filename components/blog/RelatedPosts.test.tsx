import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { mockPosts } from "@/test/fixtures/post";

describe("RelatedPosts", () => {
  it("returns null when there are no posts", () => {
    const { container } = render(<RelatedPosts posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the section title and up to three cards", () => {
    render(<RelatedPosts posts={mockPosts} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Related Posts/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Read more" })).toHaveLength(3);
  });
});
