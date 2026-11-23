// One <img> with a WebP srcset at the given widths (Astro's image pipeline). Used by every page
// built on the Kit layout, since the kit's CSS styles plain <img> children, not <picture>.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export async function pic(meta: ImageMetadata, widths: number[]) {
  const sizes = widths.filter((w) => w <= meta.width);
  if (!sizes.length) sizes.push(meta.width);
  const out = await Promise.all(sizes.map((w) => getImage({ src: meta, width: w, format: 'webp', quality: 80 })));
  return {
    src: out[out.length - 1].src,
    srcset: out.map((o, i) => `${o.src} ${sizes[i]}w`).join(', '),
    width: meta.width,
    height: meta.height,
  };
}
