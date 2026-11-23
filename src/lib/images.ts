// Project images live in src/assets/work/ so Astro can optimize them (AVIF/WebP, several widths).
// Data files keep simple paths like '/work/vita-lenta/cover.jpg'; this turns them into the
// imported image Astro needs. A typo fails the build instead of shipping a broken image.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/work/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export function workImage(path: string): ImageMetadata {
  const file = files[`/src/assets${path}`];
  if (!file) throw new Error(`Image not found: ${path} (expected in src/assets${path})`);
  return file.default;
}
