import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { FooterWordmark } from "@/components/motion/FooterWordmark";
import { Reveal } from "@/components/motion/Reveal";
import type { FooterColumn } from "@/lib/content/footer";
import { defaultFooterColumns } from "@/lib/content/footer";

type SiteFooterProps = {
  columns?: FooterColumn[];
  /** Unused in layout — copyright lives in the bottom bar (Figma). */
  footerText?: string | null;
};

/**
 * Desktop Footer 19:1096 — pitch 234 · title 14 UPPER · links 16/gap 8 · © below wordmark
 * Mobile Footer 158:4664 — 390×334 · cols x22/121/269 · type 12 UPPER · © overlaid on wordmark
 */
export function SiteFooter({
  columns = defaultFooterColumns,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden bg-black">
      <div className="border-t border-white/10" />
      <Container className="pb-[max(1rem,env(safe-area-inset-bottom))] pt-5 md:pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pt-[2.2rem]">
        <Reveal y={24}>
          {/*
            Mobile: fixed track widths 59 | 40gap | 124 | 24gap | 59 (Figma x 22/121/269)
            Desktop: 234px pitch columns
          */}
          <div className="grid grid-cols-[59px_40px_minmax(0,124px)_24px_59px] md:grid-cols-[repeat(3,234px)]">
            {columns.map((column, index) => (
              <FooterColumnView
                key={column.title}
                column={column}
                className={
                  index === 0
                    ? "col-start-1 md:col-auto"
                    : index === 1
                      ? "col-start-3 md:col-auto"
                      : "col-start-5 md:col-auto"
                }
              />
            ))}
          </div>
        </Reveal>

        {/*
          Mobile: wordmark zone ~101px with © overlaid (Figma y233–334)
          Desktop: wordmark then © row in normal flow
        */}
        <div className="relative mt-[4.125rem] h-[6.3125rem] md:mt-[4.5rem] md:h-auto">
          <FooterWordmark />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 md:static md:mt-8 md:items-center">
            {/* #767676 ≈4.54:1 on black — passes AA; Figma #666 fails at 3.65:1 */}
            <p className="max-w-[10rem] font-mono text-[9px] font-medium leading-[1.25] tracking-[-0.01em] text-[#767676] md:max-w-none md:text-sm md:leading-[1.4] [font-weight:var(--font-weight-medium)]">
              <span className="whitespace-pre-line md:hidden">
                {`© basement.studio LLC ${year}.\nAll rights reserved.`}
              </span>
              <span className="hidden md:inline">
                {`© basement.studio LLC ${year}. All rights reserved.`}
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-1.5 pb-0.5 md:gap-4 md:pb-0">
              <p className="font-mono text-[9px] font-medium leading-none tracking-[-0.01em] text-[#767676] md:text-sm md:leading-[1.4] [font-weight:var(--font-weight-medium)]">
                Proud Member of SoDA
              </p>
              <Image
                src="/brand/soda-mark.svg"
                alt="SoDA"
                width={21}
                height={24}
                className="h-3 w-auto md:h-6"
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumnView({
  column,
  className,
}: {
  column: FooterColumn;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col gap-[0.875rem] md:max-w-[165px] md:gap-4 ${className ?? ""}`}
    >
      {/* Figma textCase UPPER — mono 12 mobile / 14 desktop */}
      <p className="font-mono text-xs font-medium uppercase leading-[1.4] tracking-[-0.01em] text-orange md:text-sm [font-weight:var(--font-weight-medium)]">
        {column.title}
      </p>
      {/* gap-2 + min-h-6 → LH target-size (≥24×24 + spacing) */}
      <ul className="flex flex-col gap-2">
        {column.links.map((link) => {
          const external =
            column.external || /^https?:\/\//i.test(link.href);
          return (
            <li key={`${column.title}-${link.label}`}>
              <Link
                href={link.href}
                className="inline-flex min-h-6 items-center py-1 font-sans text-xs font-semibold leading-[1.3] tracking-[var(--tracking-body)] text-[#e6e6e6] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:-translate-y-px hover:text-orange [font-weight:var(--font-weight-semibold)] md:text-base"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
                {external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
