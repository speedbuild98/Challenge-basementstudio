import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { mockPostDetail } from "@/test/fixtures/post";

describe("ArticleHeader", () => {
  it("renders go back, title, intro and author", () => {
    render(<ArticleHeader post={mockPostDetail} />);

    expect(screen.getByRole("link", { name: "← Go back" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: mockPostDetail.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockPostDetail.intro!)).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
