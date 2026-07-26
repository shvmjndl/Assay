import type { Issue } from "@/types";

export const seedIssues: Issue[] = [
  {
    slug: "carson-gross-htmx",
    number: 1,
    publishedAt: "2026-07-28",
    status: "draft",
    builder: {
      name: "Carson Gross",
      handle: "@htmx_org",
      url: "https://twitter.com/htmx_org",
    },
    product: {
      name: "htmx",
      url: "https://htmx.org",
      repo: "https://github.com/bigskysoftware/htmx",
    },
    frame:
      "A small library that completes HTML as hypermedia — maintained across a decade of indifference before the industry briefly looked back.",
    yearsUnderway: 13,
    startedYear: 2013,
    criteria: [
      "original-engineering",
      "technical-innovation",
      "long-term",
      "open-source",
      "solo",
    ],
    techStack: ["JavaScript", "HTML", "Hypermedia", "HATEOAS"],
    problem:
      "Building interactive web apps increasingly meant standing up a second application in the browser: client-side routing, a parallel data model, a JSON API, and a build pipeline to glue it together. For admin tools, internal apps, and CRUD-heavy SaaS, that complexity was the tax — not the feature.",
    whyExistingFellShort:
      "The SPA stack solved interactivity by abandoning the web’s original model: servers stopped sending hypermedia and started sending data. Progressive enhancement usually meant sprinkling jQuery or bolting on a mini-framework. pjax got partway there without a general model for any element, any method, any swap target. The wall wasn’t “can this work?” — it was “will anyone look?”",
    architecture: {
      summary:
        "htmx extends HTML so the browser can issue HTTP requests and handle responses with more events, methods, and finer-grained swap targets. The server remains the authority on application state.",
      diagram: `Browser (+ htmx)
    │  attribute-driven request
    │  GET / POST / PUT / PATCH / DELETE
    ▼
Any HTTP server (Rails, Django, Go…)
    │  HTML fragment
    ▼
DOM swap — server owns state (HATEOAS)`,
    },
    hardestDecision: {
      title: "Hypermedia over the JSON-SPA model",
      body: "Stay architecturally sympathetic to the web — even when that meant looking obsolete for years. A second decision inside the project: rewrite intercooler.js without jQuery and rename it to htmx in 2020, because the point had become completing HTML, not shipping a quirky plugin.",
      chose: "Hypermedia-driven apps with a tiny client dependency",
      gaveUp: "Fashion alignment, recruiting narrative, a decade of feeling like noise",
      sides: [
        {
          label: "Hypermedia path",
          points: [
            "Server owns UI state",
            "Any backend works",
            "Evolvable via HATEOAS",
            "Looks “old” in fashion cycles",
          ],
        },
        {
          label: "SPA default",
          points: [
            "Rich client surfaces",
            "Huge ecosystem",
            "Hiring familiarity",
            "Versioned JSON contracts",
          ],
        },
      ],
    },
    timeline: [
      { when: "2012", what: "Prototype that becomes intercooler.js — $.load(), pjax, attribute-driven ideas." },
      { when: "2013", what: "intercooler.js released. Long stretch of limited mainstream attention begins." },
      { when: "2013–2019", what: "“Screaming into the void” years. SPA orthodoxy hardens." },
      { when: "Apr 2020", what: "Covid rewrite: drop jQuery, rename to htmx — completing HTML as hypertext." },
      { when: "Nov 2020", what: "htmx 1.0.0 ships." },
      { when: "2021–2022", what: "Quiet compounding in server-rendered communities. Book written; a publisher cancels it." },
      { when: "2023", what: "GitHub Accelerator. Streaming surface area meets preparation. The stuck period was most of the story." },
    ],
    doDifferently:
      "Interview pending — probe the intercooler→htmx rename cost, how much of 2023 was luck vs product change, and what to tell someone in year two of silence.",
    metrics: [
      { label: "Underway since", value: "2013" },
      { label: "Form", value: "Open source" },
      { label: "Signal", value: "GitHub Accelerator ’23" },
    ],
    roadmap: [
      "Keep the core small — refuse becoming a meta-framework",
      "Continue the essay/teaching layer",
      "Stay polyglot at the server — no “htmx Cloud”",
    ],
    sources: [
      { label: "htmx 1.0 release", url: "https://htmx.org/posts/2020-11-24-htmx-1-0-0-is-released/" },
      { label: "Hypermedia-Driven Applications", url: "https://htmx.org/essays/hypermedia-driven-applications/" },
      { label: "Architectural Sympathy", url: "https://htmx.org/essays/architectural-sympathy/" },
    ],
  },
  {
    slug: "mitchell-hashimoto-ghostty",
    number: 2,
    publishedAt: "2026-08-04",
    status: "draft",
    builder: {
      name: "Mitchell Hashimoto",
      handle: "@mitchellh",
      url: "https://mitchellh.com",
    },
    product: {
      name: "Ghostty",
      url: "https://ghostty.org",
      repo: "https://github.com/ghostty-org/ghostty",
    },
    frame:
      "A terminal emulator with a Zig core and native GUI per platform — rewritten enough times that the rewrites became the craft.",
    yearsUnderway: 3,
    startedYear: 2022,
    criteria: [
      "original-engineering",
      "beautiful-design",
      "technical-innovation",
      "open-source",
      "small-team",
    ],
    techStack: ["Zig", "Swift", "GTK", "Metal", "Valgrind"],
    problem:
      "Cross-platform terminals usually pick one GUI toolkit and accept feeling foreign everywhere — or chase performance and leave native platform behavior behind.",
    whyExistingFellShort:
      "Electron-style shells and lowest-common-denominator toolkits trade away platform integration. Pure performance experiments often skip the boring lifetime and memory work that makes a daily driver trustworthy.",
    architecture: {
      summary:
        "Shared Zig core exporting a C ABI; macOS speaks Swift/AppKit; Linux/BSD speak GTK. Surfaces own IO and renderer threads; apprt decides windows, tabs, and splits.",
      diagram: `apprt (Swift / GTK)
    │ creates surfaces
    ▼
Zig core (C ABI)
    ├── IO thread  → pty, escape sequences
    └── renderer   → fonts, pixels, framerate`,
    },
    hardestDecision: {
      title: "Native GUI per platform instead of one shared toolkit",
      body: "Ship a real macOS app and a real GTK app against one Zig core — accepting duplicate GUI work to keep platform sympathy. Later: embrace GObject on Linux after manual memory lifetimes kept failing at the Zig/GTK boundary.",
      chose: "Platform-native apprt + shared core",
      gaveUp: "Single codebase GUI speed and simpler staffing",
      sides: [
        {
          label: "Native per platform",
          points: ["Feels at home on each OS", "Deep integrations", "Duplicate GUI cost", "Harder ABI edges"],
        },
        {
          label: "One toolkit everywhere",
          points: ["Faster feature parity", "Simpler team shape", "Foreign UX", "Shallow platform hooks"],
        },
      ],
    },
    timeline: [
      { when: "2022–23", what: "Private build-up; closed beta with source access." },
      { when: "2024", what: "Public open-source release arc; performance work (SIMD IO, Unicode tables)." },
      { when: "2025", what: "GTK rewrite embracing GObject + Valgrind discipline; 5th GUI rewrite from scratch." },
    ],
    doDifferently:
      "Placeholder for interview — the Valgrind-at-every-PR discipline and when to rewrite vs refactor.",
    metrics: [
      { label: "GUI rewrites", value: "5" },
      { label: "Core language", value: "Zig" },
    ],
    roadmap: [
      "Keep Linux/BSD maintainability after gtk-ng",
      "More latency and memory writeups in public",
    ],
  },
  {
    slug: "justine-tunney-redbean",
    number: 3,
    publishedAt: "2026-08-11",
    status: "draft",
    builder: {
      name: "Justine Tunney",
      handle: "@JustineTunney",
    },
    product: {
      name: "redbean",
      url: "https://redbean.dev",
      repo: "https://github.com/jart/redbean",
    },
    frame:
      "A single-file web server that runs on six operating systems — Cosmopolitan Libc as the bet underneath.",
    yearsUnderway: 5,
    startedYear: 2020,
    criteria: [
      "original-engineering",
      "technical-innovation",
      "long-term",
      "open-source",
      "solo",
    ],
    techStack: ["C", "Cosmopolitan Libc", "Lua", "zip"],
    problem:
      "Shipping a tiny networked tool usually means picking an OS, a libc, a packaging story, and watching portability eat the project.",
    whyExistingFellShort:
      "Containers and language runtimes hide portability instead of solving it. “Write once” rarely means a literal single binary across Linux, Mac, Windows, BSD, and bare metal adjacent environments.",
    architecture: {
      summary:
        "A zip-based ape executable embedding a web server and optional Lua — Cosmopolitan Libc makes the same binary polymorphic across platforms.",
      diagram: `redbean.com (zip + ape)
    ├── HTTP server
    ├── embedded assets
    └── Cosmopolitan Libc → Linux / Mac / Windows / BSD…`,
    },
    hardestDecision: {
      title: "Bet the product on Cosmopolitan Libc",
      body: "Instead of maintaining per-OS builds as the product, make Actually Portable Executables the substrate — accepting toolchain weirdness for a radical distribution model.",
      chose: "One binary, many OSes",
      gaveUp: "Conventional packaging familiarity and easy contributor onboarding",
      sides: [
        {
          label: "Cosmo / APE",
          points: ["Literal single artifact", "Tiny distribution", "Exotic toolchain", "Harder mainstream hiring"],
        },
        {
          label: "Normal builds",
          points: ["Familiar CI", "Easy contributors", "Matrix of artifacts", "Portability as busywork"],
        },
      ],
    },
    timeline: [
      { when: "2020", what: "redbean appears; Cosmopolitan story gathers serious attention." },
      { when: "2021–", what: "Continued libc and tooling depth — long game, not launch week." },
    ],
    doDifferently: "Interview pending — where Cosmo’s bet hurt and where it still feels inevitable.",
    metrics: [{ label: "Shape", value: "Single-file server" }],
    roadmap: ["Keep the binary small", "Document the sharp edges publicly"],
  },
];

/** @deprecated Prefer getAllIssues / getIssue from @/lib/issue-store */
export const issues = seedIssues;

export const issueSections = [
  { id: "problem", label: "Problem" },
  { id: "fell-short", label: "Fell short" },
  { id: "architecture", label: "Architecture" },
  { id: "decision", label: "Decision" },
  { id: "timeline", label: "Timeline" },
  { id: "differently", label: "Differently" },
  { id: "metrics", label: "Metrics" },
  { id: "roadmap", label: "Roadmap" },
] as const;
