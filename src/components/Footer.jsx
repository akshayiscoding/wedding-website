import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useAnimations';
import './Footer.css';
import Mandala from './Mandala';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const rootRef = useRef(null);
  useReveal(rootRef, { style: 'fade' });

  return (
    <footer className="footer" ref={rootRef}>
      <div className="footer-inner">
        <Mandala size={130} color="rgba(240,215,140,0.5)" />

        <p className="footer-script">Made with love &amp; a little magic</p>
        <h2 className="footer-names">Akshay ❦ Kirti</h2>
        <p className="footer-date">20 · 11 · 2026 — Jaipur</p>

        <div className="footer-links">
          <a href="#couple">Couple</a>
          <span>·</span>
          <a href="#story">Story</a>
          <span>·</span>
          <a href="#events">Events</a>
          <span>·</span>
          <a href="#gallery">Gallery</a>
          <span>·</span>
          <a href="#stays">Stays</a>
          <span>·</span>
          <a href="#rsvp">RSVP</a>
        </div>

        <p className="footer-note">
          “Two souls remain entangled in this life, as if no force on earth can part them.”
        </p>

        <p className="footer-copy">© 2026 Akshay &amp; Kirti · Shubh Vivah 🪔</p>
      </div>
    </footer>
  );
}