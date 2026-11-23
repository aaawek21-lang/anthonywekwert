// Opening hero, in the same order as the current site:
// "Hi, I am:" / Anthony Wekwert (biggest) / "I am a:" / rotating title / (pitch lives in the page).
// The name is React Bits Stipple Type (one WebGL canvas, stays put). Only the title rotates,
// as plain type with a short slide-up. Screen readers get static text from the page instead.
import { useEffect, useState } from 'react';
import StippleType from '@/components/react-bits/stipple-type';

const TITLES = ['Graphic Designer', 'Brand Designer', 'Visual Storyteller', 'Creative Problem-Solver'];
const HOLD = 2600;

export default function IntroType() {
  const [i, setI] = useState(0);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % TITLES.length), HOLD);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const read = () => setNarrow(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);

  return (
    <div className="intro-type" aria-hidden="true">
      <p className="intro-label">Hi, I am:</p>
      <div className="intro-ink">
        <StippleType
          text="Anthony Wekwert"
          fontFamily='"MuseoModerno Variable", system-ui, sans-serif'
          fontWeight={850}
          fontSize={narrow ? 120 : 240}
          letterSpacing={-0.03}
          lineHeight={0.95}
          baseColor="#E4E2DD"
          colors={['#7A1E24', '#909699']}
          bandSize={0.35}
          waviness={1}
          current={0.6}
          introDuration={1.3}
          quality={narrow ? 0.6 : 1}
        />
      </div>
      <p className="intro-label">I am a:</p>
      <p className="intro-title">
        <span key={i} className="intro-title-word">
          {TITLES[i]}
        </span>
      </p>
    </div>
  );
}
