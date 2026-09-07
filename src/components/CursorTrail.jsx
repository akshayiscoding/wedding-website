import { useEffect } from 'react';
import gsap from 'gsap';

export default function CursorTrail() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const host = document.createElement('div');
    host.className = 'cursor-trail-host';
    host.setAttribute('aria-hidden', 'true');
    document.body.appendChild(host);

    let last = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;

      const s = document.createElement('span');
      s.className = 'ct-spark';
      const size = 4 + Math.random() * 6;
      s.style.left = `${e.clientX + (Math.random() * 6 - 3)}px`;
      s.style.top = `${e.clientY + (Math.random() * 6 - 3)}px`;
      s.style.cssText += `;width:${size}px;height:${size}px;`;
      host.appendChild(s);

      gsap.fromTo(
        s,
        { opacity: 0.9, scale: 0.3, rotation: Math.random() * 60 },
        {
          opacity: 0,
          scale: 1.5,
          rotation: Math.random() * 140,
          y: -16,
          duration: 0.95,
          ease: 'power2.out',
          onComplete: () => s.remove(),
        },
      );

      if (host.childElementCount > 32) host.firstChild.remove();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      host.remove();
    };
  }, []);

  return null;
}