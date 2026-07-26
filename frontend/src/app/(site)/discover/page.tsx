import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DiscoverBoard } from "@/features/discover/DiscoverBoard";
import { getDiscoverItems } from "@/lib/issue-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discover",
  description: "Browse builders by years underway and craft criteria.",
};

export default async function DiscoverPage() {
  const items = await getDiscoverItems();

  return (
    <div className="paper-field">
      <div className="mx-auto max-w-[70rem] px-5 py-12 md:px-8 md:py-16">
        <SectionLabel>Survey</SectionLabel>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Discover
        </h1>
        <p className="mt-4 max-w-xl border-b-[3px] border-ink pb-8 font-body text-lg leading-[1.7] text-mute">
          Primary sort: years underway. Filters are craft stamps —
          original engineering, long-term work, open source, small teams.
        </p>
        <div className="mt-10">
          <DiscoverBoard items={items} />
        </div>
      </div>
    </div>
  );
}
