import Link from "next/link";
import { Stamp } from "@/components/ui/Stamp";
import type { Issue } from "@/types";
import { formatDate, formatIssueNumber } from "@/lib/utils";

export function IssueLedger({ issues }: { issues: Issue[] }) {
  return (
    <div className="space-y-2">
      {issues.map((issue, index) => (
        <Link
          key={issue.slug}
          href={`/issues/${issue.slug}`}
          className="group block animate-fade-up rounded-xl border border-line bg-soft/60 p-6 transition-all duration-400 ease-soft hover:-translate-y-0.5 hover:border-[#5a6b45]/30 hover:bg-[#5a6b45]/[0.06] hover:shadow-[0_8px_28px_-12px_rgba(92,74,52,0.22)] focus-ring md:p-7"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-[#5c4a34]">
                  {formatIssueNumber(issue.number)}
                </span>
                <Stamp>{issue.yearsUnderway}y underway</Stamp>
                {issue.status === "draft" && <Stamp>draft</Stamp>}
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.75rem]">
                {issue.builder.name}
                <span className="text-[#5a6b45]"> — </span>
                {issue.product.name}
              </h2>
              <p className="mt-2 max-w-2xl font-body leading-[1.65] text-mute">
                {issue.frame}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-end md:gap-2">
              <time className="font-mono text-[11px] uppercase tracking-[0.12em] text-fog/70">
                {formatDate(issue.publishedAt)}
              </time>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a6b45] translate-x-0 opacity-0 transition-all duration-400 ease-soft group-hover:translate-x-1 group-hover:opacity-100">
                Read →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
