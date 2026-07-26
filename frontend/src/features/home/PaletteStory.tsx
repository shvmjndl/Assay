import { SectionLabel } from "@/components/ui/SectionLabel";
import { themeStory } from "@/config/theme";

export function PaletteStory() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[64rem] px-6 py-24 pl-8 md:px-10 md:pl-14 md:py-32">
        <div>
          <SectionLabel>The palette</SectionLabel>
          <p className="mt-5 max-w-lg font-body text-lg leading-[1.7] text-mute">
            Six pigments. Varying opacity is the brushload — most of the canvas
            stays bare. Color arrives only where it matters.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {themeStory.pigments.map((pigment) => (
            <div
              key={pigment.id}
              className="flex flex-col gap-3 bg-[#faf6f5] p-6 transition-colors duration-300 hover:bg-[#c6989a]/[0.05]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: pigment.hex }}
                  aria-hidden
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fog">
                  {pigment.role}
                </span>
              </div>
              <p className="font-sans text-sm font-medium text-ink">
                {pigment.id.replace(/-/g, " ")}
              </p>
              <p className="font-body text-sm leading-relaxed text-mute">
                {pigment.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
