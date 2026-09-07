import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal, useTilt } from '../hooks/useAnimations';
import './Couple.css';
import Mandala from './Mandala';

gsap.registerPlugin(ScrollTrigger);

const gradient = (from, to) => `linear-gradient(160deg, ${from} 10%, ${to} 95%)`;

export default function Couple() {
  const rootRef = useRef(null);
  const akshayRef = useRef(null);
  const kirtiRef = useRef(null);
  const centerRef = useRef(null);

  useReveal(centerRef, { style: 'zoom' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D float for the cards
      gsap.utils.toArray('.couple-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -16 : -10,
          rotationX: i % 2 === 0 ? 4 : -4,
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useTilt(akshayRef, 8);
  useTilt(kirtiRef, 8);

  return (
    <section className="couple" id="couple" ref={rootRef}>
      <div className="couple-bg" />
      <span className="couple-deco deco-left"><Mandala size={320} color="rgba(109,15,31,0.08)" /></span>
      <span className="couple-deco deco-right"><Mandala size={260} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag">Our Beloved Couple</p>
      <h2 className="section-title shimmer">Two Souls, One Heart</h2>
      <div className="divider">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4c0 5-4 7-4 7s-4-2-4-7a4 4 0 0 1 4-4Zm7 10c0-3-1.5-4.5-3-4.5S13 8 13 11s1.5 4.5 3 4.5S19 14 19 11ZM5 11c0-3-1.5-4.5-3-4.5S1 8 1 11s1.5 4.5 3 4.5S5 14 5 11Zm14 6c0-2-1-3.5-2-3.5s-2 1.5-2 3.5 1 3.5 2 3.5 2-1.5 2-3.5Zm-14 0c0-2-1-3.5-2-3.5S1 15 1 17s1 3.5 2 3.5S5 19 5 17Zm7 5c0-2-1-3.5-2-3.5s-2 1.5-2 3.5S10 24 11 24s1-1 1-2Z"/></svg>
      </div>

      <div className="couple-grid">
        <div className="couple-side" ref={akshayRef}>
          <div className="couple-card">
            <div className="couple-card-inner">
              <div className="avatar" style={{ background: gradient('#7a1f33', '#4a0814') }}>
                <span role="img" aria-label="groom">🤵</span>
              </div>
              <h3 className="couple-name">Akshay Kumar</h3>
              <p className="couple-role">The Groom</p>
              <p className="couple-desc">
                The calm to her storm and the charm to her chaos. An engineer of hearts and systems alike — Akshay
                found his forever in the girl who laughed at his very first joke.
              </p>
              <ul className="couple-facts">
                <li>✦ Chocolate-loving chai connoisseur</li>
                <li>✦ Believes kindness is the strongest currency</li>
                <li>✦ Vows to hold Kirti’s hand through every horizon</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="couple-center" ref={centerRef}>
          <Mandala size={240} rotate={12} color="rgba(212,175,55,0.8)" />
          <div className="couple-heart">
            <span className="heart-emoji">❤️</span>
            <span className="since">since forever</span>
          </div>
        </div>

        <div className="couple-side" ref={kirtiRef}>
          <div className="couple-card">
            <div className="couple-card-inner">
              <div className="avatar" style={{ background: gradient('#b8860b', '#7a1f33') }}>
                <span role="img" aria-label="bride">👰</span>
              </div>
              <h3 className="couple-name">Kirti Katta</h3>
              <p className="couple-role">The Bride</p>
              <p className="couple-desc">
                The melody to his rhythm and the spark to his steady. A designer of dreams and moments — Kirti said yes
                to the boy who never forgot her birthday, even across timezones.
              </p>
              <ul className="couple-facts">
                <li>✦ Flower-obsessed monsoon soul</li>
                <li>✦ Can find beauty in the smallest detail</li>
                <li>✦ Promises Akshay a lifetime of home-made biryani</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}