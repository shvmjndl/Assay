import { SectionLabel } from "@/components/ui/SectionLabel";
import { IssueLedger } from "@/features/issues/IssueLedger";
import { getAllIssues } from "@/lib/issue-store";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issues",
  description: "The Assay log — weekly profiles with a paper trail.",
};

export default async function IssuesPage() {
  const issues = await getAllIssues();

  return (
    <div className="paper-field">
      <div className="mx-auto max-w-[76rem] px-4 py-9 md:px-7 md:py-11">
        <SectionLabel>The log</SectionLabel>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink md:text-[3.25rem]">
          Issues
        </h1>
        <p className="deck mt-3 max-w-xl border-b-[3px] border-ink pb-6">
          One profile at a time. Architecture, stuck periods, the hardest call —
          not a launch feed that vanishes overnight.
        </p>
        <div className="mt-2">
          <IssueLedger issues={issues} />
        </div>
      </div>
    </div>
  );
}
