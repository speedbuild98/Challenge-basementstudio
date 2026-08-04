import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const variants = {
  accent:
    "bg-orange text-black hover:brightness-110 focus-visible:outline-orange",
  secondary:
    "bg-white text-black hover:bg-light-grey focus-visible:outline-orange",
  contact:
    "bg-black text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(255,255,255,0.1)] hover:bg-dark-grey",
  ghost: "bg-transparent text-white hover:text-orange",
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
} & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children" | "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] px-3 py-2 font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[0.9] tracking-[var(--tracking-meta)] transition-[filter,background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button(props: ButtonProps) {
  const classes = cn(baseClass, variants[props.variant ?? "accent"], props.className);

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
