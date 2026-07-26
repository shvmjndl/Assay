# Assay — issue template

Rigid on purpose. This is a format, not a blog post. Incomplete honesty = does not ship.

---

## Header

**[Builder name] — [Product name]**  
*Issue #[N] · [Month Day, Year]*  
Links: [product] · [repo] · [builder]

One-line frame (not a pitch): what this is, in plain language, and how long it’s been underway.

---

## The problem

2–3 sentences. Plain language. No jargon, no positioning copy.

What hurt for a real person before this existed?

---

## Why existing solutions fell short

This is where craftsmanship shows.

Did they try the obvious tool first? Where did it break — technically, operationally, or philosophically? Name the wall.

---

## Architecture

A real diagram **or** a stack breakdown with roles for each piece.

Not a logo salad. Not “we use best-in-class tooling.” Show how data/control flows and where the hard boundary is.

```
[ preferred: ascii or linked diagram ]
```

---

## The hardest technical decision

**One** specific tradeoff. Explain both sides. Say what they chose and what they gave up.

Examples of the right grain: Postgres over Mongo; roll-your-own auth vs Auth0; hypermedia over JSON SPA; native GUI per platform vs electron.

---

## Timeline

Actual dates. Include boring and stuck periods. No “launched in 3 weeks” mythology.

| When | What actually happened |
|---|---|
| … | … |

---

## What they’d do differently

At least one concrete regret or revision. If everything was perfect, the profile isn’t ready.

---

## Current metrics *(optional — builder’s choice)*

Respect people who refuse MRR theater. If included: prefer durability signals (years maintained, active users who depend on it, contributors, uptime) over vanity screenshots.

---

## Open roadmap

What’s next, publicly. Enough that a reader could check back in six months and see if it happened.

---

## Closing credit

How to follow the builder. Permission note if any quotes were adapted from prior writeups.
