import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useAnimations';
import './Footer.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

const PHERAS = 7;

export default function Footer() {
  const rootRef = useRef(null);
  const diyaRef = useRef(null);
  const { t } = useLang();

  useReveal(rootRef, { style: 'fade' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flames = gsap.utils.toArray('.footer-diya-flame');
      gsap.fromTo(
        flames,
        { opacity: 0, scaleY: 0.2, scaleX: 1.2 },
        {
          opacity: 1, scaleY: 1, scaleX: 1,
          duration: 0.7,
          stagger: 0.22,
          scrollTrigger: { trigger: diyaRef.current, start: 'top 85%', once: true },
          onComplete: () => {
            gsap.to(flames, {
              scaleY: 1.15,
              scaleX: 0.9,
              y: -1,
              duration: 1.1,
              yoyo: true,
              repeat: -1,
              stagger: 0.3,
              ease: 'sine.inOut',
            });
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={rootRef}>
      <div className="footer-inner">
        <Mandala size={130} color="rgba(240,215,140,0.5)" />

        <p className="footer-script">{t('footer.made')}</p>
        <h2 className="footer-names">{t('invite.names')}</h2>
        <p className="footer-date">{t('footer.date')}</p>

        <div className="footer-diyas" ref={diyaRef} aria-label={t('footer.diyas')}>
          {Array.from({ length: PHERAS }).map((_, i) => (
            <span className="footer-diya" key={i} aria-hidden="true">
              <i className="footer-diya-flame" />
              <i className="footer-diya-bowl" />
            </span>
          ))}
        </div>
        <p className="footer-diyas-note">{t('footer.diyas')}</p>

        <div className="footer-links">
          <a href="#couple">{t('nav.couple')}</a>
          <span>·</span>
          <a href="#story">{t('nav.story')}</a>
          <span>·</span>
          <a href="#events">{t('nav.events')}</a>
          <span>·</span>
          <a href="#gallery">{t('nav.gallery')}</a>
          <span>·</span>
          <a href="#stays">{t('nav.stays')}</a>
          <span>·</span>
          <a href="#rsvp">{t('nav.rsvp')}</a>
        </div>

        <p className="footer-note">{t('footer.quote')}</p>

        <p className="footer-copy">{t('footer.copy')}</p>
      </div>
    </footer>
  );
}