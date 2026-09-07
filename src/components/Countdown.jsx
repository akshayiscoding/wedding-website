import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCountdown from '../hooks/useCountdown';
import { useReveal } from '../hooks/useAnimations';
import './Countdown.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

const WEDDING_DATE = '2026-11-20T19:00:00+05:30';

export default function Countdown() {
  const rootRef = useRef(null);
  const t = useCountdown(WEDDING_DATE);
  const prev = useRef(t);
  const { t: tr } = useLang();

  useReveal(rootRef, { style: 'zoom' });

  const UNITS = [
    { key: 'days', label: tr('count.days') },
    { key: 'hours', label: tr('count.hours') },
    { key: 'minutes', label: tr('count.minutes') },
    { key: 'seconds', label: tr('count.seconds') },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate the unit(s) whose value actually changed
      UNITS.forEach(({ key }) => {
        if (prev.current[key] === t[key]) return;
        const el = rootRef.current.querySelector(`[data-unit="${key}"]`);
        const digit = el?.querySelector('.cd-value');
        if (!el || !digit) return;

        // quick flip of the numeral
        gsap.fromTo(
          digit,
          { rotationX: -75, opacity: 0.2, y: -14 },
          {
            rotationX: 0, opacity: 1, y: 0,
            duration: 0.65,
            ease: 'power3.out',
            transformPerspective: 500,
          },
        );
        // soft golden pulse on the cell
        gsap.fromTo(
          el,
          { boxShadow: '0 18px 40px rgba(109,15,31,0.35), inset 0 0 30px rgba(212,175,55,0.12), 0 0 0 rgba(212,175,55,0)' },
          { boxShadow: '0 18px 40px rgba(109,15,31,0.35), inset 0 0 30px rgba(212,175,55,0.12), 0 0 34px rgba(212,175,55,0.55)', duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' },
        );
      });
      prev.current = t;
    }, rootRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <section className="countdown" id="countdown" ref={rootRef}>
      <span className="count-mandala left"><Mandala size={280} color="rgba(109,15,31,0.07)" /></span>
      <span className="count-mandala right"><Mandala size={220} color="rgba(212,175,55,0.15)" /></span>

      <p className="section-tag">{tr('count.tag')}</p>
      <h2 className="section-title shimmer">{tr('count.title')}</h2>
      <p className="section-sub">
        {tr('count.sub')}
      </p>

      <div className="cd-frame preserve-3d">
        <span className="cd-corner tl" />
        <span className="cd-corner tr" />
        <span className="cd-corner bl" />
        <span className="cd-corner br" />

        <div className="cd-boxes preserve-3d">
          {UNITS.map(({ key, label }) => {
            const value = String(t[key]).padStart(2, '0');
            return (
              <div className="cd-unit" key={key}>
                <div className="cd-cell" data-unit={key}>
                  <span className="cd-value">{value}</span>
                  <span className="cd-sheen" />
                </div>
                <span className="cd-label">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="cd-note">
          <span className="cd-note-om">॥ ॐ ॥</span>
          <span>{tr('count.note')}</span>
        </div>
      </div>
    </section>
  );
}