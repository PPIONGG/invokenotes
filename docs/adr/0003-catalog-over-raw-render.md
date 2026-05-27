# Catalog model: link to the source instead of rendering SKILL.md

The skill detail page no longer renders the raw `SKILL.md` body. Instead it is fully curated for a human reader — a plain-language summary, a concrete "what you can do with it" list, when to use it, what you gain, a short "how it works", and worked prompt→result examples — and links out to the author's GitHub for the canonical `SKILL.md`. This **supersedes [ADR 0001](./0001-hybrid-content-model.md)**, which mixed curated content with the rendered raw file.

## Why the change

In practice the rendered `SKILL.md` made pages long and confusing. A `SKILL.md` is written for an agent, not a browsing human, so dropping it in alongside the curated text competed for attention without answering the question a visitor actually has: *"what can I do with this, and when?"* Curated explanation plus a prominent source link communicates faster, and the original is one click away and always current at the source — so nothing is lost by not mirroring it.

## Consequences

- `content/skills/` and `lib/skill-content.ts` are removed — there is no longer a body to read.
- The curated fields now carry the entire explanatory burden, so they must be genuinely good. To support that, the `Skill` shape gains `capabilities` (concrete things it does) and `howItWorks` (plain step sequence), and each skill carries 2–3 examples.
- The overlap between curated summary and raw body that ADR 0001 called out is gone — there is only the curated layer now.
