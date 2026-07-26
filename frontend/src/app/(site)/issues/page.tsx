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
      <div className="mx-auto max-w-[64rem] px-6 py-20 pl-8 md:px-10 md:pl-14 md:py-28">
        <SectionLabel>The log</SectionLabel>
        <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl">
          Issues
        </h1>
        <p className="mt-5 max-w-lg font-body text-lg leading-[1.7] text-mute">
          One profile at a time. Architecture, stuck periods, the hardest call —
          not a launch feed that vanishes overnight.
        </p>
        <div className="mt-14">
          <IssueLedger issues={issues} />
        </div>
      </div>
    </div>
  );
}
