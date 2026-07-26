# Assay

**No launch day. Just the proof.**

## Website

The product UI lives in [`frontend/`](./frontend):

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

Routes: `/` · `/issues` · `/issues/[slug]` · `/discover` · `/write` · `/signin` (Google via Auth.js)

**Write:** signed-in builders fill the exact Assay template and publish live to Issues / Discover.

A weekly profile of products built with depth — engineering decisions, stuck periods, lessons learned. The opposite of “see what’s new today.” This is “see what’s real.”

| Product Hunt | Assay |
|---|---|
| What’s new today | What’s been true for years |
| Launch moment | Running record |
| Product as object | Builder + journey as object |
| Upvotes | Paper trail |
| Disappears after day one | The profile compounds |

---

## What this is (right now)

An **editorial format**, not a platform.

- **Cadence:** one profile, every Tuesday
- **Channel:** Substack or Ghost first (test demand before writing product code)
- **Distribution:** native thread on X/LinkedIn (architecture diagram as hook), optional HN / niche subreddit with builder permission

Do not build custom infrastructure until inbound feature requests and ~500 engaged subscribers say it’s worth it.

---

## The format is the filter

Every issue follows [`TEMPLATE.md`](./TEMPLATE.md). If a builder can’t fill it honestly — no real architecture decision, no stuck period, no lesson — they don’t clear the bar. The template curates; you don’t have to.

Worked example: [`issues/001-carson-gross-htmx.md`](./issues/001-carson-gross-htmx.md)

---

## Finding builders (don’t put up a “submit” form yet)

Chase people already writing this way. Ask permission to re-platform/expand — don’t broadcast “who wants to be featured.”

Signals:
- Show HN threads with real technical argument in the comments
- Solo/small repos with 2+ years of consistent commits + a linked blog/changelog
- r/SideProject, r/dataisbeautiful — builders who over-explain unprompted
- Indie Hackers milestones that write *process*, not only revenue screenshots

Outreach must cite a specific technical decision from their work. Generic pitches die.

---

## Traction signals (ignore vanity)

1. Featured builders share unprompted
2. Open/CTR stays ~35–40%+ past the first 50 subscribers
3. Inbound “can you feature me?” — that’s when a platform is justified

---

## Monetization sequence (later)

| Stage | What | Rough numbers |
|---|---|---|
| 1k+ engaged subs | Newsletter sponsor slot | $200–500/issue (dev tools, hosting, observability) |
| Demand exists | Paid submit-for-review queue | $50–100 (keep a free tier) |
| Traffic | Job board | $200–300/listing |
| Inbound + backlog | Profiles / platform | Weekend v1, not a rewrite of Product Hunt |

---

## Eventual profile schema (sketch only)

```
builder_id
products[]          # each with template fields (architecture, timeline, lessons…)
oss_contributions[] # GitHub API
blog_feed_url       # RSS
tech_stack[]
build_streak        # derived from commits/posts
revenue_disclosure  # optional boolean
```

Details in [`SCHEMA.md`](./SCHEMA.md).
