# Eventual profile schema

Sketch only — implement after inbound demand + content backlog. Keep v1 weekend-sized.

```ts
type Builder = {
  id: string
  name: string
  bio_short: string
  links: {
    site?: string
    github?: string
    blog_feed_url?: string // RSS
    x?: string
    other?: string[]
  }
  tech_stack: string[]
  build_streak?: number // derived: commit/post activity, not self-reported
  revenue_disclosure: boolean // opt-in; never required
  products: Product[]
  oss_contributions?: OssContribution[] // GitHub API later
}

type Product = {
  id: string
  name: string
  one_liner: string // plain language, not pitch
  urls: { product?: string; repo?: string }
  // Template fields — the product
  problem: string
  why_existing_fell_short: string
  architecture: {
    summary: string
    diagram_url?: string
    stack_breakdown?: { piece: string; role: string }[]
  }
  hardest_decision: {
    title: string
    chose: string
    gave_up: string
    body: string
  }
  timeline: { date: string; event: string }[]
  do_differently: string
  metrics?: {
    note?: string
    items?: { label: string; value: string }[]
  }
  open_roadmap: string
  published_at?: string // Assay issue date
  issue_number?: number
}

type OssContribution = {
  repo: string
  url: string
  role?: string // maintainer, frequent, etc.
  since?: string
}
```

**Rules that keep this from becoming Product Hunt:**

- No upvote as primary sort
- No “launched today” shelf as home
- Builder is the primary object; products nest under them
- Template fields required for a product to be listed
- Revenue always optional
