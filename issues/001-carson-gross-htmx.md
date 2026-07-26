# Carson Gross — htmx

*Issue #1 · draft (worked example)*  
Links: [htmx.org](https://htmx.org) · [github.com/bigskysoftware/htmx](https://github.com/bigskysoftware/htmx) · [@htmx_org](https://twitter.com/htmx_org)

A small JavaScript library that completes HTML as hypermedia — AJAX, SSE, and WebSockets as attributes — maintained across a decade of indifference before the industry briefly looked back.

> This draft is assembled from Carson’s public essays, release notes, and HN comments for format demonstration. Before publishing as Issue #1, get explicit permission and a live interview pass for “what they’d do differently,” metrics, and roadmap.

---

## The problem

Building interactive web apps increasingly meant standing up a second application in the browser: client-side routing, a parallel data model, a JSON API, and a build pipeline to glue it together. For a large class of products — admin tools, internal apps, CRUD-heavy SaaS — that complexity was the tax, not the feature. People wanted pages that updated without full reloads, without adopting an entire frontend runtime.

---

## Why existing solutions fell short

The obvious path in the mid-2010s was the SPA stack pouring out of big tech (Angular, then React). It solved interactivity by largely abandoning the web’s original model: the server stopped sending hypermedia and started sending data; the browser stopped being a hypermedia client and became an app runtime.

Server-rendered apps still existed, but “progressive enhancement” usually meant sprinkling imperative jQuery or bolting on a mini-framework. pjax and similar tricks got partway there — partial page updates — without a general model for *any* element triggering *any* HTTP method and swapping *any* target. Carson’s own words on the early years: the world wasn’t ready to consider an alternative to the hot ideas coming out of Google and Facebook. The wall wasn’t “can this work?” It was “will anyone look?”

---

## Architecture

htmx doesn’t replace the web architecture. It extends HTML so the browser can do what anchors and forms always did — issue HTTP requests and handle responses — with more events, more methods, and finer-grained swap targets.

**Two constraints that define the shape (Carson’s HDA framing):**

1. Interactivity is declared in HTML (attributes), not driven primarily by imperative client scripts.
2. The server speaks **hypermedia** (HTML fragments), not a fixed JSON data API, as the main app protocol.

```
┌─────────────┐  attribute-driven request   ┌──────────────────┐
│   Browser   │ ───────────────────────────► │  Any HTTP server │
│  (+ htmx)   │   GET/POST/PUT/PATCH/DELETE  │  (Rails, Django, │
│             │ ◄─────────────────────────── │   Go, etc.)      │
└─────────────┘   HTML fragment (swap)       └──────────────────┘
      │
      │  optional: SSE / WebSocket for server-pushed hypermedia
      ▼
  DOM swap / transition — server remains authority on app state
  (HATEOAS), rather than a mirrored client model
```

Stack reality: htmx is ~one dependency on the client; the “framework” is your existing server. Pairing libraries (e.g. hyperscript) are optional and separate. No compulsory Vite/React/Redux spine.

---

## The hardest technical decision

**Stay architecturally sympathetic to the web — hypermedia over the JSON-SPA model — even when that meant looking obsolete for years.**

The tradeoff, stated honestly:

| Choose hypermedia (htmx’s path) | Choose the SPA default |
|---|---|
| Server owns UI state; simpler mental model for many apps | Client owns rich offline/interactive surfaces |
| Tiny client dependency; any backend works | Huge ecosystem, hiring familiarity, mobile-like UX |
| Looks “old” in fashion cycles; fewer npm badges | Fashion-aligned; easier social proof in 2015–2022 |
| Coupling at the *application* layer (HTML shaped by server) | Coupling at the *network* layer (versioned JSON contracts) |

Carson’s essays argue the counterintuitive point: tighter HTML coupling can still yield a more evolvable *system* because of HATEOAS — the client doesn’t hardcode a data schema. What they gave up: the recruiting narrative, the conference default, and a decade of feeling like noise. What they kept: a library you can read, a model you can teach, and apps that don’t need a second product in `node_modules`.

A second, sharper decision inside the project: **rewrite intercooler.js without jQuery and rename it (2020)**. Same idea, new skin — because the point had become “complete HTML,” not “a quirky jQuery plugin.”

---

## Timeline

| When | What actually happened |
|---|---|
| 2012 | Prototype of what becomes intercooler.js — mashup of `$.load()`, pjax, and attribute-driven ideas (Angular was the fashion reference point). |
| 2013 | intercooler.js released. Long stretch of limited mainstream attention follows. |
| 2013–2019 | “Screaming into the void” years — essays, niche use, no fashion win. SPA orthodoxy hardens. |
| Apr 2020 | Covid rewrite begins: drop jQuery, rename to **htmx** — framed as completing HTML as hypertext, not a quirky JS lib. |
| May 2020 | htmx 0.0.1. Early adopter pressure (e.g. Sprig) accelerates the design. |
| Nov 24, 2020 | htmx 1.0.0 released. Recommendation: new projects use htmx; large intercooler apps need care migrating. |
| ~2021–2022 | Quiet compounding — Django folks and server-rendered communities, still outside the Next.js gravity well. Book *Hypermedia Systems* written; a major publisher cancels it (~a year before the later surge). |
| 2023 | GitHub Accelerator cohort. Twitch/YouTube surface area (teej_dv → ThePrimeagen, Fireship short) coincides with the book’s availability. Traffic spike Carson describes as luck meeting a decade of preparation. |
| 2024– | Continues as actively argued infrastructure: essays on architectural sympathy, HATEOAS, decoupling — not launch theater. |

The stuck period isn’t a footnote. It’s most of the story.

---

## What they’d do differently

*To confirm in interview.* From the public record, a credible tension to probe:

- Whether the intercooler → htmx rename/split cost more community continuity than it gained in clarity.
- How much of the 2023 breakout was narrative/luck vs. product change — and what they’d refuse to “optimize for” if fashion swings again.
- What they’d tell someone starting a similarly unfashionable bet in year two of silence.

*(Don’t invent regrets. Ask.)*

---

## Current metrics *(optional)*

Public, non-theater signals (verify at publish time):

- Successor to a project started in 2013 — durability over novelty
- Open source, widely depended on for production server-rendered apps
- Body of essays + *Hypermedia Systems* as the “paper trail,” not a pitch deck
- GitHub Accelerator (2023) — peer recognition from OSS maintainers, not a launch badge

MRR: not the point; omit unless Carson wants it in.

---

## Open roadmap

*Confirm with Carson.* Public direction historically looks like:

- Keep the core small; resist becoming a meta-framework
- Continue the essay/teaching layer (the ideas travel farther than the min.js)
- Ecosystem stays polyglot at the server — htmx is not a backed “htmx Cloud”

Ask for 2–3 concrete next technical bets he’d be willing to publish under his name.

---

## Why this is Issue #1 material

Product Hunt would have needed a launch day in 2013 or 2020 and then moved on. Assay exists because the interesting part is the **ten years in between** — the architecture bet, the rename, the void, and the accidental rocket.

If the template feels natural for a builder, they belong here. If they only have a launch video and a waitlist, they don’t.

---

## Closing credit

Primary public sources: [htmx 1.0 release notes](https://htmx.org/posts/2020-11-24-htmx-1-0-0-is-released/), [Hypermedia-Driven Applications](https://htmx.org/essays/hypermedia-driven-applications/), [Architectural Sympathy](https://htmx.org/essays/architectural-sympathy/), [Two Approaches To Decoupling](https://htmx.org/essays/two-approaches-to-decoupling/), Carson’s [HN comment on the htmx arc](https://news.ycombinator.com/item?id=40442592).
