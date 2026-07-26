import Link from "next/link";
import { SoftButton } from "@/components/ui/SoftButton";
import { siteConfig } from "@/config/site";

const editionItems = [
  {
    label: "Issues",
    text: "Full paper trails — architecture, stuck periods, tradeoffs.",
    href: "/issues",
  },
  {
    label: "Discover",
    text: "Sort by years underway and craft stamps.",
    href: "/discover",
  },
  {
    label: "Write",
    text: "Publish your journey with the Assay template.",
    href: "/write",
  },
];

export function Hero() {
  return (
    <section>
      {/* Banner headline */}
      <div className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-[72rem] px-5 py-10 md:px-7 md:py-12">
          <p className="kicker">Front page</p>
          <h2 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            Products assayed for craft — not launch-day noise.
          </h2>
          <p className="deck mt-4 max-w-2xl border-l-[3px] border-mark pl-4">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SoftButton href="/issues" variant="ink">
              Read today&apos;s log
            </SoftButton>
            <SoftButton href="/write" variant="ghost">
              Write an issue
            </SoftButton>
          </div>
        </div>
      </div>

      {/* Three-column front page */}
      <div className="mx-auto grid max-w-[72rem] border-b border-[var(--rule)] md:grid-cols-3">
        <div className="border-b border-[var(--rule)] px-5 py-8 md:border-b-0 md:border-r md:px-7">
          <p className="kicker">Briefing</p>
          <p className="mt-3 font-body text-[0.95rem] leading-[1.7] text-ink">
            Assay is the opposite of a launch feed. We publish the long record —
            the bet underneath the product, where builders got stuck, and what
            they gave up to ship something real.
          </p>
          <p className="mt-4 font-body text-[0.95rem] leading-[1.7] text-mute">
            One profile. Every Tuesday. Architecture diagrams, decision tables,
            timelines measured in years.
          </p>
        </div>

        <div className="border-b border-[var(--rule)] px-5 py-8 md:border-b-0 md:border-r md:px-7">
          <p className="kicker">In this edition</p>
          <ul className="mt-3 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {editionItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="paper-row group block py-3.5 focus-ring"
                >
                  <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.12em] text-mark">
                    {item.label}
                  </span>
                  <p className="ink-link mt-1 inline font-body text-[0.92rem] leading-snug text-ink">
                    {item.text}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 py-8 md:px-7">
          <p className="kicker">Index</p>
          <dl className="mt-3 space-y-3 border-y border-[var(--rule)] py-3">
            {[
              ["Form", "Assay template"],
              ["Sort", "Years underway"],
              ["Signal", "Craft stamps"],
              ["Cadence", "Weekly"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-2 last:border-0 last:pb-0"
              >
                <dt className="byline text-[0.65rem]">{k}</dt>
                <dd className="font-body text-sm font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-body text-sm italic text-fog">
            Opposite of Product Hunt: evidence over novelty.
          </p>
        </div>
      </div>
    </section>
  );
}
