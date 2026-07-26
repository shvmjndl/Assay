const contrasts = [
  { them: "What's new today", us: "What's been true for years" },
  { them: "Launch moment", us: "Running record" },
  { them: "Product as object", us: "Builder + journey" },
  { them: "Upvotes", us: "Paper trail" },
];

export function Manifesto() {
  return (
    <section className="border-b border-[var(--rule)]">
      <div className="mx-auto grid max-w-[72rem] md:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-[var(--rule)] px-5 py-10 md:border-b-0 md:border-r md:px-7 md:py-12">
          <p className="kicker">Comment</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.08] tracking-tight text-ink">
            See what&apos;s real.
          </h2>
          <div className="cols-2 mt-5 font-body text-[0.95rem] leading-[1.7] text-mute">
            <p>
              Product Hunt&apos;s promise is novelty. Ours is evidence — original
              engineering, honest tradeoffs, long-term work. We print the stuck
              periods and the architecture bets, not the launch-day applause.
            </p>
            <p className="mt-4 md:mt-0">
              If a product has been underway for years, the paper trail is the
              story. Assay is where that record is set in type.
            </p>
          </div>
        </div>

        <div className="px-5 py-10 md:px-7 md:py-12">
          <p className="kicker mb-4">The ledger</p>
          {contrasts.map((row) => (
            <div
              key={row.them}
              className="paper-row grid grid-cols-1 gap-1 border-b border-[var(--rule)] py-3.5 last:border-0 sm:grid-cols-2 sm:gap-6"
            >
              <p className="font-body text-sm text-fog line-through decoration-rose/50">
                {row.them}
              </p>
              <p className="font-body text-sm font-medium text-ink">{row.us}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
