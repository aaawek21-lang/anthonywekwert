// Projects, taken from the current site (anthonywekwert.com): same four, same order,
// Anthony's own titles and lines. Images were pulled from that site into /public/work/<slug>/.
// Each entry gets a page at /work/<slug>.

export interface Shot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  // The line under the title on the old site, e.g. "Spec Beach Brand Concept".
  kind: string;
  // Short tag for cards and lists.
  discipline: string;
  summary: string;
  // Where it was made (school, freelance).
  context: string;
  tools: string;
  // Not listed on the old site. Leave empty until Anthony adds it; empty values are hidden.
  year: string;
  // Fill behind the image while it loads, and the card color. Stays inside the palette.
  tone: 'red' | 'cream' | 'deep';
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
    imageAlt: 'Vita Lenta coffee cups with line-art botanical marks',
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
    slug: 'design-studies',
    title: 'Design Studies',
    kind: 'Coursework and side work',
    discipline: 'Coursework',
    summary: "A look into things I've made over the past year.",
    context: 'Michigan State University',
    tools: '',
    year: '',
    tone: 'deep',
    image: '/work/design-studies/cover.jpg',
    imageAlt: 'Lumina Transit Network map with line legend',
    gallery: [
      { src: '/work/design-studies/asp-logo.jpg', alt: 'Alpha Sigma Phi MSU phoenix logo' },
      { src: '/work/design-studies/sanuk.jpg', alt: 'Sanuk poster' },
      { src: '/work/design-studies/fall-26-rush.jpg', alt: 'Alpha Sigma Phi fall 2026 rush graphic' },
      { src: '/work/design-studies/halloween-flyer.jpg', alt: 'Halloween event flyer' },
      { src: '/work/design-studies/artboard.jpg', alt: 'Design study artboard' },
    ],
  },
  {
    slug: 'photography',
    title: 'Photography',
    kind: 'Freelance work',
    discipline: 'Photography',
    summary: "A collage of moments I've gotten a chance to capture.",
    context: 'Freelance',
    tools: 'Canon Rebel T7',
    year: '',
    tone: 'red',
    // Leads with the Jeep, per Anthony's notes. Duplicate sunset cut.
    image: '/work/photography/img-2661.jpg',
    imageAlt: 'Red Jeep Wrangler at dusk',
    gallery: [
      { src: '/work/photography/img-2455.jpg', alt: 'Flamingos' },
      { src: '/work/photography/img-2406.jpg', alt: 'Red tulips' },
      { src: '/work/photography/img-2636.jpg', alt: 'Cherry blossoms' },
      { src: '/work/photography/img-3616.jpg', alt: 'Beach at dusk with birds' },
      { src: '/work/photography/img-3799.jpg', alt: 'Sunset over the ocean' },
      { src: '/work/photography/tiger.jpg', alt: 'Tiger lying in the grass' },
    ],
  },
];
