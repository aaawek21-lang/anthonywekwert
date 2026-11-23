// About line. Project names pop up their image on hover (React Bits Hover Preview).
// On touch, a tap just opens the project. Reduced motion: the image appears with no tilt or drift.
import { useReducedMotion } from 'motion/react';
import HoverPreview, { type HoverTarget } from '@/components/react-bits/hover-preview';

interface Props {
  content: string;
  targets: HoverTarget[];
}

export default function ProjectsLine({ content, targets }: Props) {
  const still = useReducedMotion();

  return (
    <HoverPreview
      content={content}
      targets={targets}
      imagePosition="above"
      imageWidth={240}
      imageHeight={300}
      imageBorderRadius="0"
      showImageShadow={false}
      maxRotation={still ? 0 : 4}
      maxOffset={still ? 0 : 10}
      enterSpeed={still ? 0 : 0.2}
      exitSpeed={still ? 0 : 0.15}
      targetPadding={2}
      className="projects-line"
    />
  );
}
