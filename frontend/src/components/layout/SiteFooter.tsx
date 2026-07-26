import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-[3px] border-ink">
      <div className="mx-auto flex max-w-[72rem] flex-col gap-5 px-5 py-8 md:flex-row md:items-end md:justify-between md:px-7">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-ink">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-mute">
            {siteConfig.tagline} A paper of record for products built with depth.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-mute">
          {[
            ["Issues", "/issues"],
            ["Discover", "/discover"],
            ["Write", "/write"],
            ["Sign in", "/signin"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="ink-link transition-colors duration-150 hover:text-mark"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-[var(--rule)] bg-ink text-paper">
        <p className="mx-auto max-w-[72rem] px-5 py-2.5 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-paper/70 md:px-7">
          Printed for the web · Assay © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
