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
- No React in the site. Any component library has to fit Astro without adding a framework unless he agrees.
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
- Silver and Bronze Addy (AAF, Feb 2026).
- Brand and Social Media Director, Alpha Sigma Phi MSU chapter.
- Work to feature (images not yet in the repo): ULM coffee packaging, Twisted Toons "Lemon Ace" can, Lumina Transit Network map, Alpha Sigma Phi phoenix logo, Crunchy's bar posters, Spotify "Everywhere's a Venue" 3-poster concept, Fall 2026 ASP recruitment video (35s vertical). Photography is weaker; if used, cut duplicate sunsets and lead with the Jeep.

Still placeholders. Do not invent these:
- The three entries in `src/data/projects.ts`, the hero intro line, the about stats, and the teammate quotes on the home page.
- Project images, the resume PDF, the email address and LinkedIn URL.

## Product Principles

1. The work shows up first. If a hiring person has to scroll or click to see a project, that's a failure.
2. Every page reads as his hand, the same system as the banner and resume.
3. Real over filler. A blank placeholder beats a made-up stat or quote.
4. One clear next step: email, resume, or LinkedIn.
