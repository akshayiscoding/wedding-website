import { useRef } from 'react';
import { useReveal } from '../hooks/useAnimations';
import './DressCode.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

const DRESSES = [
  {
    eventKey: 'dress.m',
    colorKey: 'dress.green',
    icon: '🖐️',
    colors: ['#8fcf76', '#2f9e4f', '#14532d'],
    band: 'linear-gradient(135deg, #8fcf76 0%, #2f9e4f 60%, #14532d 100%)',
  },
  {
    eventKey: 'dress.h',
    colorKey: 'dress.yellow',
    icon: '🌼',
    colors: ['#ffe27a', '#f6c417', '#b8860b'],
    band: 'linear-gradient(135deg, #ffe27a 0%, #f6c417 60%, #b8860b 100%)',
  },
  {
    eventKey: 'dress.e',
    colorKey: 'dress.redblack',
    icon: '💃',
    colors: ['#ef4450', '#7f1d1d', '#171717'],
    band: 'linear-gradient(135deg, #ef4450 0%, #7f1d1d 45%, #171717 100%)',
  },
  {
    eventKey: 'dress.w',
    colorKey: 'dress.beige',
    icon: '🪔',
    colors: ['#f3ead7', '#d8c39c', '#a98b5f'],
    band: 'linear-gradient(135deg, #f3ead7 0%, #d8c39c 65%, #a98b5f 100%)',
  },
];

export default function DressCode() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const { t } = useLang();

  useReveal(gridRef, { style: 'blur', start: 'top 80%' });

  return (
    <section className="dress" id="dress" ref={rootRef}>
      <div className="dress-bg" />
      <span className="dress-deco"><Mandala size={340} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag">{t('dress.tag')}</p>
      <h2 className="section-title shimmer">{t('dress.title')}</h2>
      <p className="section-sub">{t('dress.sub')}</p>

      <div className="dress-grid" ref={gridRef}>
        {DRESSES.map((d) => (
          <article className="dress-card" key={d.eventKey} style={{ '--band': d.band }}>
            <div className="dress-band">
              <span className="dress-band-icon" role="img" aria-hidden="true">{d.icon}</span>
            </div>
            <div className="dress-body">
              <p className="dress-ev">{t(d.eventKey)}</p>
              <h3 className="dress-wear">{t(d.colorKey)}</h3>
              <div className="dress-dots" aria-hidden="true">
                {d.colors.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}