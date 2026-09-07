import { useRef } from 'react';
import { useReveal, useTilt } from '../hooks/useAnimations';
import './Stays.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

const MAPS_URL =
  'https://www.google.com/maps/place/golden+eagle+jaipur/data=!4m2!3m1!1s0x396db4c0e33f76a3:0x262878d24c5bda50?sa=X&ved=1t:242&ictx=111';
const MAPS_EMBED = 'https://www.google.com/maps?q=Golden%20Eagle%20Jaipur&z=15&output=embed';

export default function Stays() {
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const { t } = useLang();

  const AMENITIES = ['stays.a1', 'stays.a2', 'stays.a3', 'stays.a4', 'stays.a5', 'stays.a6'];

  useReveal(infoRef, { style: 'from-left', start: 'top 80%' });
  useReveal(mapRef, { style: 'from-right', start: 'top 80%' });
  useTilt(infoRef, 5);

  return (
    <section className="stays" id="stays">
      <div className="stays-bg" />
      <span className="stays-deco left"><Mandala size={300} color="rgba(109,15,31,0.07)" /></span>
      <span className="stays-deco right"><Mandala size={220} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag">{t('stays.tag')}</p>
      <h2 className="section-title shimmer">{t('stays.title')}</h2>
      <p className="section-sub">
        {t('stays.sub')}
      </p>

      <div className="stays-grid">
        <div className="stays-card preserve-3d" ref={infoRef}>
          <span className="stays-badge">{t('stays.badge')}</span>

          <h3 className="stays-hotel">{t('stays.hotel')}</h3>
          <p className="stays-city">{t('stays.city')}</p>

          <p className="stays-desc">
            {t('stays.desc')}
          </p>

          <ul className="stays-amenities">
            {AMENITIES.map((a) => (
              <li key={a}>✦ {t(a)}</li>
            ))}
          </ul>

          <p className="stays-note">
            {t('stays.noteA')} <strong>"{t('invite.names')}"</strong> {t('stays.noteB')}
          </p>

          <a
            className="stays-cta"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('stays.open')}
            <span className="stays-cta-arrow">↗</span>
          </a>
        </div>

        <div className="stays-map-wrap preserve-3d" ref={mapRef}>
          <div className="stays-map-frame">
            <iframe
              title="Golden Eagle Jaipur map"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="stays-map-caption">
            {t('stays.hotel')} · {t('stays.city')}
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">{t('events.l.venue')} →</a>
          </p>
        </div>
      </div>
    </section>
  );
}