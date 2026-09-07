import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * useReveal - applies ScrollTrigger-driven multi-style reveals to a ref'd element
 */
export function useReveal(ref, { style = 'fade', y = 60, delay = 0, start = 'top 85%' } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const base = { ease: 'power3.out', duration: 1.1, delay };

    let from = {};
    switch (style) {
      case 'flip':
        from = { opacity: 0, rotationY: -90, y };
        break;
      case 'zoom':
        from = { opacity: 0, scale: 0.8 };
        break;
      case 'from-left':
        from = { opacity: 0, x: -140, rotationY: 40 };
        break;
      case 'from-right':
        from = { opacity: 0, x: 140, rotationY: -40 };
        break;
      case 'blur':
        from = { opacity: 0, filter: 'blur(12px)', y };
        break;
      case 'fade':
      default:
        from = { opacity: 0, y };
    }

    const to = { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0 };
    if (from.filter) to.filter = 'blur(0px)';

    gsap.fromTo(el, from, {
      ...to,
      ...base,
      scrollTrigger: { trigger: el, start, once: true },
    });

    return () => {
      gsap.killTweensOf(el);
    };
  }, [ref, style, y, delay, start]);
}

/*
 * useTilt - 3D tilt following the mouse cursor
 */
export function useTilt(ref, strength = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * strength;
      const ry = (px - 0.5) * strength;
      el.style.transform = `perspective(${900}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04, 1.04, 1.04)`;
    };

    const onLeave = () => {
      gsap.to(el, {
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength]);
}

/*
 * useMagnetic - buttons that follow cursor with a magnetic pull
 */
export function useMagnetic(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.5,
        ease: 'power3.out',
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength]);
}

/*
 * useParallax - moves element on scroll
 */
export function useParallax(ref, distance = 120) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: distance,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, distance]);
}