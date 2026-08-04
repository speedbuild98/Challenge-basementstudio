import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Figma buttons:
 * - Secondary (accent/secondary): hug · px-8 py-4 · radius 4 · mono 14 / 0.9 / -1%
 * - Main (contact): h-36 · px-32 py-8 · radius 8 · mono 14 / 1.4 / -1%
 */
const variants = {
  accent:
    "items-end rounded-[var(--radius-sm)] bg-orange px-2 py-1 text-black hover:brightness-110 hover:text-black focus-visible:outline-orange",
  secondary:
    "items-end rounded-[var(--radius-sm)] bg-[#e6e6e6] px-2 py-1 text-black hover:bg-light-grey hover:text-black focus-visible:outline-orange",
  contact:
    "h-9 min-h-9 items-center rounded-lg bg-black px-8 py-2 text-white leading-[1.4] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(255,255,255,0.1)] hover:bg-dark-grey focus-visible:outline-orange",
  ghost:
    "items-center rounded-[var(--radius-sm)] bg-transparent px-2 py-1 text-white hover:text-orange focus-visible:outline-orange",
} as const;

type ButtonVariant = keyof typeof variants;

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "className" | "children" | "href"
>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex justify-center font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[0.9] tracking-[var(--tracking-meta)] whitespace-nowrap [font-weight:var(--font-weight-medium)] transition-[filter,background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button(props: ButtonProps) {
  const classes = cn(
    baseClass,
    variants[props.variant ?? "accent"],
    props.className,
  );

  if (typeof props.href === "string") {
    const { href, children, className: _className, variant: _variant, ...rest } =
      props;
    void _className;
    void _variant;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className: _className,
    variant: _variant,
    type = "button",
    ...rest
  } = props;
  void _className;
  void _variant;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
