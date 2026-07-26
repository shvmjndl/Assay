import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stamp } from "@/components/ui/Stamp";
import { SectionSpine } from "@/features/issues/SectionSpine";
import type { Issue } from "@/types";
import { formatDate, formatIssueNumber } from "@/lib/utils";

function Block({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[var(--rule)] py-10">
      <SectionLabel>{label}</SectionLabel>
      <div className="comfort-text mt-4 space-y-5 font-body text-lg text-ink">
        {children}
      </div>
    </section>
  );
}

export function IssueReader({ issue }: { issue: Issue }) {
  return (
    <article>
      <header className="border-b-[3px] border-ink pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="byline text-mark">
            Issue № {formatIssueNumber(issue.number)}
          </span>
          <Stamp>{issue.yearsUnderway} years underway</Stamp>
          <Stamp>since {issue.startedYear}</Stamp>
          {issue.status === "draft" && <Stamp>draft</Stamp>}
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-[3.25rem] md:leading-[1.08]">
          {issue.builder.name} — {issue.product.name}
        </h1>

        <p className="mt-5 max-w-measure font-body text-xl leading-[1.7] text-mute">
          {issue.frame}
        </p>

        <div className="mt-7 flex flex-wrap gap-4 byline text-mark">
          <time dateTime={issue.publishedAt}>{formatDate(issue.publishedAt)}</time>
          {issue.product.url && (
            <a
              href={issue.product.url}
              className="ink-link transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              Product ↗
            </a>
          )}
          {issue.product.repo && (
            <a
              href={issue.product.repo}
              className="ink-link transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              Repo ↗
            </a>
          )}
          {issue.builder.url && (
            <a
              href={issue.builder.url}
              className="ink-link transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              Builder ↗
            </a>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {issue.criteria.map((c) => (
            <Stamp key={c}>{c.replace(/-/g, " ")}</Stamp>
          ))}
        </div>
      </header>

      <div className="flex gap-12 pt-2">
        <SectionSpine />

        <div className="min-w-0 max-w-measure flex-1">
          <Block id="problem" label="The problem">
            <p>{issue.problem}</p>
          </Block>

          <Block id="fell-short" label="Why existing solutions fell short">
            <p>{issue.whyExistingFellShort}</p>
          </Block>

          <Block id="architecture" label="Architecture">
            <p>{issue.architecture.summary}</p>
            <pre className="overflow-x-auto border border-[var(--rule)] bg-soft p-5 font-mono text-sm leading-relaxed text-mute">
              {issue.architecture.diagram}
            </pre>
            <div className="flex flex-wrap gap-2 pt-2">
              {issue.techStack.map((tech) => (
                <Stamp key={tech}>{tech}</Stamp>
              ))}
            </div>
          </Block>

          <Block id="decision" label="The hardest technical decision">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              {issue.hardestDecision.title}
            </h3>
            <p>{issue.hardestDecision.body}</p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {issue.hardestDecision.sides.map((side) => (
                <div key={side.label} className="border border-[var(--rule)] bg-soft/60 p-5">
                  <p className="byline text-mark">{side.label}</p>
                  <ul className="mt-3 space-y-2 font-body text-sm text-mute">
                    {side.points.map((point) => (
                      <li key={point}>· {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="font-body text-base text-mute">
              <span className="font-semibold text-ink">Chose:</span> {issue.hardestDecision.chose}
              <br />
              <span className="font-semibold text-ink">Gave up:</span> {issue.hardestDecision.gaveUp}
            </p>
          </Block>

          <Block id="timeline" label="Timeline">
            <ol className="relative space-y-0 border-l border-[var(--rule)]">
              {issue.timeline.map((entry) => (
                <li key={entry.when + entry.what} className="relative py-4 pl-6">
                  <span className="absolute -left-[3.5px] top-6 h-1.5 w-1.5 rounded-full bg-ink" />
                  <p className="byline text-mark">{entry.when}</p>
                  <p className="mt-1.5 font-body text-base text-ink">{entry.what}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="differently" label="What they'd do differently">
            <p>{issue.doDifferently}</p>
          </Block>

          <Block id="metrics" label="Current metrics">
            {issue.metrics?.length ? (
              <dl className="grid gap-3 sm:grid-cols-3">
                {issue.metrics.map((m) => (
                  <div key={m.label} className="border border-[var(--rule)] bg-soft/60 p-5">
                    <dt className="byline">{m.label}</dt>
                    <dd className="mt-2 font-display text-2xl font-bold text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-mute">Builder opted out of metrics theater.</p>
            )}
          </Block>

          <Block id="roadmap" label="Open roadmap">
            <ul className="space-y-3">
              {issue.roadmap.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-mark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          {issue.sources && (
            <div className="border-t border-[var(--rule)] py-10">
              <SectionLabel>Sources</SectionLabel>
              <ul className="mt-4 space-y-2 font-body text-sm">
                {issue.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      className="text-mark underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:text-ink"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
