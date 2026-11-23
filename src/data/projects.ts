// Projects: three real projects and one catch-all (Design Studies, with the photography folded in).
// Titles, lines, context and tools are Anthony's own words from the old Cargo site.
// Images live in src/assets/work/<slug>/ (Astro optimizes them); paths here are written as /work/...
// Each entry gets a page at /work/<slug>.

export interface Shot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  // The line under the title on the old site, e.g. "Spec beach brand concept".
  kind: string;
  // Short tag for cards and lists.
  discipline: string;
  summary: string;
  // Where it was made (school, freelance).
  context: string;
  tools: string;
  // Not listed on the old site. Leave empty until Anthony adds it; empty values are hidden.
  year: string;
  // Fill behind the image while it loads. Stays inside the palette.
  tone: 'red' | 'cream' | 'deep';
  // Cover image. Empty string = no cover yet: pages show the title on a flat block instead.
  image: string;
  imageAlt: string;
  gallery: Shot[];
}

export const projects: Project[] = [
  {
    slug: 'vita-lenta',
    title: 'Vita Lenta',
    kind: 'Spec beach brand concept',
    discipline: 'Brand identity',
    summary: 'A rebellious return to the slow life. Because the most elegant statement is silence.',
    context: 'Michigan State University',
    tools: 'Illustrator, After Effects, Photoshop',
    year: '',
    tone: 'red',
    image: '/work/vita-lenta/cover.jpg',
    imageAlt: 'Vita Lenta coffee cups in dark red, black and cream with line-art botanical marks',
    gallery: [
      { src: '/work/vita-lenta/slide-14.jpg', alt: 'Vita Lenta brand slide' },
      { src: '/work/vita-lenta/slide-12.jpg', alt: 'Vita Lenta brand slide' },
      { src: '/work/vita-lenta/slide-15.jpg', alt: 'Vita Lenta brand slide' },
      { src: '/work/vita-lenta/slide-16.jpg', alt: 'Vita Lenta brand slide' },
    ],
  },
  {
    slug: 'twisted-toonz',
    title: 'Twisted Toonz',
    kind: 'Spec hard seltzer brand packaging',
    discipline: 'Packaging',
    summary: 'What happens when a hard seltzer gets sucked into a 1940s cartoon?',
    context: 'Michigan State University',
    tools: 'Illustrator, Photoshop',
    year: '',
    tone: 'cream',
    image: '/work/twisted-toonz/cover.jpg',
    imageAlt: 'Twisted Toonz Lemon Ace can with a splash',
    gallery: [
      { src: '/work/twisted-toonz/royal-peach.jpg', alt: 'Twisted Toonz Royal Peach can' },
      { src: '/work/twisted-toonz/cherry-bomb.jpg', alt: 'Twisted Toonz Cherry Bomb can' },
      { src: '/work/twisted-toonz/lineup.jpg', alt: 'Twisted Toonz can lineup' },
      { src: '/work/twisted-toonz/detail.jpg', alt: 'Twisted Toonz packaging detail' },
    ],
  },
  {
    slug: 'lumina',
    title: 'Lumina',
    kind: 'Transit network map',
    discipline: 'Wayfinding',
    summary: 'A transit map for the Lumina network: colored lines, stops and a legend that reads at a glance.',
    context: 'Michigan State University',
    tools: '',
    year: '',
    tone: 'deep',
    image: '/work/lumina/cover.jpg',
    imageAlt: 'Lumina Transit Network map with colored lines and a legend',
    gallery: [],
  },
  {
    slug: 'design-studies',
    title: 'Design Studies',
    kind: 'Coursework and side work',
    discipline: 'Coursework',
    summary: "A look into things I've made over the past year, plus photographs.",
    context: 'Michigan State University, freelance',
    tools: 'Canon Rebel T7 for the photographs',
    year: '',
    tone: 'deep',
    // Cover still to come (Anthony's choice); pages show the title on a flat block until then.
    image: '',
    imageAlt: '',
    gallery: [
      { src: '/work/design-studies/asp-logo.jpg', alt: 'Alpha Sigma Phi MSU phoenix logo' },
      { src: '/work/design-studies/sanuk.jpg', alt: 'Sanuk poster' },
      { src: '/work/design-studies/fall-26-rush.jpg', alt: 'Alpha Sigma Phi fall 2026 rush graphic' },
      { src: '/work/design-studies/halloween-flyer.jpg', alt: 'Halloween event flyer' },
      { src: '/work/photography/img-2661.jpg', alt: 'Red Jeep Wrangler at dusk' },
      { src: '/work/photography/img-2455.jpg', alt: 'Flamingos' },
      { src: '/work/photography/img-2406.jpg', alt: 'Red tulips' },
      { src: '/work/photography/img-2636.jpg', alt: 'Cherry blossoms' },
      { src: '/work/photography/img-3616.jpg', alt: 'Beach at dusk with birds' },
      { src: '/work/photography/img-3799.jpg', alt: 'Sunset over the ocean' },
      { src: '/work/photography/tiger.jpg', alt: 'Tiger lying in the grass' },
      { src: '/work/design-studies/artboard.jpg', alt: 'Design study artboard' },
    ],
  },
];
