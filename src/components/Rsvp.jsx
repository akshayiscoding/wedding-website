import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useAnimations';
import useConfetti from '../hooks/useConfetti';
import './Rsvp.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Rsvp() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', guests: '1', attending: 'all', message: '' });
  const [sent, setSent] = useState(false);
  const { t } = useLang();
  const burst = useConfetti();

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
    burst(window.innerWidth / 2, window.innerHeight * 0.45);
  };

  const reset = () => {
    setSent(false);
    setForm({ name: '', email: '', guests: '1', attending: 'all', message: '' });
  };

  return (
    <section className="rsvp" id="rsvp" ref={rootRef}>
      <span className="rsvp-mandala"><Mandala size={300} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag light">{t('rsvp.tag')}</p>
      <h2 className="section-title light shimmer">{t('rsvp.title')}</h2>
      <p className="section-sub light-sub">{t('rsvp.sub')}</p>

      <div className="rsvp-card preserve-3d" ref={cardRef}>
        {sent ? (
          <div className="rsvp-thanks">
            <span className="thanks-emoji">🙏</span>
            <h3>{t('rsvp.thanks', { name: form.name || 'Friend' })}</h3>
            <p>{form.attending === 'none' ? t('rsvp.thanksOut') : t('rsvp.thanksIn')}</p>
            <button className="rsvp-btn" onClick={reset}>
              {t('rsvp.again')}
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
                <span>{t('rsvp.name')}</span>
                <input required autoComplete="name" name="name" value={form.name} onChange={handleChange} placeholder={t('rsvp.namePh')} />
              </label>
              <label className="rsvp-field">
                <span>{t('rsvp.email')}</span>
                <input required type="email" autoComplete="email" name="email" value={form.email} onChange={handleChange} placeholder={t('rsvp.emailPh')} />
              </label>
            </div>
            <div className="rsvp-row">
              <label className="rsvp-field">
                <span>{t('rsvp.guests')}</span>
                <input type="number" min="1" max="6" name="guests" value={form.guests} onChange={handleChange} />
              </label>
              <label className="rsvp-field">
                <span>{t('rsvp.events')}</span>
                <select required name="attending" value={form.attending} onChange={handleChange}>
                  <option value="all">{t('rsvp.o.all')}</option>
                  <option value="day1">{t('rsvp.o.day1')}</option>
                  <option value="day2">{t('rsvp.o.day2')}</option>
                  <option value="day3">{t('rsvp.o.day3')}</option>
                  <option value="day1+3">{t('rsvp.o.day13')}</option>
                  <option value="day2+3">{t('rsvp.o.day23')}</option>
                  <option value="none">{t('rsvp.o.none')}</option>
                </select>
              </label>
            </div>
            <label className="rsvp-field">
              <span>{t('rsvp.message')}</span>
              <textarea name="message" rows="3" value={form.message} onChange={handleChange} placeholder={t('rsvp.messagePh')} />
            </label>
            <button type="submit" className="rsvp-btn">{t('rsvp.send')}</button>
          </form>
        )}
      </div>
    </section>
  );
}