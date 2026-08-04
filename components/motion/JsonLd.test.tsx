import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JsonLd } from "@/components/motion/JsonLd";

describe("JsonLd", () => {
  it("embeds escaped JSON-LD", () => {
    const { container } = render(
      <JsonLd data={{ "@type": "Article", name: "</script>" }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.innerHTML).toContain("\\u003c");
    expect(script?.innerHTML).not.toContain("</script>");
  });
});
