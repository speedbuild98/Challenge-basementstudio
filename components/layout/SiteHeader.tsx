import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { demoNav } from "@/lib/content/demo";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/content";

type SiteHeaderProps = {
  navigation?: NavItem[] | null;
  activeHref?: string;
};

export function SiteHeader({
  navigation,
  activeHref = "/",
}: SiteHeaderProps) {
  const items = navigation?.length ? navigation : demoNav;

  return (
    <header className="relative z-20 pt-4 md:pt-6">
      <Container>
        <div
          className={cn(
            "flex h-[52px] items-center justify-between rounded-[var(--radius-lg)] py-2 pr-2 pl-4",
            "border border-white/10 bg-gradient-to-r from-[var(--color-nav-from)] to-[var(--color-nav-to)] backdrop-blur-md",
          )}
        >
          <Link
            href="/"
            className="relative block h-8 w-[100px] shrink-0 focus-visible:outline-offset-4"
            aria-label="basement. home"
          >
            <Image
              src="/brand/basement-logo.svg"
              alt=""
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const active =
                  item.href === activeHref ||
                  (item.label.toLowerCase() === "blog" && activeHref === "/");
                return (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex min-h-11 items-center px-4 py-2 text-[length:var(--text-body)] font-semibold leading-[var(--leading-body)] transition-colors duration-[var(--duration-fast)]",
                        active
                          ? "text-orange"
                          : "text-white hover:text-orange",
                      )}
                      aria-current={active ? "page" : undefined}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                      {item.href.startsWith("http") ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="#contact"
              variant="contact"
              className="hidden min-h-11 rounded-lg px-8 sm:inline-flex"
            >
              Contact us
            </Button>
            <MobileNav items={items} activeHref={activeHref} />
          </div>
        </div>
      </Container>
    </header>
  );
}
