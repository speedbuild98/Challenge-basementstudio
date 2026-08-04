import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
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
    /* Mobile nav @12,12 · 366×40 · Desktop @274,23 */
    <header className="relative z-20 pt-3 md:pt-[23px]">
      <Container>
        <div
          className={cn(
            // Mobile 155:4349 — h-40 pl-8 pr-16 · Desktop 19:997 — h-50 pl-16 pr-7.5
            "flex h-10 items-center justify-between rounded-[10px] py-2 pl-2 pr-4 md:h-[50px] md:pl-4 md:pr-[7.5px]",
            "bg-gradient-to-r from-[var(--color-nav-to)] to-[var(--color-nav-from)] backdrop-blur-md md:from-[var(--color-nav-from)] md:to-[var(--color-nav-to)]",
          )}
        >
          <Link
            href="/"
            className="relative block h-9 w-[102px] shrink-0 focus-visible:outline-offset-4 md:h-[46px] md:w-[123px]"
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
            <ul className="flex items-center gap-2">
              {items.map((item) => {
                const active =
                  item.href === activeHref ||
                  (item.label.toLowerCase() === "blog" && activeHref === "/");
                return (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center px-4 py-2 font-sans text-base font-semibold leading-[1.3] tracking-[var(--tracking-body)] [font-weight:var(--font-weight-semibold)] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)]",
                        active
                          ? "text-orange"
                          : "text-white hover:-translate-y-px hover:text-orange",
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
            {/* Figma Mobile Nav = logo + hamburger only; Contact lives on desktop bar */}
            <Magnetic strength={12} className="hidden lg:inline-flex">
              <Button href="#contact" variant="contact">
                Contact Us
              </Button>
            </Magnetic>
            <MobileNav items={items} activeHref={activeHref} />
          </div>
        </div>
      </Container>
    </header>
  );
}
