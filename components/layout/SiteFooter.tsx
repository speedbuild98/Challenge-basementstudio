import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
import type { FooterColumn } from "@/lib/content/footer";
import { defaultFooterColumns } from "@/lib/content/footer";

type SiteFooterProps = {
  columns?: FooterColumn[];
  footerText?: string | null;
};

export function SiteFooter({
  columns = defaultFooterColumns,
  footerText,
}: SiteFooterProps) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-black pt-9">
      <div className="border-t border-white/10" />
      <Container className="pt-9 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((column) => (
            <FooterColumnView key={column.title} column={column} />
          ))}
        </div>

        {footerText ? (
          <Text variant="body" className="mt-10 max-w-xl text-muted-foreground">
            {footerText}
          </Text>
        ) : null}

        <div className="relative mt-16 select-none" aria-hidden>
          <Image
            src="/brand/basement-wordmark.svg"
            alt=""
            width={1378}
            height={193}
            className="h-auto w-full opacity-90"
            priority={false}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-transparent pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="meta" className="text-muted-foreground">
            © basement.studio LLC {new Date().getFullYear()}. All rights reserved.
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
    <div>
      <Text variant="meta" className="mb-4 text-orange">
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
                className="inline-flex min-h-11 items-center text-[length:var(--text-body)] font-semibold text-white transition-colors hover:text-orange"
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
