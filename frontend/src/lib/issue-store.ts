import { promises as fs } from "fs";
import path from "path";
import { seedIssues } from "@/data/issues";
import type { CraftCriterionId } from "@/config/site";
import type { DiscoverItem, Issue, TimelineEntry } from "@/types";

const COMMUNITY_PATH = path.join(process.cwd(), "data", "community-issues.json");

export type PublishPayload = {
  builderName: string;
  builderHandle?: string;
  builderUrl?: string;
  productName: string;
  productUrl?: string;
  productRepo?: string;
  frame: string;
  yearsUnderway: number;
  startedYear: number;
  criteria: CraftCriterionId[];
  techStack: string[];
  problem: string;
  whyExistingFellShort: string;
  architectureSummary: string;
  architectureDiagram: string;
  decisionTitle: string;
  decisionBody: string;
  decisionChose: string;
  decisionGaveUp: string;
  sideALabel: string;
  sideAPoints: string[];
  sideBLabel: string;
  sideBPoints: string[];
  timeline: TimelineEntry[];
  doDifferently: string;
  metrics: { label: string; value: string }[];
  roadmap: string[];
  sources: { label: string; url: string }[];
};

async function readCommunityIssues(): Promise<Issue[]> {
  try {
    const raw = await fs.readFile(COMMUNITY_PATH, "utf8");
    const trimmed = raw.trim();
    if (!trimmed) return [];
    const parsed = JSON.parse(trimmed) as Issue[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeCommunityIssues(issues: Issue[]) {
  await fs.mkdir(path.dirname(COMMUNITY_PATH), { recursive: true });
  await fs.writeFile(
    COMMUNITY_PATH,
    `${JSON.stringify(issues, null, 2)}\n`,
    "utf8",
  );
}

export async function getAllIssues(): Promise<Issue[]> {
  const community = await readCommunityIssues();
  return [...seedIssues, ...community].sort((a, b) => b.number - a.number);
}

export async function getIssue(slug: string): Promise<Issue | undefined> {
  const all = await getAllIssues();
  return all.find((issue) => issue.slug === slug);
}

export async function getDiscoverItems(): Promise<DiscoverItem[]> {
  const all = await getAllIssues();
  return all
    .map((issue) => ({
      slug: issue.slug,
      builderName: issue.builder.name,
      productName: issue.product.name,
      yearsUnderway: issue.yearsUnderway,
      hardestDecisionTitle: issue.hardestDecision.title,
      criteria: issue.criteria,
      techStack: issue.techStack,
      frame: issue.frame,
    }))
    .sort((a, b) => b.yearsUnderway - a.yearsUnderway);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function requireText(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} is required.`);
  return trimmed;
}

export async function publishIssue(
  payload: PublishPayload,
  author?: { id?: string; email?: string | null; name?: string | null },
): Promise<Issue> {
  const builderName = requireText(payload.builderName, "Builder name");
  const productName = requireText(payload.productName, "Product name");
  const frame = requireText(payload.frame, "One-line frame");
  const problem = requireText(payload.problem, "The problem");
  const whyExistingFellShort = requireText(
    payload.whyExistingFellShort,
    "Why existing solutions fell short",
  );
  const architectureSummary = requireText(
    payload.architectureSummary,
    "Architecture summary",
  );
  const architectureDiagram = requireText(
    payload.architectureDiagram,
    "Architecture diagram",
  );
  const decisionTitle = requireText(
    payload.decisionTitle,
    "Hardest decision title",
  );
  const decisionBody = requireText(payload.decisionBody, "Hardest decision body");
  const decisionChose = requireText(payload.decisionChose, "What you chose");
  const decisionGaveUp = requireText(payload.decisionGaveUp, "What you gave up");
  const sideALabel = requireText(payload.sideALabel, "Tradeoff side A label");
  const sideBLabel = requireText(payload.sideBLabel, "Tradeoff side B label");
  const doDifferently = requireText(
    payload.doDifferently,
    "What you’d do differently",
  );

  const sideAPoints = payload.sideAPoints.map((p) => p.trim()).filter(Boolean);
  const sideBPoints = payload.sideBPoints.map((p) => p.trim()).filter(Boolean);
  if (sideAPoints.length < 1 || sideBPoints.length < 1) {
    throw new Error("Each tradeoff side needs at least one point.");
  }

  const timeline = payload.timeline
    .map((row) => ({ when: row.when.trim(), what: row.what.trim() }))
    .filter((row) => row.when && row.what);
  if (timeline.length < 2) {
    throw new Error("Timeline needs at least two dated entries (include stuck periods).");
  }

  const roadmap = payload.roadmap.map((item) => item.trim()).filter(Boolean);
  if (roadmap.length < 1) {
    throw new Error("Open roadmap needs at least one item.");
  }

  if (!Number.isFinite(payload.yearsUnderway) || payload.yearsUnderway < 0) {
    throw new Error("Years underway must be a non-negative number.");
  }
  if (!Number.isFinite(payload.startedYear) || payload.startedYear < 1970) {
    throw new Error("Started year looks invalid.");
  }

  const techStack = payload.techStack.map((t) => t.trim()).filter(Boolean);
  if (techStack.length < 1) {
    throw new Error("Add at least one tech stack item.");
  }

  const all = await getAllIssues();
  const nextNumber = Math.max(0, ...all.map((i) => i.number)) + 1;

  let slug = slugify(`${builderName}-${productName}`);
  if (!slug) slug = `issue-${nextNumber}`;
  if (all.some((i) => i.slug === slug)) {
    slug = `${slug}-${nextNumber}`;
  }

  const issue: Issue = {
    slug,
    number: nextNumber,
    publishedAt: new Date().toISOString().slice(0, 10),
    status: "published",
    builder: {
      name: builderName,
      handle: payload.builderHandle?.trim() || undefined,
      url: payload.builderUrl?.trim() || undefined,
    },
    product: {
      name: productName,
      url: payload.productUrl?.trim() || undefined,
      repo: payload.productRepo?.trim() || undefined,
    },
    frame,
    yearsUnderway: Math.round(payload.yearsUnderway),
    startedYear: Math.round(payload.startedYear),
    criteria: payload.criteria,
    techStack,
    problem,
    whyExistingFellShort,
    architecture: {
      summary: architectureSummary,
      diagram: architectureDiagram,
    },
    hardestDecision: {
      title: decisionTitle,
      body: decisionBody,
      chose: decisionChose,
      gaveUp: decisionGaveUp,
      sides: [
        { label: sideALabel, points: sideAPoints },
        { label: sideBLabel, points: sideBPoints },
      ],
    },
    timeline,
    doDifferently,
    metrics: payload.metrics
      .map((m) => ({ label: m.label.trim(), value: m.value.trim() }))
      .filter((m) => m.label && m.value),
    roadmap,
    sources: payload.sources
      .map((s) => ({ label: s.label.trim(), url: s.url.trim() }))
      .filter((s) => s.label && s.url),
  };

  // Attach author for local auditing (not shown in reader yet)
  void author;

  const community = await readCommunityIssues();
  community.push(issue);
  await writeCommunityIssues(community);

  return issue;
}
