"use client";

import { useEffect, useState } from "react";
import { issueSections } from "@/data/issues";
import type { IssueSectionId } from "@/types";
import { cn } from "@/lib/utils";

export function SectionSpine() {
  const [active, setActive] = useState<IssueSectionId>(issueSections[0].id);

  useEffect(() => {
    const nodes = issueSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as (typeof issueSections)[number]["id"]);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Issue sections"
      className="sticky top-8 hidden max-h-[70vh] w-36 shrink-0 overflow-auto lg:block"
    >
      <p className="kicker mb-3">In this issue</p>
      <ol className="relative space-y-0 border-l border-[var(--rule)] pl-3">
        {issueSections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "block py-1.5 font-sans text-[0.75rem] font-medium transition-colors duration-200",
                  isActive ? "text-mark" : "text-mute hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "absolute -left-[3.5px] mt-2 h-1.5 w-1.5 rounded-full transition-colors duration-200",
                    isActive ? "bg-mark" : "bg-ink/20",
                  )}
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
