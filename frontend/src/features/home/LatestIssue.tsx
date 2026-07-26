import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stamp } from "@/components/ui/Stamp";
import { getAllIssues } from "@/lib/issue-store";
import { formatIssueNumber } from "@/lib/utils";

export async function LatestIssue() {
  const issues = await getAllIssues();
  const issue = issues[0];
  if (!issue) return null;

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[64rem] px-6 py-24 pl-8 md:px-10 md:pl-14 md:py-32">
        <Reveal>
          <SectionLabel>Latest in the log</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <Link
            href={`/issues/${issue.slug}`}
            className="group mt-10 block rounded-xl border border-line bg-soft/60 p-7 transition-all duration-400 hover:border-[#7e98aa]/35 hover:bg-[#e4b6be]/[0.12] hover:shadow-[0_8px_40px_-12px_rgba(126,152,170,0.22)] focus-ring md:p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-[#5f7050]">
                    № {formatIssueNumber(issue.number)}
                  </span>
                  <Stamp>{issue.yearsUnderway} yrs underway</Stamp>
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-[2.75rem] md:leading-[1.05]">
                  {issue.builder.name}
                  <span className="text-[#e4b6be]"> — </span>
                  {issue.product.name}
                </h3>
                <p className="mt-4 font-body text-lg leading-[1.7] text-mute">
                  {issue.frame}
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7e98aa] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                Read →
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
