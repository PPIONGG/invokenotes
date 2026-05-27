# InvokeNotes

A website that collects and explains `SKILL.md` files gathered from various Git repositories — both from well-known people in the AI/engineering community and the site creator's own work. It helps a visitor understand what each skill is, who made it, when to use it, what they gain by invoking it, and where to get the original.

## Language

**Skill**:
A single reusable capability defined by one `SKILL.md` file (its frontmatter plus body) — the atomic unit this site catalogs and explains, and the unit a user installs. A `SKILL.md` may bundle several rules in its body (e.g. the four `karpathy-guidelines` rules); those stay one Skill, described in its curated content, not split into separate entries (see [[docs/adr/0005]]).
_Avoid_: Command, plugin, tool, prompt.

**Author**:
The community figure or organization a Skill is attributed to — whose thinking or work it represents. Often, but not always, the writer of the original `SKILL.md`: a Skill may be a third-party adaptation of a figure's ideas, in which case the figure is the Author and the adapter is disclosed only through the **Source** repo. A first-class entity with its own profile page. Every Author has a **kind**.
_Avoid_: Owner, creator, user, maintainer, adapter.

**Author kind**:
What relationship an Author has to this site. Either **Community** (a notable external person or org whose skills are showcased here, e.g. Anthropic, Andrej Karpathy) or **Self** (the site creator, whose own personal skills are featured). Used to separate "skills from others" from "my own skills".
_Avoid_: Type, owner, personal flag.

**Source**:
Where a Skill's original `SKILL.md` lives — its Git repository URL, repo name, and path within the repo. Embedded directly in the Skill; there is no standalone Repository entity. Drives the "view original / install" links. When the repo owner differs from the **Author**, the Source repo name is also where the adapter is disclosed.
_Avoid_: Repo entity, origin, location.

**Install method**:
One concrete way to obtain a Skill (e.g. manual copy into the skills folder, clone the repo, install via a plugin marketplace). A Skill may offer several, each with a label and a copyable command. Part of the Source.
_Avoid_: Setup, deploy.

**Example**:
A concrete demonstration of a Skill in action, shown as a **transcript**: the prompt a user gives followed by what the skill produces in response. Each Skill may have one or more.
_Avoid_: Demo, sample, usage, snippet.

**Category**:
The single primary kind of work a Skill is for (e.g. Coding, Writing, Research, DevOps). Each Skill belongs to exactly one. The main grouping axis for browsing.
_Avoid_: Group, type, section.

**Tag**:
A free-form keyword attached to a Skill for finer filtering and discovery. A Skill may have many. Secondary to Category.
_Avoid_: Label, keyword, topic.
