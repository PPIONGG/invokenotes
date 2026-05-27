# Recipe steps reference only cataloged skills

A **Recipe** (see [`CONTEXT.md`](../../CONTEXT.md)) sequences several Skills into an ordered walkthrough of a real-life task. Each **Step** may cite zero or more Skills, and every cited Skill must already exist in the catalog — referenced by `slug`, never by free text or an external URL. A Step that is not a skill call is allowed as plain connective narrative (e.g. "deploy to Vercel"), but it cites no Skill rather than naming an uncataloged one.

## Why

Every Skill a Recipe names should be one the reader can click through, read, and install — the same honesty principle behind [ADR 0005](./0005-split-multi-rule-skill-into-entries.md) ("keep the catalog honest about what you can actually install").

Allowing free-text or external skill references was considered: it would let a Recipe depict flows that lean on built-in or not-yet-cataloged skills (e.g. `/code-review`, `/frontend-design`). But it produces dead, unclickable mentions and lets Recipes drift ahead of the catalog. Constraining references to cataloged slugs keeps every Step actionable and turns "this recipe wants a skill we don't have" into a signal to catalog that skill first — so Recipes double as a discovery path *into* the catalog rather than a list of things you can't get.

## Consequences

- A Recipe cannot be authored until the Skills it leans on are in the catalog; needing an uncataloged skill is a prompt to add that skill first.
- The derived "parts list" (the union of Step skill slugs) is always a set of real, linkable catalog entries — it cannot contain a dangling name.
- Built-in or third-party skills that aren't cataloged can only appear as unattributed narrative Steps, not as named skill chips. A future contributor who wants to reference one should revisit this ADR rather than quietly adding free-text refs.
- Cross-linking works reliably both ways: a Skill detail page can list "Recipes that use this skill" purely from slugs, with no separate index to maintain.
