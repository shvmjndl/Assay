"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNavLabel } from "@/components/layout/AuthNavLabel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-30 border-b border-line bg-[#c5c2a4]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[64rem] items-center justify-between gap-6 px-6 py-5 pl-8 md:px-10 md:pl-14">
        <Link href="/" className="group flex items-baseline gap-2 focus-ring">
          <span className="font-display text-[1.4rem] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-[#5a6b45]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative focus-ring rounded-md px-3.5 py-2 font-sans text-[0.82rem] tracking-wide transition-colors duration-300",
                  active
                    ? "bg-[#5a6b45]/[0.16] text-[#4a5340]"
                    : "text-mute hover:bg-[#5c4a34]/[0.08] hover:text-ink",
                )}
              >
                {item.href === "/signin" ? (
                  <AuthNavLabel fallback={item.label} />
                ) : (
                  item.label
                )}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-[#5a6b45] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
