# Refine the dark dev-tool design system instead of rebranding

The "redesign everything" pass kept the existing **dark dev-tool** identity (zinc base, emerald accent, Geist Sans/Mono, grid texture) and refined *within* it — deepened the surface elevation ramp, added a focus-ring token + global `:focus-visible`, standardized hover/transition and reduced-motion behavior, and lifted cards on hover — rather than adopting a new look.

The `ui-ux-pro-max` skill was used to source guidance: it recommended a Dark Mode (OLED) style with a green accent (validating ours), but proposed a **slate (blue-tinted) palette** and **Inter**. We deliberately kept **zinc** and **Geist** to preserve the established brand.

## Considered options

- **Rebrand to a new look** — rejected; the dark dev-tool identity fits the audience (devs browsing skills) and is documented in the README. A full reskin is high-effort and throws away recognition.
- **Adopt ui-ux-pro-max's slate + Inter recommendation** — rejected; slate shifts the neutral zinc identity toward blue, and Geist already covers Inter's "clean neutral sans" role better for a dev tool.
- **Refine within the dark dev-tool identity (chosen)** — keep tokens' character, improve hierarchy, contrast, focus, and motion.

## Consequences

- A future reader may see the site looks much the same after a "full redesign" and wonder why — that was intentional; the change is in polish (ramp, focus, motion, spacing), not brand. Do not "modernize" by switching to slate/Inter without revisiting this.
- New design tokens (`--color-surface-3`, `--color-ring`) extend the system; keep them consumed rather than speculative.
