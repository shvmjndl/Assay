"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { craftCriteria, type CraftCriterionId } from "@/config/site";
import { SoftButton } from "@/components/ui/SoftButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stamp } from "@/components/ui/Stamp";
import { cn } from "@/lib/utils";

type TimelineRow = { when: string; what: string };
type MetricRow = { label: string; value: string };
type SourceRow = { label: string; url: string };

const fieldClass =
  "w-full rounded-lg border border-[#2b2d33]/12 bg-soft px-4 py-3 font-body text-sm text-ink placeholder:text-mute/50 transition-all duration-300 focus-ring focus:border-[#5a6b45]/40 focus:bg-[#c5c2a4]";

const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#5a6b45]";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {hint && (
        <span className="mt-1.5 block font-body text-xs leading-relaxed text-mute">
          {hint}
        </span>
      )}
    </label>
  );
}

export function WriteForm({
  defaultBuilderName,
}: {
  defaultBuilderName?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [builderName, setBuilderName] = useState(defaultBuilderName ?? "");
  const [builderHandle, setBuilderHandle] = useState("");
  const [builderUrl, setBuilderUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productRepo, setProductRepo] = useState("");
  const [frame, setFrame] = useState("");
  const [yearsUnderway, setYearsUnderway] = useState("1");
  const [startedYear, setStartedYear] = useState(String(new Date().getFullYear() - 1));
  const [criteria, setCriteria] = useState<CraftCriterionId[]>([]);
  const [techStack, setTechStack] = useState("");
  const [problem, setProblem] = useState("");
  const [whyExistingFellShort, setWhyExistingFellShort] = useState("");
  const [architectureSummary, setArchitectureSummary] = useState("");
  const [architectureDiagram, setArchitectureDiagram] = useState("");
  const [decisionTitle, setDecisionTitle] = useState("");
  const [decisionBody, setDecisionBody] = useState("");
  const [decisionChose, setDecisionChose] = useState("");
  const [decisionGaveUp, setDecisionGaveUp] = useState("");
  const [sideALabel, setSideALabel] = useState("");
  const [sideAPoints, setSideAPoints] = useState("");
  const [sideBLabel, setSideBLabel] = useState("");
  const [sideBPoints, setSideBPoints] = useState("");
  const [timeline, setTimeline] = useState<TimelineRow[]>([
    { when: "", what: "" },
    { when: "", what: "" },
  ]);
  const [doDifferently, setDoDifferently] = useState("");
  const [metrics, setMetrics] = useState<MetricRow[]>([{ label: "", value: "" }]);
  const [roadmap, setRoadmap] = useState("");
  const [sources, setSources] = useState<SourceRow[]>([{ label: "", url: "" }]);

  function toggleCriterion(id: CraftCriterionId) {
    setCriteria((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function onPublish(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const payload = {
      builderName,
      builderHandle,
      builderUrl,
      productName,
      productUrl,
      productRepo,
      frame,
      yearsUnderway: Number(yearsUnderway),
      startedYear: Number(startedYear),
      criteria,
      techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean),
      problem,
      whyExistingFellShort,
      architectureSummary,
      architectureDiagram,
      decisionTitle,
      decisionBody,
      decisionChose,
      decisionGaveUp,
      sideALabel,
      sideAPoints: sideAPoints.split("\n").map((p) => p.trim()).filter(Boolean),
      sideBLabel,
      sideBPoints: sideBPoints.split("\n").map((p) => p.trim()).filter(Boolean),
      timeline,
      doDifferently,
      metrics,
      roadmap: roadmap.split("\n").map((r) => r.trim()).filter(Boolean),
      sources,
    };

    try {
      const res = await fetch("/api/issues/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { issue?: { slug: string }; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Publish failed.");
      }
      router.push(`/issues/${data.issue!.slug}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onPublish} className="space-y-14">
      {/* Header */}
      <section className="space-y-6">
        <div>
          <SectionLabel>Header</SectionLabel>
          <p className="mt-2 max-w-xl font-body text-sm text-mute">
            Builder — product, links, and a one-line frame. Not a pitch.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Builder name">
            <input
              className={fieldClass}
              value={builderName}
              onChange={(e) => setBuilderName(e.target.value)}
              required
            />
          </Field>
          <Field label="Product name">
            <input
              className={fieldClass}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Field>
          <Field label="Builder handle" hint="Optional — @handle">
            <input
              className={fieldClass}
              value={builderHandle}
              onChange={(e) => setBuilderHandle(e.target.value)}
            />
          </Field>
          <Field label="Builder URL" hint="Optional">
            <input
              className={fieldClass}
              value={builderUrl}
              onChange={(e) => setBuilderUrl(e.target.value)}
              type="url"
              placeholder="https://"
            />
          </Field>
          <Field label="Product URL" hint="Optional">
            <input
              className={fieldClass}
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              type="url"
              placeholder="https://"
            />
          </Field>
          <Field label="Repo URL" hint="Optional">
            <input
              className={fieldClass}
              value={productRepo}
              onChange={(e) => setProductRepo(e.target.value)}
              type="url"
              placeholder="https://github.com/…"
            />
          </Field>
        </div>
        <Field
          label="One-line frame"
          hint="What this is, in plain language — and how long it’s been underway."
        >
          <textarea
            className={cn(fieldClass, "min-h-[5.5rem] resize-y")}
            value={frame}
            onChange={(e) => setFrame(e.target.value)}
            required
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Years underway">
            <input
              className={fieldClass}
              type="number"
              min={0}
              step={1}
              value={yearsUnderway}
              onChange={(e) => setYearsUnderway(e.target.value)}
              required
            />
          </Field>
          <Field label="Started year">
            <input
              className={fieldClass}
              type="number"
              min={1970}
              max={2100}
              value={startedYear}
              onChange={(e) => setStartedYear(e.target.value)}
              required
            />
          </Field>
        </div>
        <div>
          <p className={labelClass}>Craft stamps</p>
          <div className="flex flex-wrap gap-2">
            {craftCriteria.map((c) => (
              <Stamp
                key={c.id}
                as="button"
                active={criteria.includes(c.id)}
                onClick={() => toggleCriterion(c.id)}
              >
                {c.label}
              </Stamp>
            ))}
          </div>
        </div>
        <Field
          label="Tech stack"
          hint="Comma-separated — roles, not a logo salad."
        >
          <input
            className={fieldClass}
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Zig, Swift, AppKit…"
            required
          />
        </Field>
      </section>

      {/* Problem */}
      <section className="space-y-4 border-t border-line pt-12">
        <SectionLabel>The problem</SectionLabel>
        <Field
          label="What hurt before this existed"
          hint="2–3 sentences. Plain language. No jargon."
        >
          <textarea
            className={cn(fieldClass, "min-h-[8rem] resize-y")}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </Field>
      </section>

      {/* Fell short */}
      <section className="space-y-4 border-t border-line pt-12">
        <SectionLabel>Why existing solutions fell short</SectionLabel>
        <Field
          label="Where the wall was"
          hint="Technically, operationally, or philosophically. Name it."
        >
          <textarea
            className={cn(fieldClass, "min-h-[8rem] resize-y")}
            value={whyExistingFellShort}
            onChange={(e) => setWhyExistingFellShort(e.target.value)}
            required
          />
        </Field>
      </section>

      {/* Architecture */}
      <section className="space-y-5 border-t border-line pt-12">
        <SectionLabel>Architecture</SectionLabel>
        <Field label="Summary" hint="How data/control flows. Where the hard boundary is.">
          <textarea
            className={cn(fieldClass, "min-h-[6rem] resize-y")}
            value={architectureSummary}
            onChange={(e) => setArchitectureSummary(e.target.value)}
            required
          />
        </Field>
        <Field label="Diagram" hint="ASCII or stack breakdown with roles.">
          <textarea
            className={cn(fieldClass, "min-h-[10rem] resize-y font-mono text-[13px]")}
            value={architectureDiagram}
            onChange={(e) => setArchitectureDiagram(e.target.value)}
            required
            placeholder={`Client
  │
  ▼
Core service
  │
  ▼
Store`}
          />
        </Field>
      </section>

      {/* Hardest decision */}
      <section className="space-y-5 border-t border-line pt-12">
        <SectionLabel>The hardest technical decision</SectionLabel>
        <Field label="Decision title">
          <input
            className={fieldClass}
            value={decisionTitle}
            onChange={(e) => setDecisionTitle(e.target.value)}
            required
            placeholder="e.g. Hypermedia over the JSON-SPA model"
          />
        </Field>
        <Field label="Explain the tradeoff">
          <textarea
            className={cn(fieldClass, "min-h-[7rem] resize-y")}
            value={decisionBody}
            onChange={(e) => setDecisionBody(e.target.value)}
            required
          />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-line bg-soft/40 p-5">
            <Field label="Side A — label">
              <input
                className={fieldClass}
                value={sideALabel}
                onChange={(e) => setSideALabel(e.target.value)}
                required
              />
            </Field>
            <Field label="Side A — points" hint="One point per line">
              <textarea
                className={cn(fieldClass, "min-h-[7rem] resize-y")}
                value={sideAPoints}
                onChange={(e) => setSideAPoints(e.target.value)}
                required
              />
            </Field>
          </div>
          <div className="space-y-4 rounded-xl border border-line bg-soft/40 p-5">
            <Field label="Side B — label">
              <input
                className={fieldClass}
                value={sideBLabel}
                onChange={(e) => setSideBLabel(e.target.value)}
                required
              />
            </Field>
            <Field label="Side B — points" hint="One point per line">
              <textarea
                className={cn(fieldClass, "min-h-[7rem] resize-y")}
                value={sideBPoints}
                onChange={(e) => setSideBPoints(e.target.value)}
                required
              />
            </Field>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Chose">
            <input
              className={fieldClass}
              value={decisionChose}
              onChange={(e) => setDecisionChose(e.target.value)}
              required
            />
          </Field>
          <Field label="Gave up">
            <input
              className={fieldClass}
              value={decisionGaveUp}
              onChange={(e) => setDecisionGaveUp(e.target.value)}
              required
            />
          </Field>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-5 border-t border-line pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Timeline</SectionLabel>
            <p className="mt-2 font-body text-sm text-mute">
              Actual dates. Include boring and stuck periods.
            </p>
          </div>
          <SoftButton
            type="button"
            variant="ghost"
            onClick={() => setTimeline((rows) => [...rows, { when: "", what: "" }])}
          >
            Add entry
          </SoftButton>
        </div>
        <div className="space-y-3">
          {timeline.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[10rem_1fr_auto]">
              <input
                className={fieldClass}
                placeholder="When"
                value={row.when}
                onChange={(e) =>
                  setTimeline((rows) =>
                    rows.map((r, i) =>
                      i === index ? { ...r, when: e.target.value } : r,
                    ),
                  )
                }
              />
              <input
                className={fieldClass}
                placeholder="What actually happened"
                value={row.what}
                onChange={(e) =>
                  setTimeline((rows) =>
                    rows.map((r, i) =>
                      i === index ? { ...r, what: e.target.value } : r,
                    ),
                  )
                }
              />
              <button
                type="button"
                className="rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-mute transition-colors hover:text-ink"
                onClick={() =>
                  setTimeline((rows) =>
                    rows.length > 2 ? rows.filter((_, i) => i !== index) : rows,
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Differently */}
      <section className="space-y-4 border-t border-line pt-12">
        <SectionLabel>What you’d do differently</SectionLabel>
        <Field
          label="At least one concrete regret or revision"
          hint="If everything was perfect, the profile isn’t ready."
        >
          <textarea
            className={cn(fieldClass, "min-h-[7rem] resize-y")}
            value={doDifferently}
            onChange={(e) => setDoDifferently(e.target.value)}
            required
          />
        </Field>
      </section>

      {/* Metrics */}
      <section className="space-y-5 border-t border-line pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Current metrics</SectionLabel>
            <p className="mt-2 font-body text-sm text-mute">
              Optional. Prefer durability over vanity.
            </p>
          </div>
          <SoftButton
            type="button"
            variant="ghost"
            onClick={() => setMetrics((rows) => [...rows, { label: "", value: "" }])}
          >
            Add metric
          </SoftButton>
        </div>
        <div className="space-y-3">
          {metrics.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <input
                className={fieldClass}
                placeholder="Label"
                value={row.label}
                onChange={(e) =>
                  setMetrics((rows) =>
                    rows.map((r, i) =>
                      i === index ? { ...r, label: e.target.value } : r,
                    ),
                  )
                }
              />
              <input
                className={fieldClass}
                placeholder="Value"
                value={row.value}
                onChange={(e) =>
                  setMetrics((rows) =>
                    rows.map((r, i) =>
                      i === index ? { ...r, value: e.target.value } : r,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-4 border-t border-line pt-12">
        <SectionLabel>Open roadmap</SectionLabel>
        <Field
          label="What’s next, publicly"
          hint="One item per line. Enough to check back in six months."
        >
          <textarea
            className={cn(fieldClass, "min-h-[7rem] resize-y")}
            value={roadmap}
            onChange={(e) => setRoadmap(e.target.value)}
            required
          />
        </Field>
      </section>

      {/* Sources */}
      <section className="space-y-5 border-t border-line pt-12">
        <div>
          <SectionLabel>Sources / follow</SectionLabel>
          <p className="mt-2 font-body text-sm text-mute">
            Optional — essays, releases, how to follow the builder.
          </p>
        </div>
        {sources.map((row, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-2">
            <input
              className={fieldClass}
              placeholder="Label"
              value={row.label}
              onChange={(e) =>
                setSources((rows) =>
                  rows.map((r, i) =>
                    i === index ? { ...r, label: e.target.value } : r,
                  ),
                )
              }
            />
            <input
              className={fieldClass}
              placeholder="https://"
              type="url"
              value={row.url}
              onChange={(e) =>
                setSources((rows) =>
                  rows.map((r, i) =>
                    i === index ? { ...r, url: e.target.value } : r,
                  ),
                )
              }
            />
          </div>
        ))}
        <SoftButton
          type="button"
          variant="ghost"
          onClick={() => setSources((rows) => [...rows, { label: "", url: "" }])}
        >
          Add source
        </SoftButton>
      </section>

      <div className="border-t border-line pt-10">
        {error && (
          <p className="mb-5 rounded-lg border border-[#5c4a34]/30 bg-[#5c4a34]/10 px-4 py-3 font-body text-sm text-[#5c4a34]">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <SoftButton type="submit" variant="ink" disabled={busy}>
            {busy ? "Publishing…" : "Publish to Assay"}
          </SoftButton>
          <p className="max-w-sm font-body text-sm text-mute">
            Incomplete honesty doesn’t ship. Fill the template — then it goes
            live on Issues and Discover.
          </p>
        </div>
      </div>
    </form>
  );
}
