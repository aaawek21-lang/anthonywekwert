---
name: Anthony Wekwert
description: Portfolio for a designer and art director. Navy, cream, one red, one typeface, type cropped by the frame.
colors:
  navy: "#071B2B"
  cream: "#E4E2DD"
  red: "#7A1E24"
  ink-soft: "#909699"
  rule: "#384752"
  navy-lift: "#1B2D3B"
typography:
  display:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "24vw"
    fontWeight: 850
    lineHeight: 0.7
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 5vw, 5.5rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 5vw, 5.5rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)"
    fontWeight: 850
    lineHeight: 1.1
  title-sm:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 850
    lineHeight: 1.1
  body:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.5
  body-sm:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 450
    lineHeight: 1.45
  label:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 450
    letterSpacing: "0.02em"
    fontFeature: "tnum"
rounded:
  none: "0"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "1rem"
  s-4: "1.5rem"
  s-5: "2.5rem"
  s-6: "4rem"
  s-7: "7rem"
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
components:
  button-cta:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0 2.5rem"
  switch-button:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem 1rem 1rem"
  switch-button-hover:
    textColor: "{colors.cream}"
  switch-button-active:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
  tag:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.1rem 0.55rem"
  card-fill-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
  card-fill-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
  card-fill-deep:
    backgroundColor: "{colors.navy-lift}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
  nav-link:
    textColor: "{colors.cream}"
    typography: "{typography.body-sm}"
---

# Design System: Anthony Wekwert

## Overview

**Creative North Star: "Too big for the frame"**

The whole site grows out of one move from Anthony's LinkedIn banner: a word set so large the edge of the screen cuts it off. The crop is what makes it feel alive. A word sitting whole in the middle with even space around it looks dead. So every page has one piece of type that's too big for its box, and it gets cut by the top, right, or left edge.

Next to that big gesture, everything else is quiet and exact. Small text is packed into tight blocks like a resume: a label, a value, a thin line between them. Big type and tight blocks sit in open navy space. Layouts lean to one side on purpose. Nothing is centered just to be safe.

It's flat. Three colors, one typeface, no shadows, no gradients, no textures. If a layout needs decoration to hold together, the layout is wrong.

**Key Characteristics:**
- One oversized word per page, cut by the edge of the screen.
- Resume-style spec blocks: small label over a heavy value, split by hairlines.
- Navy ground, cream type, red used sparingly as a fill or mark.
- One typeface, MuseoModerno, in light, regular, and heavy.
- Square corners and flat fills everywhere.
- Asymmetric 12-column layouts that lean right or bleed off an edge.

## Colors

Navy and cream do almost all the work. Red shows up rarely, and never as text.

### Primary
- **Red** (`red`): the accent. Used as a full card or hero fill, a thick link underline, the big quote mark, and text selection. It marks things. It never carries words on navy.

### Neutral
- **Navy** (`navy`): the ground on every page, and the text color on cream fills.
- **Cream** (`cream`): all main text on navy, the active switch button, and the one solid call-to-action block.
- **Ink soft** (`ink-soft`): cream mixed 62% into navy. For secondary text: labels, summaries, the philosophy paragraphs. A weaker cream, not a new color.
- **Rule** (`rule`): cream mixed 22% into navy. Hairline dividers, borders, and image placeholders.
- **Navy lift** (`navy-lift`): cream mixed 9% into navy. A slightly lighter navy for one card fill so it reads as a block against the page.

The three mixed tones are defined in code with `color-mix()` from navy and cream. They're tints of the palette, not extra colors.

### Named Rules
**The Red Is Not Text Rule.** Red on navy is about 1.6:1 contrast, which is unreadable. Red is a fill, an underline, or a mark. Never a word on navy.

**The Two Plus One Rule.** Navy, cream, red. Any new color, even a "subtle" one, breaks the system. Lighter or darker versions come from mixing navy and cream.

## Typography

**Font:** MuseoModerno Variable (falls back to system-ui), self-hosted.

**Character:** A geometric sans with angled cuts on the `e` and a curved tail on the `t`. At heavy weight and huge size it's the identity. At small sizes it reads clean and a little warm.

### Hierarchy
- **Display** (850, 24vw on home, 31vw on the work index, 34–42vw on phones, line-height 0.7, tight tracking): the cropped word. One per page. Always runs past an edge.
- **Headline** (850, fluid 2.5–5.5rem, line-height 0.95): big page-level names, like the "next project" link.
- **Statement** (300 italic, same size as headline, line-height 1.02): the one italic line in the About section. Used once.
- **Title** (850, fluid 1.5–2.25rem, line-height 1.1): section headings and project names in the work list.
- **Title small** (850, 1.25rem): project names under home cards, quote text.
- **Body** (450, 1rem, line-height 1.5): paragraphs. Keep lines under about 46–52 characters.
- **Body small** (450 or 850, 0.875rem): nav, buttons, spec values, summaries.
- **Label** (450, 0.75rem, 0.02em tracking, tabular numbers, ink soft): dates, categories, index numbers, spec labels.

The scale has small steps for the spec text (12 / 14 / 16 / 20) and then jumps straight to display sizes. Nothing in between. That gap is the point.

### Named Rules
**The One Typeface Rule.** MuseoModerno only. Hierarchy comes from size and weight, never a second font.

**The Sentence Case Rule.** Headings are sentence case. No all-caps headings.

**The Big Jump Rule.** Type is either small and exact or huge and cropped. Don't fill the middle with medium-large headings.

## Layout

A 12-column grid with a fluid side gutter (1rem on phones up to 2.5rem). Content is placed in uneven spans on purpose: 7 + 5, 5 + 3 + 4, or one wide block starting at column 4 that bleeds off the right edge.

Spacing jumps in steps: `s-1` to `s-7` (0.25rem to 7rem). Tight steps (`s-1` to `s-3`) inside blocks. Big steps (`s-6`, `s-7`) between sections. Dense blocks, lots of air around them.

Page patterns:
- **Home:** full-screen hero. The surname is cropped at the top, a thin info strip sits under it, and a project switcher bar runs along the bottom. Work cards start inside the first screen.
- **Work index:** "Work" set huge and pushed off the right edge, then a spec-sheet table: number, thumbnail, title, discipline, year.
- **Project page:** the project title runs up the left edge as a rotated spine, cut by the screen edge, like the resume. Content sits in a column against it. Images mix widths, and the lead image bleeds right.

At 760px and below, grids collapse to one column, the spine turns into a cropped horizontal header, and display type gets bigger relative to the screen so the crop stays strong. At 1100px and below, the hero bar drops its role cell.

### Named Rules
**The Lean Rule.** Layouts lean to one side or bleed off an edge. Even margins on both sides is the thing to avoid.

## Elevation & Depth

Fully flat. There are no shadows, glows, or blur anywhere. Depth comes only from color blocks (a cream or red fill against navy) and hairline rules. The hero bar sits on top of the image as a solid navy block with a hairline border, not frosted glass.

### Named Rules
**The Flat Rule.** No `box-shadow`, no `backdrop-filter`, no gradients. If something needs to stand out, give it a solid fill.

## Shapes

Square corners everywhere, no exceptions: cards, buttons, tags, the switcher bar, image frames, swatches. Borders are 1px hairlines in `rule`. Crops happen with `overflow: hidden` on the container, so type and images get cut cleanly by the box edge.

## Components

Quiet and exact. Components stay out of the way so the work and the big type carry the page.

### Buttons
- **Call to action** ("View project"): solid cream block, navy heavy text, square corners. The arrow nudges right 0.25rem on hover. There's one per screen at most.
- **Switch buttons** (hero bar): text-only on navy in ink soft, split by hairlines. Hover brightens to cream. The selected one flips to a solid cream block with navy text. Each has a small square swatch of its project.
- **Focus:** 2px solid outline in the opposite color, set inside the button (-4px offset).

### Chips
- **Tag:** small label text in ink soft, 1px rule border, square corners. Shows a project's discipline. No hover state.

### Cards / Containers
- **Project card:** a flat fill (red, cream, or navy lift) with a number in the top-left and the project title set huge, running off the bottom-right edge. Under it, a meta line: name, tag, italic summary pushed to the right. Hover underlines the name in red.
- **Spec block:** label on top, heavy value under it, hairline above. Stacked in columns, like the resume's date column.
- **Corners:** square. **Shadow:** none. **Border:** none on fills; hairline on spec cells.

### Navigation
- Heavy body-small text in cream. Hover and current page get a thick red underline (0.18em, offset 0.22em). Inner pages have a plain top bar: name left, links right. The home page puts the nav inside the hero strip.

### Hero switcher bar (signature)
A solid navy bar inset by the gutter at the bottom of the full-screen hero. Left: project switch buttons. Middle: spec cells for the selected project (discipline, role, year). Right: the cream call-to-action block. The image runs to every edge around it.

## Do's and Don'ts

### Do:
- **Do** set one word per page too big for the frame and let an edge cut it.
- **Do** build spec info as label-over-value blocks with hairline rules.
- **Do** use red as a fill, a thick underline, or a single mark.
- **Do** place blocks in uneven column spans and let one bleed off an edge.
- **Do** flip text to navy when it sits on a cream fill.
- **Do** keep motion small and short (0.2–0.4s fades and nudges) and turn it off for reduced motion.

### Don't:
- **Don't** use red as text on navy.
- **Don't** add a fourth color, a second typeface, or all-caps headings.
- **Don't** use shadows, glows, gradients, blur, glass, or textures.
- **Don't** center a layout with even margins on both sides.
- **Don't** round corners. Not on buttons, tags, cards, or images.
- **Don't** add icon grids, decorative blobs, or stock imagery to fill space.
