// Lead project. Its image slides together in hard vertical strips as you scroll
// (React Bits Scroll Mask, slats variant): square, flat, no feathered edge.
// Reduced motion: a plain still frame, no pinned scroll.
import { useReducedMotion } from 'motion/react';
import ScrollMask from '@/components/react-bits/scroll-mask';
import './LeadProject.css';

interface Props {
  slug: string;
  title: string;
  discipline: string;
  image: string;
  imageAlt: string;
}

function Copy({ slug, title, discipline }: Pick<Props, 'slug' | 'title' | 'discipline'>) {
  return (
    <div className="lead-copy">
      <span className="lead-big" aria-hidden="true">
        {title}
      </span>
      <div className="lead-meta">
        <span className="label">01 · {discipline}</span>
        <a className="lead-go" href={`/work/${slug}`}>
          View {title}
        </a>
      </div>
    </div>
  );
}

export default function LeadProject(props: Props) {
  const still = useReducedMotion();

  if (still) {
    return (
      <div className="lead lead-still">
        <img src={props.image} alt={props.imageAlt} />
        <Copy {...props} />
      </div>
    );
  }

  return (
    <ScrollMask
      className="lead"
      variant="slats"
      src={props.image}
      alt={props.imageAlt}
      columns={7}
      stagger={0.5}
      scrollLength={1.1}
      settle={0.8}
      zoom={1.06}
      radius={0}
      background="var(--navy)"
      revealContent={false}
    >
      <Copy {...props} />
    </ScrollMask>
  );
}
