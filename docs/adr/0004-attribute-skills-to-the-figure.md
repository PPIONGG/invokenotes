# Attribute adapted skills to the figure, not the SKILL.md writer

The **Author** of a Skill is the community figure whose thinking the Skill represents (e.g. Andrej Karpathy), even when a third party wrote the actual `SKILL.md`. The first such case is `karpathy-guidelines`, whose `SKILL.md` was written by the `multica-ai` org and *derived from* a Karpathy X post — yet we list Karpathy as the Author. The adapter is disclosed only through the **Source** repo name (`multica-ai/andrej-karpathy-skills`), not in the curated prose.

## Considered options

- **Attribute to the writer (multica-ai)** — literally correct per the old "created" definition, but buries the recognizable figure the catalog exists to showcase behind an unknown org name.
- **Structured `adaptedBy` field** — most precise; makes "who adapted it" first-class data rendered on the page. Rejected for now as a data-model change heavier than the single current case justifies.
- **Attribute to the figure, disclose adapter via Source (chosen)** — keeps the headline recognizable and needs no shape change.

## Consequences

- `Skill.authorSlug` now means "the figure this is attributed to", not "who wrote the file". `CONTEXT.md`'s **Author** and **Source** definitions were updated to match.
- A reader who only sees Author = Karpathy may assume he wrote/endorsed the file; the sole signal otherwise is the `multica-ai/...` repo name in **Source**. This imprecision was accepted deliberately — do not "fix" the mismatch without revisiting this ADR.
- If adapted skills become common, revisit the rejected `adaptedBy` field.
