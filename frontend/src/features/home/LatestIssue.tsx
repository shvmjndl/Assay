import Link from "next/link";
import { getAllIssues } from "@/lib/issue-store";
import { formatDate, formatIssueNumber } from "@/lib/utils";

export async function LatestIssue() {
  const issues = await getAllIssues();
  const issue = issues[0];
  if (!issue) return null;

  return (
    <section>
      <div className="mx-auto max-w-[72rem] px-5 py-10 md:px-7 md:py-12">
        <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2">
          <p className="kicker">Lead story</p>
          <Link
            href="/issues"
            className="ink-link font-sans text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-mark"
          >
            All issues →
          </Link>
        </div>

        <Link
          href={`/issues/${issue.slug}`}
          className="group mt-7 grid gap-6 focus-ring md:grid-cols-[1.4fr_0.85fr] md:gap-10"
        >
          <div>
            <p className="byline">
              Issue № {formatIssueNumber(issue.number)} ·{" "}
              {formatDate(issue.publishedAt)} · {issue.yearsUnderway} years
              underway
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.06] tracking-[-0.02em] text-ink transition-colors duration-150 group-hover:text-mark">
              {issue.builder.name} — {issue.product.name}
            </h3>
            <p className="read-cue mt-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-mark">
              Continue reading →
            </p>
          </div>
          <p className="border-t border-[var(--rule)] pt-4 font-body text-[1.02rem] leading-[1.7] text-mute md:border-l md:border-t-0 md:pl-8 md:pt-0">
            {issue.frame}
          </p>
        </Link>
      </div>
    </section>
  );
}
