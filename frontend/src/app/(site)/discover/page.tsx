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
      <div className="mx-auto max-w-[64rem] px-6 py-20 pl-8 md:px-10 md:pl-14 md:py-28">
        <SectionLabel>Survey</SectionLabel>
        <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl">
          Discover
        </h1>
        <p className="mt-5 max-w-lg font-body text-lg leading-[1.7] text-mute">
          Primary sort: years underway. Filters are craft stamps —
          original engineering, long-term work, open source, small teams.
        </p>
        <div className="mt-14">
          <DiscoverBoard items={items} />
        </div>
      </div>
    </div>
  );
}
