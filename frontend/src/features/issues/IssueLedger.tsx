import Link from "next/link";
import { Stamp } from "@/components/ui/Stamp";
import type { Issue } from "@/types";
import { formatDate, formatIssueNumber } from "@/lib/utils";

export function IssueLedger({ issues }: { issues: Issue[] }) {
  return (
    <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
      {issues.map((issue) => (
        <Link
          key={issue.slug}
          href={`/issues/${issue.slug}`}
          className="paper-row group block py-6 focus-ring md:py-7"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="byline text-mark">
                  № {formatIssueNumber(issue.number)}
                </span>
                <Stamp>{issue.yearsUnderway}y underway</Stamp>
                {issue.status === "draft" && <Stamp>draft</Stamp>}
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-150 group-hover:text-mark md:text-[1.85rem]">
                {issue.builder.name} — {issue.product.name}
              </h2>
              <p className="mt-2 max-w-2xl font-body leading-[1.7] text-mute">
                {issue.frame}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-end md:gap-2">
              <time className="byline">{formatDate(issue.publishedAt)}</time>
              <span className="read-cue font-sans text-[0.7rem] font-bold uppercase tracking-[0.1em] text-mark">
                Read →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
