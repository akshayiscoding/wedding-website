import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Pheras.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

const TOTAL = 7;

export default function Pheras() {
  const [rounds, setRounds] = useState(0);
  const rootRef = useRef(null);
  const fireRef = useRef(null);
  const { t } = useLang();
  const done = rounds >= TOTAL;

  const ignite = (fromRect) => {
    for (let i = 0; i < 14; i++) {
      const e = document.createElement('span');
      e.className = 'ph-ember';
      const cx = fromRect.left + fromRect.width / 2;
      const cy = fromRect.top + fromRect.height / 2;
      const a = Math.random() * Math.PI * 2;
      const dist = 90 + Math.random() * 110;
      e.style.left = `${cx}px`;
      e.style.top = `${cy}px`;
      document.body.appendChild(e);
      gsap.to(e, {
        x: Math.cos(a) * dist,
        y: Math.sin(a) * dist - 30,
        opacity: 0,
        scale: 0.3,
        rotation: Math.random() * 240,
        duration: 1.1 + Math.random() * 0.6,
        ease: 'power2.out',
        onComplete: () => e.remove(),
      });
    }
  };

  const onNext = () => {
    if (done) {
      setRounds(0);
      return;
    }
    const next = rounds + 1;
    setRounds(next);
    const rect = fireRef.current?.getBoundingClientRect();
    if (rect) ignite(rect);
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.ph-flame', {
        scaleY: 1.12,
        scaleX: 0.94,
        y: -3,
        duration: 1.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.18, yoyo: true, repeat: -1 },
      });
      gsap.to('.ph-glow', {
        opacity: 0.75,
        scale: 1.08,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pheras preserve-3d" ref={rootRef}>
      <span className="pheras-mandala">
        <Mandala size={340} color="rgba(212,175,55,0.14)" />
      </span>

      <p className="pheras-tag">{t('pheras.tag')}</p>
      <h3 className="pheras-title">{t('pheras.title')}</h3>
      <p className="pheras-sub">{t('pheras.sub')}</p>

      <div className="pheras-stage" data-complete={done}>
        <div className="pheras-diya-ring">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className={`pheras-diya ${i < rounds ? 'lit' : ''}`}
              style={{ transform: `rotate(${(360 / TOTAL) * i}deg) translateY(-118px)` }}
              aria-hidden="true"
            >
              <i className="ph-diya-flame" />
              <i className="ph-diya-bowl" />
            </span>
          ))}
        </div>

        <div className="pheras-fire" role="img" aria-label={t('pheras.title')}>
          <span className="ph-glow" ref={fireRef} />
          <i className="ph-flame" />
          <i className="ph-flame" />
          <i className="ph-fire-bowl" />
        </div>
      </div>

      <p className="pheras-count" aria-live="polite">
        {done ? t('pheras.done') : t('pheras.count', { n: rounds })}
      </p>

      <button className="pheras-btn" type="button" onClick={onNext}>
        {done ? t('pheras.reset') : t('pheras.button')}
        <span className="pheras-btn-om">ॐ</span>
      </button>
    </div>
  );
}