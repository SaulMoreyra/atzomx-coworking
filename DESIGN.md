# Design — Atzomx

Locked design system for the Atzomx marketing site and subpages. Future Hallmark runs, new sections, and refactors **read this file first** and defer to it. Amend intentionally — the file is the rule.

Implementation today uses **Tailwind** (`brand-*`, utility classes in `globals.css`) backed by **`tokens.css`** at the project root and `src/design-system/tokens.ts`.

---

## System

| Axis | Value |
| --- | --- |
| **Genre** | editorial |
| **Theme** | Atzomx brand (custom — 4-color palette, no catalog rotation) |
| **Paper band** | light (cream `L > 85%`) |
| **Display style** | Anonymous Pro mono-editorial + Blur logo (SVG) |
| **Accent hue** | chromatic-other (lavender `#d3bedb`, use ≤ 5% per viewport) |

**Diversification rule is inverted** on this project: pages share this system. Macrostructure may differ by page type; colour, type, chrome, and CTA voice do not.

---

## Colour

Four official colours only. No fifth brand colour without amending this file.

| Role | Hex | Tailwind | Token | Use |
| --- | --- | --- | --- | --- |
| Cream | `#fffbed` | `brand-cream` | `--color-paper` | Default background, prose sections |
| Main | `#d4e6c0` | `brand-main` | `--color-paper-2` | Hero (Presentation), gallery, plan bands, team |
| Green | `#2f3e22` | `brand-green` | `--color-ink` | Text, borders, primary buttons, focus ring |
| Accent | `#d3bedb` | `brand-accent` | `--color-accent` | Selection, small highlights — not full-section fills |

**Section surfaces:** prefer **one background per section** + `border-t border-brand-green/10`. Do not stack a second fill colour on top (e.g. cream cards on accent bands).

**Borders:** `border-brand-green/10`–`/20` for dividers; dotted leaders only on menu price rows.

---

## Typography

| Role | Face | Class / token | When |
| --- | --- | --- | --- |
| Logo | Blur (SVG preferred) | `.font-logo` / `font-logo` | ATZOMX wordmark only — use `logo-atzomx.svg` in chrome |
| Display | Anonymous Pro 700 caps | `.text-display` | Short all-caps mastheads, RotatingWords |
| Prose display | Anonymous Pro 700 | `.text-display-prose` | Headlines with accents — titles, plans, categories |
| Body | Anonymous Pro 400 | `.text-body` / `font-sans` | Paragraphs, answers, descriptions |
| Label | Anonymous Pro caps | `.text-label` / `font-mono` | Kickers, nav, buttons, metadata — `tracking-[0.12em]`–`0.22em` |
| Schedule / data | Anonymous Pro | `.text-schedule` / `font-mono` | Hours pill, admin slugs, tabular fields |

**Do not** use Blur outside the logo. Prefer SVG logos in header and utility bars.

**Section titles:** left-aligned via `HomeSectionIntro` — kicker (optional) → `text-display-prose` title → hairline (`max-w-[4rem]`) → subtitle.

---

## Layout

- **Container:** `.section-container` — `max-w-7xl mx-auto px-6 md:px-12 xl:px-20`
- **Editorial measure:** `max-w-3xl lg:max-w-4xl` for long-form and subpages
- **Section padding:** `py-14 md:py-20` (compact strips: `py-12 md:py-14`)
- **Split columns:** `lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]` — never bare `1fr` on image/text grids
- **Display headings:** `min-w-0 [overflow-wrap:anywhere]` on all `h1`/`h2` display lines

---

## Canonical components

Reuse these; do not reintroduce centered `HighlightShape` + `Label` + `Heading` stacks.

| Component | Path | Use |
| --- | --- | --- |
| `HomeSectionIntro` | `src/components/ui/HomeSectionIntro/` | Section header — left-aligned |
| `BlogUtilityHeader` | `src/components/BlogBanner/BlogUtilityHeader.tsx` | Subpages: back · wordmark · locale |
| `MenuMasthead` / `BlogIndexMasthead` / `RemoteWorkMasthead` | `*Banner/*Masthead.tsx` | Cream masthead under utility bar |
| `Presentation` | `src/components/Presentation/` | **Home hero only — do not clone** |
| `LocaleSwitch` | `src/components/LocaleSwitch/` | Header / utility bar |
| `Footer` | `src/components/Footer/` | Site footer (unchanged across routes) |

**Lists over cards:** benefits, FAQ, highlights, community events, menu categories → typographic rows with `border-y divide-brand-green/12`, not icon-in-circle grids.

---

## Navigation & chrome

| Context | Chrome |
| --- | --- |
| **Home** | `Header` — adaptive surface via `data-header-surface` |
| **Subpages** (`/menu`, `/blog`, `/blog/[slug]`, `/remote-work`) | `BlogUtilityHeader` (green utility bar) + cream masthead |
| **Footer** | Shared `Footer` in route `layout.tsx` |

Subpage layout pattern: `layout.tsx` → `{children}` + `Footer`; banner/masthead live in `page.tsx`.

---

## CTA voice

| Tier | Style |
| --- | --- |
| **Primary** | `rounded-brand border border-brand-green bg-brand-green text-brand-cream` · min-h 44px · `.text-label` |
| **Secondary** | `rounded-brand border border-brand-green/25 bg-brand-main text-brand-green` |
| **Tertiary / inline** | underline or `border-b-2 border-brand-green` — Presentation, masthead links |
| **Focus** | `.focus-brand` — ring `brand-green`, offset `brand-cream`, instant (no animation) |

WhatsApp CTAs use `WhatsAppLink` with prefilled message keys from i18n.

---

## Motion

- **Library:** framer-motion on hero and plan bands only; prefer CSS transitions elsewhere
- **Durations:** 200ms UI · 300–350ms reveals · respect `prefers-reduced-motion`
- **Animate:** `transform` and `opacity` only — never layout properties
- **No** bounce, overshoot, or confetti except existing menu favourite (legacy)

---

## Page types & macrostructure families

Macrostructure may vary; **tokens and components above may not.**

| Route | Macrostructure | Notes |
| --- | --- | --- |
| `/` | Marquee Hero (Presentation) + Split Studio (sections) | Presentation is frozen |
| `/menu` | Catalogue | Utility bar + masthead + horizontal category nav + inventory bands |
| `/blog` | Index-First | Utility bar + masthead + editorial index list |
| `/blog/[slug]` | Long Document | Utility bar + article prose + related index |
| `/remote-work` | Narrative Workflow | Utility bar + masthead + numbered workflow timeline |

New marketing pages: pick a **new** macrostructure not used on the target route; stay inside this colour and type system.

---

## Hallmark stamp

New or redesigned pages must include a CSS comment stamp:

```css
/* Hallmark · macrostructure: <Name> · tone: editorial · anchor hue: forest-green
 * design-system: DESIGN.md · theme: Atzomx brand (preserved)
 */
```

Append an entry to `.hallmark/log.json` after page-scope work.

---

## Anti-patterns (do not)

- Centered section template: icon → uppercase kicker → split Heading with green underline bar
- Three equal feature cards with icon circles
- `OrganicDivider` between every section (use `border-t border-brand-green/10`)
- Rotating `planSlideSurfaces` / accent section bands with nested cream boxes
- Blur outside logo wordmark; invented stats or fake testimonial counts
- Fake browser chrome, stock-photo placeholders presented as final art

---

## Exports

Canonical file: [`tokens.css`](./tokens.css). Tailwind mapping: [`tailwind.config.js`](./tailwind.config.js). TS mirror: [`src/design-system/tokens.ts`](./src/design-system/tokens.ts).

### Tailwind v4 `@theme` (future)

```css
@theme {
  --color-paper: oklch(98.4% 0.016 98);
  --color-paper-2: oklch(90.2% 0.054 128);
  --color-ink: oklch(28.5% 0.038 132);
  --color-accent: oklch(80.5% 0.048 310);
  --font-logo: "Blur", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Anonymous Pro", ui-monospace, "SF Mono", Menlo, monospace;
  --font-body: "Anonymous Pro", ui-monospace, "SF Mono", Menlo, monospace;
  --font-mono: "Anonymous Pro", ui-monospace, "SF Mono", Menlo, monospace;
  --font-display-prose: "Anonymous Pro", ui-monospace, "SF Mono", Menlo, monospace;
  --radius-brand: 0.75rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(98.4% 0.016 98)", "$type": "color" },
    "paper-2": { "$value": "oklch(90.2% 0.054 128)", "$type": "color" },
    "ink": { "$value": "oklch(28.5% 0.038 132)", "$type": "color" },
    "accent": { "$value": "oklch(80.5% 0.048 310)", "$type": "color" }
  },
  "font": {
    "logo": { "$value": "Blur, ui-sans-serif, system-ui, sans-serif", "$type": "fontFamily" },
    "display": { "$value": "Anonymous Pro, ui-monospace, SF Mono, Menlo, monospace", "$type": "fontFamily" },
    "display-prose": { "$value": "Anonymous Pro, ui-monospace, SF Mono, Menlo, monospace", "$type": "fontFamily" },
    "body": { "$value": "Anonymous Pro, ui-monospace, SF Mono, Menlo, monospace", "$type": "fontFamily" },
    "mono": { "$value": "Anonymous Pro, ui-monospace, SF Mono, Menlo, monospace", "$type": "fontFamily" }
  }
}
```

### shadcn/ui variables

```css
:root {
  --background: 98.4% 0.016 98;
  --foreground: 28.5% 0.038 132;
  --primary: 28.5% 0.038 132;
  --primary-foreground: 98.4% 0.016 98;
  --secondary: 90.2% 0.054 128;
  --secondary-foreground: 28.5% 0.038 132;
  --accent: 80.5% 0.048 310;
  --accent-foreground: 28.5% 0.038 132;
  --border: 28.5% 0.038 132 / 0.12;
  --ring: 28.5% 0.038 132;
  --radius: 0.75rem;
}
```

---

## Variants

*(None yet. Add sub-brands or campaign overrides here — not per-page CSS overrides.)*
