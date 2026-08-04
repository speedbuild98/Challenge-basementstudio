import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { mockPost } from "@/test/fixtures/post";

describe("FeaturedPost", () => {
  it("renders featured title and CTA", () => {
    render(<FeaturedPost post={mockPost} />);
    expect(
      screen.getByRole("heading", { name: mockPost.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Read full blog post/i }),
    ).toHaveAttribute("href", `/blog/${mockPost.slug}`);
  });

  it("uses dark glass card styles", () => {
    const { container } = render(<FeaturedPost post={mockPost} />);
    expect(container.firstChild).toHaveClass("glass-card-dark");
  });
});
