# Thai-primary content with inline English terms

The user-facing site is written in Thai as its single primary language — there is no language toggle and no i18n framework. Curated prose (taglines, summaries, "when to use", benefits, author bios) and section headings are Thai. A fixed set of short terms stays English because translating them adds noise rather than clarity: skill names, Category values, Tags, and the chip labels Featured / Install / Source / Author. In Example transcripts the prompt is Thai while the result is mixed — Thai narration around code, diffs, and tool output that stay English.

## Considered options

- **Full i18n (TH/EN toggle)** — every field stored in two languages, locale routing. Rejected: doubles the writing burden for a single-audience site and adds machinery we don't need yet.
- **English-only** — rejected: the audience is Thai; the whole point of this pass was a Thai primary experience.
- **Thai-primary, no toggle (chosen)** — lowest friction, reads naturally for the target reader.

## Consequences

A future contributor will see Thai prose interleaved with English headings-chips and fully-English `SKILL.md` bodies and may wonder what the rule is — it is the boundary above, not an accident. `CONTEXT.md` and these ADRs stay English: they are developer documentation, not site content, and the domain glossary is unaffected by this decision. If a second audience ever needs English, this choice is real work to unwind — that is the trade-off we accepted.
