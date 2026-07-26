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
    <section id={id} className="scroll-mt-28 border-t border-line py-12">
      <SectionLabel>{label}</SectionLabel>
      <div className="comfort-text mt-5 space-y-5 font-body text-lg text-ink">
        {children}
      </div>
    </section>
  );
}

export function IssueReader({ issue }: { issue: Issue }) {
  return (
    <article>
      <header className="border-b border-line pb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-[#5c4a34]">
            Issue № {formatIssueNumber(issue.number)}
          </span>
          <Stamp>{issue.yearsUnderway} years underway</Stamp>
          <Stamp>since {issue.startedYear}</Stamp>
          {issue.status === "draft" && <Stamp>draft</Stamp>}
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink md:text-[3.5rem] md:leading-[1.08]">
          {issue.builder.name}
          <span className="text-[#5a6b45]"> — </span>
          {issue.product.name}
        </h1>

        <p className="mt-5 max-w-measure font-body text-xl leading-[1.7] text-mute">
          {issue.frame}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a6b45]">
          <time dateTime={issue.publishedAt}>{formatDate(issue.publishedAt)}</time>
          {issue.product.url && (
            <a href={issue.product.url} className="transition-colors hover:text-[#5c4a34]" target="_blank" rel="noreferrer">
              Product ↗
            </a>
          )}
          {issue.product.repo && (
            <a href={issue.product.repo} className="transition-colors hover:text-[#5c4a34]" target="_blank" rel="noreferrer">
              Repo ↗
            </a>
          )}
          {issue.builder.url && (
            <a href={issue.builder.url} className="transition-colors hover:text-[#5c4a34]" target="_blank" rel="noreferrer">
              Builder ↗
            </a>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {issue.criteria.map((c) => (
            <Stamp key={c}>{c.replace(/-/g, " ")}</Stamp>
          ))}
        </div>
      </header>

      <div className="flex gap-12 pt-4">
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
            <pre className="overflow-x-auto rounded-lg border border-[#2b2d33]/8 bg-soft p-5 font-mono text-sm leading-relaxed text-[#3a3a3a]">
              {issue.architecture.diagram}
            </pre>
            <div className="flex flex-wrap gap-2 pt-2">
              {issue.techStack.map((tech) => (
                <Stamp key={tech}>{tech}</Stamp>
              ))}
            </div>
          </Block>

          <Block id="decision" label="The hardest technical decision">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {issue.hardestDecision.title}
            </h3>
            <p>{issue.hardestDecision.body}</p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {issue.hardestDecision.sides.map((side) => (
                <div key={side.label} className="rounded-lg border border-line bg-soft/50 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#5c4a34]">
                    {side.label}
                  </p>
                  <ul className="mt-3 space-y-2 font-body text-sm text-mute">
                    {side.points.map((point) => (
                      <li key={point}>· {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="font-body text-base text-mute">
              <span className="font-medium text-ink">Chose:</span> {issue.hardestDecision.chose}
              <br />
              <span className="font-medium text-ink">Gave up:</span> {issue.hardestDecision.gaveUp}
            </p>
          </Block>

          <Block id="timeline" label="Timeline">
            <ol className="relative space-y-0 border-l border-line">
              {issue.timeline.map((entry) => (
                <li key={entry.when + entry.what} className="relative py-4 pl-6">
                  <span className="absolute -left-[3px] top-6 h-1.5 w-1.5 rounded-full bg-[#5c4a34]" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5c4a34]">
                    {entry.when}
                  </p>
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
                  <div key={m.label} className="rounded-lg border border-line bg-soft/50 p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog/80">
                      {m.label}
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-ink">{m.value}</dd>
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
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5a6b45]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          {issue.sources && (
            <div className="border-t border-line py-10">
              <SectionLabel>Sources</SectionLabel>
              <ul className="mt-4 space-y-2 font-body text-sm">
                {issue.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      className="text-[#5a6b45] underline decoration-[#5a6b45]/40 underline-offset-4 transition-colors hover:text-[#5c4a34] hover:decoration-[#5c4a34]/40"
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
