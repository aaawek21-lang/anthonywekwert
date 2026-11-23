# anthonywekwert.com

Personal portfolio site for Anthony Wekwert. Replaces an older cargo.site build.

## Who this is for

Anthony Wekwert — brand designer, BA Creative Advertising at Michigan State, graduating May 2027. Silver and Bronze Addy winner (AAF, Feb 2026). Brand and Social Media Director for the Alpha Sigma Phi MSU chapter. DJs at Harper's Brew and Pub in East Lansing.

Audience for the site: creative directors, recruiters, and agency hiring managers. They spend seconds, not minutes. The work has to be visible fast.

## Stack

- **Astro** (Empty template, TypeScript strict)
- **GitHub**: `aaawek21-lang/anthonywekwert`
- **Cloudflare Workers** with static assets (not Pages — Cloudflare routes new static sites through Workers now; search their docs for "Workers Static Assets")
- Deploy loop: edit → `git add -A` → `git commit -m "..."` → `git push` → Cloudflare rebuilds automatically

## Domain

`anthonywekwert.com` is registered through eNom (Cargo's reseller), expires 2027-04-27, currently on Cargo's nameservers (ns1/ns2.cargo.site). Not yet pointed at this site. Moving it requires Cargo support to release the nameservers or provide an EPP code. Do not touch the domain until the site is worth showing, and do not cancel Cargo until the domain resolves to the new site.

## Design direction

The guiding note is **"less vibe coded."** Strip the tells of generated design: gradient-on-dark hero sections, glassmorphism, centered everything, stock textures, decorative blobs, three-column feature grids with icons.

Aim instead for **editorial and disciplined** — spec-sheet layouts, strong typographic hierarchy, generous whitespace, asymmetry used on purpose, content doing the work rather than ornament.

Rules of thumb:
- Type carries the page. If a layout needs a texture or gradient to hold together, the layout is wrong.
- Two colors plus a neutral. No more.
- Flat fills. No drop shadows, no glows.
- Sentence case. No ALL CAPS headings unless the typeface is doing something specific with it.
- Crop and bleed are allowed and encouraged. Centered-with-even-margins is the default to avoid.

## Palette

Taken from his current LinkedIn banner, which he built and likes:

- Navy (background): `#071B2B`
- Cream (text / light ground): `#E4E2DD`
- Deep red (accent): `#7A1E24`

## Typography

He likes **MuseoModerno** — geometric sans with angled terminals on the `e` and a curved `t` tail. It's a Google Font (SIL OFL), free to use and self-host.

Other faces he's open to for display: Degular Display, Obviously, Neue Haas Grotesk Display.

Avoid: Helvetica, Poppins, Montserrat, anything that reads as a default.

## Existing design system (follow this)

Two pieces he already built and likes. The site should read as the same hand. Treat them as the reference, not as things to reinvent.

### LinkedIn banner

Navy ground, cream type. His surname set oversized in a heavy geometric sans, scaled so the letterforms are cut off by the top and right edges of the frame. Baseline raised to leave a clear strip across the bottom, with `anthonywekwert.com` small and light in the bottom-right corner, right edge aligned to the cropped type above it.

The principle that made it work: **the type is too big for its container, on purpose.** The crop creates the tension. The version where the full word sat centered with even margins was dead, and scaling up plus cropping is what fixed it.

### Resume (Canva)

Same navy and cream. Full name set very large, rotated, running up the left edge of the page as a vertical spine. Content in a right-hand column against it.

- Section headings: lowercase in the source, rendered uppercase, ~23px bold
- Company name bold ~13px, role line beneath it ~10px, description ~10px
- Dates in a right-aligned column, baseline-aligned to each company name
- Lower half splits into two columns: skills left, education right

### The system both share

- **Palette:** navy `#071B2B` ground, cream `#E4E2DD` type, deep red `#7A1E24` accent. Two colors plus one accent, nothing else.
- **Type does the work.** One geometric sans, two or three weights. No second typeface.
- **Oversized type cropped by the frame edge** is the signature move. Use it on the site.
- **Asymmetric and right- or edge-weighted.** Avoid centered layouts with even margins — that's the thing he keeps having to fix.
- **Flat.** No textures, gradients, drop shadows, or glows. An earlier banner used a stock torn-paper texture and the whole point of the rework was getting rid of it.
- **Dense blocks against open space.** Content packed tight, surrounded by air, rather than evenly distributed.

## Work to feature

From his existing portfolio:
- **ULM** — coffee cup packaging, line-art botanical marks on dark red / black / cream cups
- **Twisted Toons "Lemon Ace"** — beverage can design, retro cartoon mascot
- **Lumina Transit Network** — transit map system, multi-line diagram with legend
- Photography (flamingo, tulips, beach at dusk, cherry blossoms, Jeep, tiger) — weaker than the design work; if included, cut the duplicate sunsets and lead with the Jeep

From other projects:
- **Alpha Sigma Phi MSU chapter logo** — phoenix lock-up, Instagram avatar icon
- **Crunchy's** (East Lansing bar) campaign posters
- **Spotify "Everywhere's a Venue"** — 3-poster brand campaign concept
- Fall 2026 ASP recruitment video — 35s vertical cut

## How to work with Anthony

**Writing:** Plain and natural. Short sentences, simple words, conversational. Starting with "and" or "but" is fine. High school reading level. No filler, no hype, no marketing language, no AI-giveaway phrases. Direct and concise.

**Drafts:** He wants short starting points to revise, not finished pieces.

**Design feedback:** Give clear, specific, honest critique that pushes him to be a better designer. Not polish notes. If something is derivative, stock, or undersells him, say so and say why. He asked for this directly.

**CLI:** He has Homebrew, Node v26, npm 11, git 2.50, and the GitHub CLI installed and authenticated. He's a relative beginner with the terminal and benefits from plain-language explanations of command output — but he's learning fast and wants to.
