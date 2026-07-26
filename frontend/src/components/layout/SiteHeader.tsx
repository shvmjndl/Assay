"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNavLabel } from "@/components/layout/AuthNavLabel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function editionLine() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-30">
      {/* Folio rail */}
      <div className="border-b border-[var(--rule)]">
        <div className="mx-auto grid max-w-[72rem] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-2 md:px-7">
          <p className="byline truncate text-[0.62rem]">{editionLine()}</p>
          <p className="byline text-center text-[0.62rem]">
            {siteConfig.cadence}
          </p>
          <p className="byline text-right text-[0.62rem]">Free · Vol. 1</p>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto max-w-[72rem] px-5 pt-6 md:px-7 md:pt-8">
        <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden text-left md:block">
            <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.14em] text-mark">
              Established for craft
            </p>
            <p className="mt-1 max-w-[14rem] font-body text-xs leading-snug text-fog">
              A paper of record for products built with depth.
            </p>
          </div>

          <Link href="/" className="group justify-self-center focus-ring">
            <span className="block text-center font-display text-[clamp(3rem,9vw,5rem)] font-bold leading-none tracking-[-0.035em] text-ink">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden text-right md:block">
            <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink">
              Digital edition
            </p>
            <p className="mt-1 font-body text-xs text-fog">
              No ads · No launch day
            </p>
          </div>
        </div>

        <p className="mt-3 text-center font-body text-sm italic text-mute md:text-[0.95rem]">
          {siteConfig.tagline}
        </p>

        <div className="double-rule mt-5" />
      </div>

      {/* Nav — ink strip */}
      <nav aria-label="Primary" className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[72rem] flex-wrap items-stretch justify-center md:px-2">
          {siteConfig.nav.map((item, i) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <span key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "focus-ring relative block px-4 py-2.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 md:px-5",
                    active
                      ? "bg-paper text-ink"
                      : "text-paper/90 hover:bg-paper/10",
                  )}
                >
                  {item.href === "/signin" ? (
                    <AuthNavLabel fallback={item.label} />
                  ) : (
                    item.label
                  )}
                </Link>
                {i < siteConfig.nav.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 hidden h-3 w-px -translate-y-1/2 bg-paper/20 md:block"
                  />
                ) : null}
              </span>
            );
          })}
        </div>
      </nav>

      {/* Section flag */}
      <div className="border-b border-[var(--rule)]">
        <div className="section-flag mx-auto max-w-[72rem] px-5 py-2 md:px-7">
          {(
            [
              ["Front", "/"],
              ["The log", "/issues"],
              ["Discover", "/discover"],
              ["Write", "/write"],
            ] as const
          ).map(([label, href], i) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <span key={href} className="contents">
                {i > 0 ? <span className="pipe">|</span> : null}
                <Link
                  href={href}
                  className="transition-colors hover:text-mark"
                >
                  <span data-active={active ? "true" : "false"}>{label}</span>
                </Link>
              </span>
            );
          })}
          <span className="pipe">|</span>
          <span className="text-rose">Evidence, not novelty</span>
        </div>
      </div>
    </header>
  );
}
