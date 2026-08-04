import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlockComponent,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";

type PortableBodyProps = {
  value?: PortableTextBlock[] | null;
  className?: string;
};

/** Article body uses Typekit 24 / 16 — not the 38 display title. */
const Heading2: PortableTextBlockComponent = ({ children }) => (
  <h2 className="mt-16 font-sans text-[length:var(--text-h2)] font-semibold leading-[var(--leading-h2)] tracking-[var(--tracking-h2)] text-white first:mt-0 [font-weight:var(--font-weight-semibold)]">
    {children}
  </h2>
);

const Heading3: PortableTextBlockComponent = ({ children }) => (
  <h3 className="mt-8 font-sans text-[length:var(--text-h2)] font-semibold leading-[var(--leading-h2)] tracking-[var(--tracking-h2)] text-white [font-weight:var(--font-weight-semibold)]">
    {children}
  </h3>
);

const components: PortableTextComponents = {
  block: {
    h2: Heading2,
    h3: Heading3,
    normal: ({ children }) => (
      <p className="mt-6 font-sans text-[length:var(--text-body)] font-normal leading-[var(--leading-body)] tracking-[var(--tracking-body)] text-white first:mt-0 [font-weight:var(--font-weight-regular)] md:text-base">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-16 font-sans text-[length:var(--text-h2)] font-semibold leading-[var(--leading-h2)] tracking-[var(--tracking-h2)] text-white [font-weight:var(--font-weight-semibold)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 font-sans text-white marker:text-orange">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 font-sans text-white marker:text-orange">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[length:var(--text-body)] leading-[var(--leading-body)] md:text-base">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[length:var(--text-body)] leading-[var(--leading-body)] md:text-base">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold [font-weight:var(--font-weight-semibold)] text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-dark-grey px-1 font-mono text-[0.9em] text-orange">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = String(value?.href || "#");
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="underline decoration-white underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const alt = value.alt || "";
      let src = "";
      try {
        src = urlForImage(value).width(1400).url();
      } catch {
        return null;
      }
      return (
        <figure className="my-12">
          <div className="relative aspect-[16/9] overflow-hidden border border-white/20">
            <Image src={src} alt={alt} fill className="object-cover" sizes="904px" />
          </div>
          {value.caption ? (
            <figcaption className="mt-3 font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-muted-foreground">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableBody({ value, className }: PortableBodyProps) {
  if (!value?.length) return null;

  return (
    <div className={cn("portable-body font-sans", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
