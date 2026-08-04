import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Figma Desktop Typekit roles:
 * display → GEIST SEMIBOLD 76
 * h1 → GEIST SEMIBOLD 38
 * h2 → GEIST SEMIBOLD 24
 * h2Regular → GEIST REGULAR 24
 * bodyStrong → GEIST SEMIBOLD 16
 * bodyMedium → GEIST MEDIUM 16
 * body → GEIST REGULAR 16
 * meta → GEIST MONO MEDIUM 14 uppercase
 * caption → GEIST SEMIBOLD 13
 */
const variants = {
  display:
    "font-sans font-semibold tracking-[var(--tracking-display)] [font-size:var(--text-display)] [line-height:var(--leading-display)] [font-weight:var(--font-weight-semibold)]",
  h1: "font-sans font-semibold tracking-[var(--tracking-h1)] [font-size:var(--text-h1)] [line-height:var(--leading-h1)] [font-weight:var(--font-weight-semibold)]",
  h2: "font-sans font-semibold tracking-[var(--tracking-h2)] [font-size:var(--text-h2)] [line-height:var(--leading-h2)] [font-weight:var(--font-weight-semibold)]",
  h2Regular:
    "font-sans font-normal tracking-[var(--tracking-h2)] [font-size:var(--text-h2)] [line-height:var(--leading-h2)] [font-weight:var(--font-weight-regular)]",
  h3: "font-sans font-semibold tracking-[var(--tracking-h2)] [font-size:var(--text-h3)] [line-height:var(--leading-h2)] [font-weight:var(--font-weight-semibold)]",
  body: "font-sans font-normal tracking-[var(--tracking-body)] [font-size:var(--text-body)] [line-height:var(--leading-body)] [font-weight:var(--font-weight-regular)]",
  bodyMedium:
    "font-sans font-medium tracking-[var(--tracking-body)] [font-size:var(--text-body)] [line-height:var(--leading-body)] [font-weight:var(--font-weight-medium)]",
  bodyStrong:
    "font-sans font-semibold tracking-[var(--tracking-body)] [font-size:var(--text-body)] [line-height:var(--leading-body)] [font-weight:var(--font-weight-semibold)]",
  meta: "font-mono font-medium uppercase tracking-[var(--tracking-meta)] [font-size:var(--text-meta)] [line-height:var(--leading-meta)] [font-weight:var(--font-weight-medium)]",
  caption:
    "font-sans font-semibold tracking-[var(--tracking-caption)] [font-size:var(--text-caption)] [line-height:var(--leading-caption)] [font-weight:var(--font-weight-semibold)]",
} as const;

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  children,
  className,
  ...rest
}: TextProps<T>) {
  const Tag = as || "p";
  return (
    <Tag className={cn(variants[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
