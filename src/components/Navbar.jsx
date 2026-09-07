import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const LINKS = [
  { label: 'Couple', href: '#couple' },
  { label: 'Story', href: '#story' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Stays', href: '#stays' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const prevY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      gsap.to(navRef.current, {
        y: y > prevY.current && y > 200 ? -110 : 0,
        duration: 0.5,
        ease: 'power2.out',
      });
      prevY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo('.nav-menu li', { opacity: 0, y: -18 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 });
    }
  }, [open]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <a className="navbar-brand" href="#top">
        <span className="brand-amp">A</span>
        <span className="brand-heart">❦</span>
        <span className="brand-amp">K</span>
      </a>

      <button
        className={`hamburger ${open ? 'open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>

      <div className={`mobile-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />

      <ul className={`nav-menu ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              <span className="nav-dot">◆</span>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#rsvp" className="nav-cta" onClick={() => setOpen(false)}>RSVP</a>
        </li>
      </ul>
    </nav>
  );
}