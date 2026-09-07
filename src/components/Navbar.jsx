import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useMusic from '../hooks/useMusic';
import './Navbar.css';

const LINKS = [
  { label: 'Couple', href: '#couple' },
  { label: 'Story', href: '#story' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Stays', href: '#stays' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const prevY = useRef(0);
  const { on: musicOn, toggle: toggleMusic } = useMusic();

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

  // close menu with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef} aria-label="Main navigation">
      <a className="navbar-brand" href="#top">
        <span className="brand-amp">A</span>
        <span className="brand-heart">❦</span>
        <span className="brand-amp">K</span>
      </a>

      <div className="navbar-actions">
        <button
          className="music-toggle"
          type="button"
          aria-pressed={musicOn}
          aria-label={musicOn ? 'Pause our song' : 'Tap to play our song'}
          title={musicOn ? 'Pause music' : 'Tap to play our song'}
          onClick={toggleMusic}
        >
          <span className="music-emoji">{musicOn ? '🔊' : '🔇'}</span>
        </button>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />

      <ul className={`nav-menu ${open ? 'open' : ''}`} id="site-menu">
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