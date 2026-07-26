import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-6 px-6 py-12 pl-8 md:flex-row md:items-end md:justify-between md:px-10 md:pl-14">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {siteConfig.name}
          </p>
          <p className="mt-1.5 max-w-xs font-body text-sm leading-relaxed text-mute">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
          <Link href="/issues" className="transition-colors duration-300 hover:text-[#7e98aa]">
            Issues
          </Link>
          <Link href="/discover" className="transition-colors duration-300 hover:text-[#7e98aa]">
            Discover
          </Link>
          <Link href="/write" className="transition-colors duration-300 hover:text-[#7e98aa]">
            Write
          </Link>
          <Link href="/signin" className="transition-colors duration-300 hover:text-[#7e98aa]">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
