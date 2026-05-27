# Catalog a multi-rule skill as one entry, matching its installable unit

`karpathy-guidelines` bundles four distinct rules (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) in a single `SKILL.md`. We catalog it as **one** Skill, with the four rules described inside `capabilities`/`howItWorks` — not as four separate entries.

## Why

The unit a user actually installs is one skill: `andrej-karpathy-skills:karpathy-guidelines` installs all four rules together; you cannot obtain one rule alone. Splitting it into four catalog entries was considered (and briefly drafted) for richer per-rule browsing and filtering, but it produced four slugs that map to no real installable artifact, four pages sharing one identical `Source` file, and one install command repeated four times. Keeping one entry per installable unit keeps the catalog honest about what you can actually install.

## Consequences

- The four rules are curated content (`capabilities`/`howItWorks`), not first-class entries; you cannot filter or link to an individual rule.
- A future reader who sees four named rules in the body may wonder why they aren't four entries — this ADR is the answer; do not split them without revisiting it.
- The catalog **Skill** stays "one `SKILL.md` = one Skill"; the glossary loosening briefly made for the split was reverted.
