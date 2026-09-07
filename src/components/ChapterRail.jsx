import { useEffect, useRef } from 'react';
import './ChapterRail.css';
import { useLang } from '../i18n';

const SECTIONS = [
  { id: '#couple', key: 'nav.couple' },
  { id: '#story', key: 'nav.story' },
  { id: '#events', key: 'nav.events' },
  { id: '#dress', key: 'nav.dress' },
  { id: '#gallery', key: 'nav.gallery' },
  { id: '#blessings', key: 'nav.blessings' },
  { id: '#stays', key: 'nav.stays' },
  { id: '#rsvp', key: 'nav.rsvp' },
];

export default function ChapterRail() {
  const railRef = useRef(null);
  const barRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const dots = rail.querySelectorAll('.rail-dot');
    const onScroll = () => {
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const max = doc.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.height = `${Math.round(p * 100)}%`;

      const mid = window.scrollY + vh * 0.45;
      let activeIdx = 0;
      dots.forEach((dot, i) => {
        const target = document.querySelector(SECTIONS[i].id);
        if (!target) return;
        const r = target.getBoundingClientRect();
        const absTop = r.top + window.scrollY;
        if (absTop <= mid) activeIdx = i;
      });
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="chapter-rail" ref={railRef} aria-label="Section progress">
      <div className="rail-track">
        <span className="rail-bar" ref={barRef} />
        {SECTIONS.map((s) => (
          <a key={s.id} href={s.id} className="rail-dot" tabIndex={-1}>
            <span className="rail-dot-mark" />
            <span className="rail-label">{t(s.key)}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}