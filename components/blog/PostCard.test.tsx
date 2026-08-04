import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostCard } from "@/components/blog/PostCard";
import { mockPost } from "@/test/fixtures/post";

describe("PostCard", () => {
  it("renders title, date, categories and read more link", () => {
    render(<PostCard post={mockPost} />);

    expect(
      screen.getByRole("heading", {
        name: mockPost.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dec 3, 2025")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Design" })).toHaveAttribute(
      "href",
      "/category/design",
    );
    expect(screen.getByRole("link", { name: "Read more" })).toHaveAttribute(
      "href",
      `/blog/${mockPost.slug}`,
    );
  });

  it("uses dark glass card styles for related tone", () => {
    const { container } = render(<PostCard post={mockPost} tone="dark" />);
    expect(container.firstChild).toHaveClass("glass-card-dark");
  });

  it("falls back to text layout when no cover is available", () => {
    const { container } = render(
      <PostCard
        post={{ ...mockPost, coverSrc: null, coverUrl: null, coverImage: null }}
        variant="media"
      />,
    );
    expect(container.querySelector("img")).toBeNull();
  });
});
