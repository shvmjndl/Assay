"use client";

import { useMemo, useState } from "react";
import { craftCriteria, type CraftCriterionId } from "@/config/site";
import Link from "next/link";
import { Stamp } from "@/components/ui/Stamp";
import type { DiscoverItem } from "@/types";

export function DiscoverBoard({ items }: { items: DiscoverItem[] }) {
  const [active, setActive] = useState<CraftCriterionId[]>([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCriteria =
        active.length === 0 ||
        active.every((criterion) => item.criteria.includes(criterion));
      const haystack =
        `${item.builderName} ${item.productName} ${item.frame} ${item.techStack.join(" ")}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      return matchesCriteria && matchesQuery;
    });
  }, [active, items, query]);

  const maxYears = Math.max(...items.map((i) => i.yearsUnderway), 1);

  function toggle(id: CraftCriterionId) {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {craftCriteria.map((criterion) => (
            <Stamp
              key={criterion.id}
              as="button"
              active={active.includes(criterion.id)}
              onClick={() => toggle(criterion.id)}
            >
              {criterion.label}
            </Stamp>
          ))}
        </div>
        <label className="block max-w-md">
          <span className="sr-only">Search builders and products</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builders, stacks, decisions…"
            className="w-full border border-[var(--rule)] bg-[rgba(255,250,240,0.4)] px-4 py-3 font-body text-sm text-ink shadow-press placeholder:text-fog transition-colors focus-ring focus:border-ink focus:bg-[rgba(255,252,245,0.65)]"
          />
        </label>
      </div>

      <p className="byline">{filtered.length} in view</p>

      <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {filtered.map((item, index) => {
          const width = Math.max(12, (item.yearsUnderway / maxYears) * 100);
          return (
            <li
              key={item.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                href={`/issues/${item.slug}`}
                className="paper-row group block py-6 focus-ring md:py-7"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0 md:max-w-xl">
                    <h2 className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-mark md:text-2xl">
                      {item.builderName} — {item.productName}
                    </h2>
                    <p className="mt-2 font-body leading-[1.65] text-mute">
                      {item.frame}
                    </p>
                  </div>

                  <div className="w-full shrink-0 md:w-40">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="byline">Underway</span>
                      <span className="font-display text-2xl font-bold text-ink">
                        {item.yearsUnderway}
                        <span className="text-sm font-normal text-mute">y</span>
                      </span>
                    </div>
                    <div className="mt-2 h-0.5 overflow-hidden bg-ink/10">
                      <div
                        className="h-full origin-left bg-mark transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ transform: `scaleX(${width / 100})` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="border border-dashed border-[var(--rule)] px-6 py-14 text-center font-body text-mute">
          Nothing matches — loosen a filter.
        </p>
      )}
    </div>
  );
}
