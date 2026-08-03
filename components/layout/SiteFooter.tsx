import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";

const websiteLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#" },
  { label: "Showcase", href: "#" },
  { label: "People", href: "#" },
  { label: "Blog", href: "/" },
  { label: "Lab", href: "#" },
];

const legalLinks = [
  { label: "Terms of Use", href: "#" },
  { label: "Terms and Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Trust Center", href: "#" },
];

const connectLinks = [
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Github", href: "https://github.com" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-black pt-9">
      <div className="border-t border-white/10" />
      <Container className="pt-9 pb-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <FooterColumn title="Website" links={websiteLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Connect" links={connectLinks} external />
        </div>

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
          <Text variant="meta" className="text-grey">
            © basement.studio LLC {new Date().getFullYear()}. All rights reserved.
          </Text>
          <div className="flex items-center gap-4">
            <Text variant="meta" className="text-grey">
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

function FooterColumn({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <Text variant="meta" className="mb-4 text-orange">
        {title}
      </Text>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[length:var(--text-body)] font-semibold text-white transition-colors hover:text-orange"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
