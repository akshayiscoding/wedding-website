import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useAnimations';
import './Rsvp.css';
import Mandala from './Mandala';

gsap.registerPlugin(ScrollTrigger);

export default function Rsvp() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', guests: '1', attending: 'all', message: '' });
  const [sent, setSent] = useState(false);

  useReveal(cardRef, { style: 'flip', start: 'top 80%' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.rsvp-field').forEach((f, i) => {
        gsap.fromTo(
          f,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          { opacity: 1, x: 0, duration: 0.8, delay: i * 0.08, scrollTrigger: { trigger: cardRef.current, start: 'top 70%', once: true } },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // honeypot filled → silently drop (likely a bot)
    if (form.website) return;
    setSent(true);
  };

  return (
    <section className="rsvp" id="rsvp" ref={rootRef}>
      <span className="rsvp-mandala"><Mandala size={300} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag light">Will You Join Us?</p>
      <h2 className="section-title light">Kindly RSVP</h2>
      <p className="section-sub light-sub">Your presence is the greatest gift. Please respond by the 5th of November.</p>

      <div className="rsvp-card preserve-3d" ref={cardRef}>
        {sent ? (
          <div className="rsvp-thanks">
            <span className="thanks-emoji">🙏</span>
            <h3>Dhanyavaad, {form.name || 'Friend'}!</h3>
            <p>Your response {form.attending === 'none' ? 'has been received' : 'has been noted with joy'} — {form.attending === 'none' ? 'we will miss your presence dearly' : 'we cannot wait to celebrate with you'}.</p>
            <button className="rsvp-btn" onClick={() => { setSent(false); setForm({ name: '', email: '', guests: '1', attending: 'all', message: '' }); }}>
              Respond Again
            </button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            {/* honeypot field — hidden from humans, spam bots love it */}
            <div className="rsvp-honeypot" aria-hidden="true">
              <label htmlFor="rsvp-website">Leave this field empty</label>
              <input
                id="rsvp-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website || ''}
                onChange={handleChange}
              />
            </div>

            <div className="rsvp-row">
              <label className="rsvp-field">
                <span>Your Name *</span>
                <input required autoComplete="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rohan Verma" />
              </label>
              <label className="rsvp-field">
                <span>Email *</span>
                <input required type="email" autoComplete="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </label>
            </div>
            <div className="rsvp-row">
              <label className="rsvp-field">
                <span>Number of Guests</span>
                <input type="number" min="1" max="6" name="guests" value={form.guests} onChange={handleChange} />
              </label>
              <label className="rsvp-field">
                <span>Which events will you attend? *</span>
                <select required name="attending" value={form.attending} onChange={handleChange}>
                  <option value="all">All Three Days 🎉</option>
                  <option value="day1">Day 1 · Mehendi &amp; Cocktail</option>
                  <option value="day2">Day 2 · Haldi, Tilak &amp; Engagement</option>
                  <option value="day3">Day 3 · Wedding</option>
                  <option value="day1+3">Day 1 &amp; Day 3</option>
                  <option value="day2+3">Day 2 &amp; Day 3</option>
                  <option value="none">Sadly, I can’t make it 😢</option>
                </select>
              </label>
            </div>
            <label className="rsvp-field">
              <span>Message for the Couple</span>
              <textarea name="message" rows="3" value={form.message} onChange={handleChange} placeholder="Wishes, blessings, jokes — all welcome…" />
            </label>
            <button type="submit" className="rsvp-btn">Send Our Wishes ✨</button>
          </form>
        )}
      </div>
    </section>
  );
}