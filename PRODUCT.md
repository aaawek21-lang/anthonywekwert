# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: creative directors, recruiters, and agency hiring managers looking at a student portfolio. They spend seconds, not minutes. They're deciding whether to open a project, save the resume, or reach out.

Secondary: people hiring for internships and freelance work.

## Product Purpose

Portfolio site for Anthony Wekwert, designer and art director. BA Creative Advertising at Michigan State, graduating May 2027.

The main goal is a full-time job starting after graduation. Internships and freelance are welcome too, but come second.

Success means a hiring person sees strong work fast and then does one of three things: emails him, downloads the resume, or opens his LinkedIn.

Replaces an older cargo.site build.

## Positioning

Designer / art director: both titles, on purpose, so neither agency nor in-house doors close. The work spans identity, packaging, campaign, and environmental/system design, and the site itself should prove he has his own visual system rather than a template.

## Operating Context

- Visitors usually arrive from a resume, LinkedIn, an application, or an Addy-related link.
- They scan the first screen, maybe open one or two projects, then leave or act.
- Content is edited by hand in `src/data/projects.ts` and the page files. One project = one entry = one page at `/work/<slug>`.

## Capabilities and Constraints

- Stack: Astro (TypeScript strict), static output.
- Font self-hosted via `@fontsource-variable/museomoderno`.
- Pages: home (`src/pages/index.astro`), work index, project template (`src/pages/work/[slug].astro`).
- Contact actions: email link, resume PDF download, LinkedIn link. No Instagram link for now.
- React is added (via `@astrojs/react`) only for three React Bits Pro components (Starter license): Stipple Type (home hero, WebGL via `three`), Hover Preview, and Scroll Mask. All three are edited to fit the system; in `src/components/react-bits/`. Install more with `npx shadcn@latest add @reactbits-starter/<name>-css`; the license key lives in `.env.local` (gitignored).
- Hosting and the domain are deliberately out of scope until he says the site is built.

## Brand Commitments

The site follows the system from his LinkedIn banner and Canva resume. CLAUDE.md holds the full spec. Binding points:

- Palette: navy `#071B2B`, cream `#E4E2DD`, deep red `#7A1E24`. Red is never text on navy (contrast too low); use it as a fill, underline, or mark.
- One typeface: MuseoModerno.
- Signature move: oversized type cropped by the frame edge.
- Flat, asymmetric, edge-weighted. No gradients, textures, shadows, glows, or centered-with-even-margins layouts.
- Guiding note: "less vibe coded."

Voice: plain and direct. Short sentences, simple words, no hype or marketing language.

## Evidence on Hand

Real:
- Projects, from the old Cargo site (anthonywekwert.com), in its order: Vita Lenta (spec beach brand concept; the coffee cups marked "VL", earlier noted as "ULM"), Twisted Toonz (spec hard seltzer packaging; Lemon Ace, Royal Peach, Cherry Bomb cans), Design Studies (coursework and side work: Lumina Transit map, ASP phoenix logo, Sanuk, rush and event flyers), Photography (freelance, Canon Rebel T7; leads with the Jeep, duplicate sunset cut). Titles, one-liners, context, and tools are his own words from those pages. Images in `src/assets/work/<slug>/`, pulled from the Cargo site. Astro builds AVIF/WebP at several widths from them; add new project images there (not in `public/`) and reference them as `/work/<slug>/<file>` in `src/data/projects.ts`.
- About content from the old About page plus the resume, in `src/data/site.ts`.
- Contact: email anthonywekwertcreative@gmail.com, LinkedIn /in/anthonywekwert, Instagram @_antwek, resume at `public/resume.pdf`.
- Silver and Bronze Addy (AAF, Feb 2026). Eagle Scout (Sept 2023). Dean's List Fall 2024 – Fall 2025.

Still missing. Do not invent these:
- Project years (left empty and hidden).
- Case-study writing for project pages (pages show the one-liner and images only).
- The headshot (`public/anthony.jpg`).
- Teammate quotes.

## Product Principles

1. Same hierarchy as the old site: name first, then what he is, then the work right away (it peeks in under the hero), then About and contact at the bottom.
2. Every page reads as his hand, the same system as the banner and resume.
3. Real over filler. A blank placeholder beats a made-up stat or quote.
4. One clear next step: email, resume, or LinkedIn.
