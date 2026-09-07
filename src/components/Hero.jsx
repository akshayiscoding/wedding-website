import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

const ICONS = ['🪔', '🌸', '🕊️', '❀', '🪷', '✨', '🌸', '🪔'];

export default function Hero({ loaded = true }) {
  const rootRef = useRef(null);
  const medallionRef = useRef(null);
  const textRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const textEl = textRef.current;
    const medallionEl = medallionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: loaded ? 0 : 1.6 });

      tl.fromTo(
        medallionEl,
        { opacity: 0, scale: 0.5, rotationY: 180, rotateX: 25, y: 40 },
        {
          opacity: 1, scale: 1, rotationY: 0, rotateX: 0, y: 0,
          duration: 1.5, ease: 'power3.out',
        },
        0.1,
      )
        .fromTo(
          '.hero-blessing',
          { opacity: 0, y: 14, letterSpacing: '0.6em' },
          { opacity: 1, y: 0, letterSpacing: '0.2em', duration: 0.9 },
          1.0,
        )
        .fromTo(
          '.hero-script',
          { opacity: 0, scale: 0.75, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out' },
          1.3,
        )
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 70, rotationX: -40 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1.3, stagger: 0.22, ease: 'power3.out' },
          1.5,
        )
        .fromTo(
          '.hero-glyph',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2.5)' },
          1.9,
        )
        .fromTo(
          '.hero-pill',
          { opacity: 0, y: 24, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(2)' },
          2.1,
        )
        .fromTo(
          '.hero-date',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          2.3,
        )
        .fromTo(
          '.cta-btn',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          2.4,
        );

      // --- sustained motions ---
      gsap.to('.ring-spin', {
        rotation: 360, transformOrigin: 'center center', duration: 32, repeat: -1, ease: 'none',
      });
      gsap.to('.ring-spin-reverse', {
        rotation: -360, transformOrigin: 'center center', duration: 48, repeat: -1, ease: 'none',
      });
      gsap.to('.circ-text', {
        rotation: 360, transformOrigin: 'center center', duration: 26, repeat: -1, ease: 'none',
      });
      gsap.to('.medallion-core', {
        rotation: 0.01,
        y: -8,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to('.mc-heart', { scale: 1.25, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      gsap.utils.toArray('.orb').forEach((orb, i) => {
        gsap.to(orb, {
          x: 'random(-20, 20)',
          y: 'random(-25, 25)',
          duration: 'random(3, 6)',
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      gsap.utils.toArray('.bokeh').forEach((b, i) => {
        gsap.to(b, {
          x: 'random(-30, 30)',
          y: 'random(-30, 30)',
          scale: 'random(0.9, 1.3)',
          duration: 'random(6, 12)',
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.4,
        });
      });

      gsap.utils.toArray('.paring').forEach((p) => {
        gsap.fromTo(
          p,
          { y: '110vh', rotation: 'random(-35, 35)' },
          {
            y: '-110vh',
            rotation: 'random(-35, 35)',
            duration: 'random(14, 26)',
            repeat: -1,
            ease: 'none',
            delay: 'random(0, 10)',
          },
        );
      });

      // hero fades out as you scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -140,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      });

      if (textEl) {
        textEl.addEventListener('mousemove', onMove);
        textEl.addEventListener('mouseleave', onLeave);
      }
    }, rootRef);

    return () => {
      ctx.revert();
      textEl?.removeEventListener('mousemove', onMove);
      textEl?.removeEventListener('mouseleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  function onMove(e) {
    const { innerWidth, innerHeight } = window;
    const rx = ((e.clientY / innerHeight) - 0.5) * 10;
    const ry = ((e.clientX / innerWidth) - 0.5) * 10;
    gsap.to(textRef.current, {
      rotationX: -rx,
      rotationY: ry,
      duration: 0.8,
      ease: 'power2.out',
      transformPerspective: 1200,
    });
  }

  function onLeave() {
    gsap.to(textRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.6)',
    });
  }

  return (
    <section className="hero" ref={rootRef}>
      <div className="hero-bg-glow" />
      <div className="hero-bokeh">
        {[14, 22, 9, 17, 26, 12, 20, 10].map((s, i) => (
          <span
            key={i}
            className="bokeh"
            style={{
              left: `${6 + i * 13}%`,
              top: `${12 + ((i * 29) % 70)}%`,
              width: `${s}px`,
              height: `${s}px`,
            }}
          />
        ))}
      </div>

      {/* background rings */}
      <div className="ring-stage">
        <div className="ring-spin"><Mandala size={470} color="rgba(212,175,55,0.28)" /></div>
        <div className="ring-spin-reverse"><Mandala size={330} color="rgba(109,15,31,0.28)" /></div>
        <div className="hero-orbits preserve-3d">
          {ICONS.map((icon, i) => {
            const angle = (i / ICONS.length) * 360;
            return (
              <div
                key={i}
                className="orbit-icon"
                style={{ transform: `rotate(${angle}deg) translateX(238px) rotate(-${angle}deg)` }}
              >
                <span>{icon}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="romantic-layer">
        <div className="romantic-petals">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="paring" style={{ left: `${(i / 18) * 100}%` }}>🌸</span>
          ))}
        </div>
        <div className="hero-stars">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }} />
          ))}
        </div>
        <div className="hero-orbs">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="orb"
              style={{
                left: `${((i * 37) % 100)}%`,
                top: `${((i * 53) % 100)}%`,
                width: `${14 + (i % 4) * 9}px`,
                height: `${14 + (i % 4) * 9}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-diyas" aria-hidden="true">
        <Diya className="diya-left" />
        <Diya className="diya-right" />
      </div>

      <div className="hero-content perspective-1200" ref={textRef}>
        <div className="hero-medallion preserve-3d" ref={medallionRef}>
          <CircularText />
          <div className="medallion-core preserve-3d">
            <span className="mc-om">ॐ</span>
            <div className="mc-letters">
              <span className="mc-a">A</span>
              <span className="mc-heart">❦</span>
              <span className="mc-k">K</span>
            </div>
            <span className="mc-tag">{t('hero.tag')}</span>
          </div>
        </div>

        <p className="hero-blessing">{t('hero.blessing')}</p>

        <h1 className="hero-names">
          <span className="hero-script">{t('hero.theWeddingOf')}</span>
          <span className="hero-name-row">
            <span className="hero-name">Akshay</span>
            <span className="hero-glyph">✦</span>
            <span className="hero-name">Kirti</span>
          </span>
        </h1>

        <span className="hero-pill">{t('hero.pill')}</span>

        <p className="hero-date">{t('hero.date')}</p>

        <a href="#couple" className="cta-btn">
          <span>{t('hero.begin')}</span>
          <span className="cta-arrow">↓</span>
        </a>
      </div>
    </section>
  );
}

function Diya({ className }) {
  return (
    <div className={`diya ${className}`}>
      <div className="diya-glass" />
      <div className="diya-flame" />
      <div className="diya-bowl">
        <span className="diya-lip" />
      </div>
    </div>
  );
}

function CircularText() {
  return (
    <svg className="circ-text" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <path id="circ-path" d="M 120 120 m -106 0 a 106 106 0 1,1 212 0 a 106 106 0 1,1 -212 0" fill="none" />
      </defs>
      <text className="circ-text-path">
        <textPath href="#circ-path">
          AKSHAY ✦ SHUBH VIVAH ✦ KIRTI ✦ 20 · 11 · 2026 ✦
        </textPath>
      </text>
    </svg>
  );
}