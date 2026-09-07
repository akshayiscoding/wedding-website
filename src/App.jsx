import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Couple from './components/Couple';
import LoveStory from './components/LoveStory';
import Countdown from './components/Countdown';
import BaraatMarquee from './components/BaraatMarquee';
import Events from './components/Events';
import DressCode from './components/DressCode';
import Gallery from './components/Gallery';
import Blessings from './components/Blessings';
import Stays from './components/Stays';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import ChapterRail from './components/ChapterRail';
import InvitationModal from './components/Invitation';
import { LanguageProvider } from './i18n';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    gsap.to('.app-fade', { opacity: 1, duration: 0.6, delay: 0.4 });
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      topRef.current?.classList.toggle('show', window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <LanguageProvider>
      <div id="top" className="app app-fade">
        <Navbar onInvite={() => setInviteOpen(true)} />
        <main>
          <Hero loaded={!loading} />
          <Couple />
          <LoveStory />
          <Countdown />
          <BaraatMarquee />
          <Events />
          <DressCode />
          <Gallery />
          <Blessings />
          <Stays />
          <Rsvp />
        </main>
        <Footer />

        <CursorTrail />
        <ChapterRail />

        <InvitationModal open={inviteOpen} onClose={() => setInviteOpen(false)} />

        <button
          className="back-top"
          ref={topRef}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </LanguageProvider>
  );
}