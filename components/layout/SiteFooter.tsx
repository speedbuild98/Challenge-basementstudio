import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { FooterWordmark } from "@/components/motion/FooterWordmark";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/ui/Text";
import type { FooterColumn } from "@/lib/content/footer";
import { defaultFooterColumns } from "@/lib/content/footer";

type SiteFooterProps = {
  columns?: FooterColumn[];
  /** Unused in layout — copyright lives in the bottom bar (Figma). */
  footerText?: string | null;
};

/**
 * Figma footer 19:1096:
 * columns @ left pitch ~234 · title→links gap 16 · link gap 8
 * wordmark full-bleed · copyright + SoDA bottom row
 */
export function SiteFooter({
  columns = defaultFooterColumns,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden bg-black">
      <div className="border-t border-white/10" />
      {/* Figma Desktop Footer: columns @ y+35 inside 550px frame */}
      <Container className="pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[2.2rem]">
        <Reveal y={24}>
          {/* Figma: columns clustered left, not stretched across the well */}
          <div className="flex flex-wrap gap-x-[9.625rem] gap-y-10">
            {columns.map((column) => (
              <FooterColumnView key={column.title} column={column} />
            ))}
          </div>
        </Reveal>

        <FooterWordmark />

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="meta" className="text-muted-foreground">
            © basement.studio LLC {year}. All rights reserved.
          </Text>
          <div className="flex items-center gap-4">
            <Text variant="meta" className="text-muted-foreground">
              Proud Member of SoDA
            </Text>
            <Image
              src="/brand/soda-mark.svg"
              alt="SoDA"
              width={21}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumnView({ column }: { column: FooterColumn }) {
  return (
    <div className="flex min-w-[4.9rem] flex-col gap-4">
      <Text variant="meta" className="text-orange">
        {column.title}
      </Text>
      <ul className="flex flex-col gap-2">
        {column.links.map((link) => {
          const external =
            column.external || /^https?:\/\//i.test(link.href);
          return (
            <li key={`${column.title}-${link.label}`}>
              <Link
                href={link.href}
                className="inline-flex font-sans text-base font-semibold leading-[1.3] tracking-[var(--tracking-body)] text-white transition-colors hover:text-orange [font-weight:var(--font-weight-semibold)]"
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
