import type { CraftCriterionId } from "@/config/site";

export type TimelineEntry = {
  when: string;
  what: string;
};

export type TradeoffSide = {
  label: string;
  points: string[];
};

export type IssueSectionId =
  | "problem"
  | "fell-short"
  | "architecture"
  | "decision"
  | "timeline"
  | "differently"
  | "metrics"
  | "roadmap";

export type Issue = {
  slug: string;
  number: number;
  publishedAt: string;
  status: "draft" | "published";
  builder: {
    name: string;
    handle?: string;
    url?: string;
  };
  product: {
    name: string;
    url?: string;
    repo?: string;
  };
  frame: string;
  yearsUnderway: number;
  startedYear: number;
  criteria: CraftCriterionId[];
  techStack: string[];
  problem: string;
  whyExistingFellShort: string;
  architecture: {
    summary: string;
    diagram: string;
  };
  hardestDecision: {
    title: string;
    body: string;
    chose: string;
    gaveUp: string;
    sides: [TradeoffSide, TradeoffSide];
  };
  timeline: TimelineEntry[];
  doDifferently: string;
  metrics?: { label: string; value: string }[];
  roadmap: string[];
  sources?: { label: string; url: string }[];
};

export type DiscoverItem = {
  slug: string;
  builderName: string;
  productName: string;
  yearsUnderway: number;
  hardestDecisionTitle: string;
  criteria: CraftCriterionId[];
  techStack: string[];
  frame: string;
};
