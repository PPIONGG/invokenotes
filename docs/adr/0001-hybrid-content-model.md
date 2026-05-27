# Hybrid content model for Skills

> **Status: superseded by [ADR 0003](./0003-catalog-over-raw-render.md).** The raw `SKILL.md` render described below was removed; the detail page is now fully curated and links out to the source instead.

A Skill's detail page combines three layers rather than picking one: (1) curated explanation written for this site — what the skill is, when to use it, and what you gain — (2) the rendered original `SKILL.md` body, and (3) one or more usage Examples shown as prompt→result transcripts, plus Source and install links.

## Considered options

- **Catalog only** — store just metadata and a hand-written summary, never show the raw `SKILL.md`. Lightest, but a visitor can't verify the summary against the real thing or judge a skill they don't yet trust.
- **Mirror only** — render the raw `SKILL.md` like a GitHub file viewer, no curated layer. Faithful and low-maintenance, but a `SKILL.md` is written for an agent, not a browsing human, so it explains poorly on its own.
- **Hybrid (chosen)** — curated framing for humans, the raw file for fidelity, and transcripts for proof.

## Consequences

The curated summary and the raw body will look partly redundant to a future reader — that overlap is deliberate, not an oversight. It also means each Skill record carries both authored fields and the original markdown, and the data shape (`lib/skills.ts`) is wider than a pure mirror would need.
