import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const contrasts = [
  { them: "What's new today", us: "What's been true for years" },
  { them: "Launch moment", us: "Running record" },
  { them: "Product as object", us: "Builder + journey" },
  { them: "Upvotes", us: "Paper trail" },
];

export function Manifesto() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto grid max-w-[64rem] gap-12 px-6 py-24 pl-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pl-14 md:py-32">
        <Reveal>
          <SectionLabel>Why this exists</SectionLabel>
          <h2 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
            See what's real.
          </h2>
          <p className="mt-5 max-w-md font-body text-lg leading-[1.7] text-mute">
            Product Hunt's promise is novelty. Ours is evidence — original
            engineering, honest tradeoffs, long-term work.
          </p>
        </Reveal>

        <div className="space-y-0">
          {contrasts.map((row, i) => (
            <Reveal key={row.them} delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-2 border-b border-line py-5 sm:grid-cols-2 sm:gap-8">
                <p className="font-sans text-sm text-fog/70 line-through decoration-[#5a6b45]/50">
                  {row.them}
                </p>
                <p className="font-sans text-sm font-medium text-ink">
                  {row.us}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
