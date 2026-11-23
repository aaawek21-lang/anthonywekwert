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
  about-line:
    fontFamily: "MuseoModerno Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1rem + 2.6vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.015em"
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
- One oversized word per page, cut by the edge of the screen. On home that word is inked in marbled stipple type instead of set in CSS.
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
- **Cream** (`cream`): all main text on navy, cream card fills, and the one solid call-to-action block.
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
- **Display** (850, 31vw on the work index, 42vw on the work index on phones, line-height 0.7, tight tracking): the cropped word. One per page. Always runs past an edge, but the word must stay readable: the crop takes part of the last letter, not the whole thing.
- **Headline** (850, fluid 2.5–5.5rem, line-height 0.95): big page-level names, like the "next project" link.
- **About line** (300, fluid 1.75–3.5rem, line-height 1.15, max 30ch): the one light sentence on home. Project names inside it switch to heavy weight. Used once; it is the deliberate exception to the Big Jump Rule.
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
- **Home:** follows the hierarchy of the old Cargo site. Hero (a little shorter than the screen, so "Selected work" peeks in): "Hi, I am:" label, the name as the biggest thing in Stipple ink, "I am a:" label, a rotating title in heavy type (medium), then the one-line pitch (smallest). Navy bands top (nav) and bottom (Michigan State, Creative Advertising, May 2027; "Selected work"). Then work in the old site's order: Vita Lenta full-bleed as the pinned scroll reveal, then Twisted Toonz, Design Studies, Photography as image cards numbered 02–04. About at the bottom, translated from the old About page: the hover line and photo, then "Anthony is" (left) against Education / Experience / Achievements / Hobbies (right, resume-style with dates right-aligned). Footer: the email large, then Email, LinkedIn, Instagram, Resume.
- **Work index:** "Work" set huge and pushed off the right edge, then a spec-sheet table: number, thumbnail, title, discipline, year.
- **Project page:** the project title runs up the left edge as a rotated spine, cut by the screen edge, like the resume. Content sits in a column against it. Images mix widths, and the lead image bleeds right.

At 760px and below, grids collapse to one column (the home spec strip goes to two), the home landing drops its full-height frame, and the project spine turns into a cropped horizontal header.

### Named Rules
**The Lean Rule.** Layouts lean to one side or bleed off an edge. Even margins on both sides is the thing to avoid.

## Elevation & Depth

Flat everywhere except one place. There are no shadows, glows, or blur in the layout. Depth comes from color blocks (a cream or red fill against navy) and hairline rules. The exception is the home hero: the Stipple Type headline is a marbled, grainy ink texture rendered in WebGL. Anthony asked for it knowing it breaks the Flat Rule; it is the one sanctioned exception and stays inside the palette (cream body, red and ink-soft veins, navy behind).

### Named Rules
**The Flat Rule.** No `box-shadow`, no `backdrop-filter`, no gradients. If something needs to stand out, give it a solid fill. The home Stipple Type hero is the only exception.

## Shapes

Square corners everywhere, no exceptions: cards, buttons, tags, the spec strip, image frames, the headshot. Borders are 1px hairlines in `rule`. Crops happen with `overflow: hidden` on the container, so type and images get cut cleanly by the box edge.

## Components

Quiet and exact. Components stay out of the way so the work and the big type carry the page.

### Buttons
- **Call to action:** solid cream block, navy heavy text, square corners, an arrow that nudges right 0.25rem on hover. One per screen at most. (Not on any page right now; it was the old home hero's "View project" button.)
- **Focus:** 2px solid outline in the opposite color, set inside the button (-4px offset).

### Chips
- **Tag:** small label text in ink soft, 1px rule border, square corners. Shows a project's discipline. No hover state.

### Cards / Containers
- **Project card:** the project cover image, cropped to the card, on its tone fill while it loads. A number sits top-left on a small solid navy block so it reads on any photo. The image scales 3% on hover. Under it, a meta line: name, tag, italic summary pushed to the right. Hover underlines the name in red.
- **Spec block:** label on top, heavy value under it, hairline above. Stacked in columns, like the resume's date column.
- **Corners:** square. **Shadow:** none. **Border:** none on fills; hairline on spec cells.

### Navigation
- Heavy body-small text in cream. Hover and current page get a thick red underline (0.18em, offset 0.22em). Inner pages have a plain top bar: name left, links right. On home, the nav sits under the cropped name in ink soft at weight 600, brightening to cream on hover.

### Stipple hero (signature)
React Bits Stipple Type, edited, for the name only. One WebGL headline ("Anthony Wekwert") in MuseoModerno 850, cream base with red broad veins and ink-soft fine threads, slow current. Left-aligned (edited from centered), up to 92% of the frame width. The name ships first as real cream text, sized with Stipple's own layout math so it sits exactly where the ink draws; it fades out (0.9s) once the ink canvas mounts, and stays if WebGL2 is unavailable or JS is off. The ink stipples in once and stays. Visitors can stir the ink or tap to drop ink; vertical swipes still scroll. Under it, "I am a:" and a title that plays through once (Graphic Designer, Brand Designer, Visual Storyteller, Creative Problem-Solver; 2.6s each) and settles on Brand Designer; hovering the hero plays it again. Plain heavy type, fluid 2–4rem, each sliding up 0.6em in 0.45s. Labels are light, ink soft, title size. Screen readers get a static h1. Sizing: the hero is at least the screen height (minus a peek of the work) but may grow, and the ink box never drops below 9.5rem, so short screens keep the name dominant. The title is also capped at 7svh. The Stipple root is pinned to fill its box exactly (its built-in 240px minimum is overridden) so it never spills onto the label below. Phones: max 120px type, quality 0.6, ink box 50vw tall. Reduced motion: still print, no rotation (Brand Designer only).

### About line (Hover Preview)
React Bits Hover Preview, restyled. A light sentence where each project name is a real link in heavy weight with a `rule` underline that turns red on hover or focus. Hovering pops up the project image: square, no shadow, 1px `rule` outline, 240×300, tilting at most 4°. On touch, a tap opens the project. Reduced motion: the image appears with no tilt or drift.

### Lead project (Scroll Mask)
React Bits Scroll Mask, slats variant, restyled. The first project's frame is pinned full-bleed; as you scroll, its image slides together in 7 hard vertical strips. Square, no feathered edge, navy behind. The project name sits on a solid navy block bottom-left, cropped by the frame's bottom edge; the label sits on a small navy block top-left; one cream "View" block top-right. All visible from the start, readable on any photo. Reduced motion: a still frame, no pinning.

## Do's and Don'ts

### Do:
- **Do** set one word per page too big for the frame and let an edge cut it.
- **Do** build spec info as label-over-value blocks with hairline rules.
- **Do** use red as a fill, a thick underline, or a single mark.
- **Do** place blocks in uneven column spans and let one bleed off an edge.
- **Do** flip text to navy when it sits on a cream fill.
- **Do** keep motion small and short (0.2–0.4s fades and nudges) and turn it off for reduced motion. The lead project's scroll reveal is the one big motion moment on home.
- **Do** restyle every React Bits component to the system before shipping it: square corners, no shadow, palette colors, real links for anything clickable.

### Don't:
- **Don't** use red as text on navy.
- **Don't** add a fourth color, a second typeface, or all-caps headings.
- **Don't** use shadows, glows, gradients, blur, glass, or textures.
- **Don't** center a layout with even margins on both sides.
- **Don't** round corners. Not on buttons, tags, cards, or images.
- **Don't** add icon grids, decorative blobs, or stock imagery to fill space.
- **Don't** use React Bits backgrounds or type effects that glow, blur, or use gradients (Aurora, Aura Blob, Signal Type, Gradient Carousel). They break the Flat Rule. Stipple Type is allowed only as the home hero.
- **Don't** add a second WebGL effect. The Stipple Type hero is the one WebGL moment on the site.
