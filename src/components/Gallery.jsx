import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const SHOTS = [
  { label: 'The Mehndi', emoji: '🖐️', grad: ['#e8f5e9', '#a5d6a7'], h: 300 },
  { label: 'The Haldi', emoji: '🌼', grad: ['#fff8e1', '#ffe082'], h: 380 },
  { label: 'The Mehendi Night', emoji: '🪔', grad: ['#fff3e0', '#ffcc80'], h: 250 },
  { label: 'The Sangeet', emoji: '🎶', grad: ['#fce4ec', '#f8bbd0'], h: 400 },
  { label: 'The Mandap', emoji: '🌸', grad: ['#f3e5f5', '#e1bee7'], h: 280 },
  { label: 'The Pheras', emoji: '❤️', grad: ['#ffebee', '#ffcdd2'], h: 340 },
  { label: 'The Reception', emoji: '🥂', grad: ['#fffde7', '#fff59d'], h: 300 },
  { label: 'Sasural ke Phool', emoji: '🌺', grad: ['#ede7f6', '#d1c4e9'], h: 360 },
];

export default function Gallery() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gallery-item').forEach((item) => {
        const img = item.querySelector('.gallery-visual');

        gsap.fromTo(
          img,
          { scale: 1.5, filter: 'brightness(1.4) saturate(0.4)' },
          {
            scale: 1.15,
            filter: 'brightness(1) saturate(1)',
            ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'top 20%', scrub: 1 },
          },
        );

        gsap.fromTo(
          item,
          { rotationY: 30, rotationX: 6, y: 80, opacity: 0, z: -60 },
          {
            rotationY: 0, rotationX: 0, y: 0, opacity: 1, z: 0,
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: { trigger: item, start: 'top 92%', once: true },
          },
        );

        item.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.22, duration: 0.8, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1.15, duration: 0.8, ease: 'power2.out' });
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery" id="gallery" ref={rootRef}>
      <div className="gallery-bg" />
      <p className="section-tag">Treasured Moments</p>
      <h2 className="section-title shimmer">A Glimpse of the Wonder</h2>
      <p className="section-sub">A peek at the colours, the chaos, and the love that will fill these four days.</p>

      <div className="gallery-grid perspective-1000">
        {SHOTS.map((shot, i) => (
          <figure
            key={i}
            className="gallery-item preserve-3d"
            style={{ height: `${shot.h}px` }}
          >
            <div
              className="gallery-visual"
              role="img"
              aria-label={`${shot.label} — wedding illustration`}
              style={{ background: `linear-gradient(150deg, ${shot.grad[0]}, ${shot.grad[1]})` }}
            >
              <span className="gallery-emoji" aria-hidden="true">{shot.emoji}</span>
            </div>
            <figcaption className="gallery-label">
              <span>{shot.label}</span>
              <span className="gallery-flower">❁</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}