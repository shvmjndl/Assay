import { SoftButton } from "@/components/ui/SoftButton";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden paper-field">
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[64rem] flex-col justify-center px-6 py-24 pl-8 md:px-10 md:pl-14">
        <p
          className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.22em] text-fog/80"
          style={{ animationDelay: "40ms" }}
        >
          {siteConfig.cadence}
        </p>

        <h1
          className="mt-6 max-w-3xl animate-fade-up font-display text-[clamp(3.25rem,10vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-ink"
          style={{ animationDelay: "120ms" }}
        >
          {siteConfig.name}
          <span className="rose-mark">.</span>
        </h1>

        <p
          className="mt-7 max-w-[26rem] animate-fade-up font-body text-[1.15rem] leading-[1.7] text-mute md:text-xl"
          style={{ animationDelay: "220ms" }}
        >
          {siteConfig.description}
        </p>

        <div
          className="mt-12 flex animate-fade-up flex-wrap items-center gap-4"
          style={{ animationDelay: "320ms" }}
        >
          <SoftButton href="/issues" variant="ink">
            Open the log
          </SoftButton>
          <SoftButton href="/discover" variant="ghost">
            Discover builders
          </SoftButton>
        </div>
      </div>
    </section>
  );
}
