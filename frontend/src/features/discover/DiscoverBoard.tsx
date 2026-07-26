"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { craftCriteria, type CraftCriterionId } from "@/config/site";
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
    <div className="space-y-10">
      <div className="space-y-5">
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
        <label className="block max-w-sm">
          <span className="sr-only">Search builders and products</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builders, stacks, decisions…"
            className="w-full rounded-lg border border-[#2b2d33]/12 bg-soft px-4 py-3 font-sans text-sm text-ink placeholder:text-fog/70 transition-all duration-300 focus-ring focus:border-[#5a6b45]/40 focus:bg-[#c5c2a4]"
          />
        </label>
      </div>

      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fog/70">
        {filtered.length} in view
      </p>

      <ul className="space-y-2">
        {filtered.map((item, index) => {
          const width = Math.max(12, (item.yearsUnderway / maxYears) * 100);
          return (
            <li
              key={item.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link
                href={`/issues/${item.slug}`}
                className="group block rounded-xl border border-line bg-soft/60 p-6 transition-all duration-400 ease-soft hover:-translate-y-0.5 hover:border-[#5a6b45]/30 hover:bg-[#5a6b45]/[0.06] hover:shadow-[0_8px_28px_-12px_rgba(92,74,52,0.22)] focus-ring"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0 md:max-w-xl">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                      {item.builderName}
                      <span className="text-[#5a6b45]"> — </span>
                      {item.productName}
                    </h2>
                    <p className="mt-2 font-body leading-[1.65] text-mute">
                      {item.frame}
                    </p>
                  </div>

                  <div className="w-full shrink-0 md:w-44">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fog/70">
                        Underway
                      </span>
                      <span className="font-display text-2xl font-semibold text-[#5c4a34]">
                        {item.yearsUnderway}
                        <span className="text-sm font-normal text-mute">y</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#2b2d33]/[0.06]">
                      <div
                        className="h-full rounded-full bg-[#5a6b45]/60 transition-all duration-700"
                        style={{ width: `${width}%` }}
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
        <p className="rounded-xl border border-dashed border-line px-6 py-14 text-center font-body text-mute">
          Nothing matches — loosen a filter.
        </p>
      )}
    </div>
  );
}
