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
  },
  {
    slug: 'project-two',
    title: 'Project two',
    discipline: 'Campaign',
    year: '2026',
    role: 'Placeholder role',
    tools: 'Placeholder tools',
    summary: 'One line on what this was and why it matters.',
  },
  {
    slug: 'project-three',
    title: 'Project three',
    discipline: 'Identity',
    year: '2025',
    role: 'Placeholder role',
    tools: 'Placeholder tools',
    summary: 'One line on what this was and why it matters.',
  },
  {
    slug: 'project-four',
    title: 'Project four',
    discipline: 'Wayfinding',
    year: '2025',
    role: 'Placeholder role',
    tools: 'Placeholder tools',
    summary: 'One line on what this was and why it matters.',
  },
];
