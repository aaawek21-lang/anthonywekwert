// Placeholder projects. Swap in real work later.
// Each entry gets a page at /work/<slug>.

export interface Project {
  slug: string;
  title: string;
  discipline: string;
  year: string;
  role: string;
  tools: string;
  summary: string;
  // Flat fill for the project card on the home page. Stays inside the palette.
  tone: 'red' | 'cream' | 'deep';
  // Full-bleed hero image. Put the file in /public/work/ and use '/work/name.jpg'.
  // Until there's an image, the hero shows the flat tone fill instead.
  image?: string;
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project one',
    discipline: 'Packaging',
    year: '2026',
    role: 'Placeholder role',
    tools: 'Placeholder tools',
    summary: 'One line on what this was and why it matters.',
    tone: 'red',
  },
  {
    slug: 'project-two',
    title: 'Project two',
    discipline: 'Campaign',
    year: '2026',
    role: 'Placeholder role',
    tools: 'Placeholder tools',
    summary: 'One line on what this was and why it matters.',
    tone: 'cream',
  },
  {
    slug: 'project-three',
    title: 'Project three',
    discipline: 'Identity',
    year: '2025',
    role: 'Placeholder role',
    tools: 'Placeholder tools',
    summary: 'One line on what this was and why it matters.',
    tone: 'deep',
  },
];
