export const siteConfig = {
  name: "Assay",
  tagline: "No launch day. Just the proof.",
  description:
    "A place to discover products built with depth — engineering decisions, stuck periods, lessons learned. See what's real.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  cadence: "One profile. Every Tuesday.",
  nav: [
    { href: "/issues", label: "Issues" },
    { href: "/discover", label: "Discover" },
    { href: "/write", label: "Write" },
    { href: "/signin", label: "Sign in" },
  ],
} as const;

export const craftCriteria = [
  { id: "original-engineering", label: "Original engineering" },
  { id: "beautiful-design", label: "Beautiful design" },
  { id: "technical-innovation", label: "Technical innovation" },
  { id: "long-term", label: "Long-term project" },
  { id: "open-source", label: "Open source" },
  { id: "solo", label: "Solo founder" },
  { id: "small-team", label: "Small team" },
] as const;

export type CraftCriterionId = (typeof craftCriteria)[number]["id"];
