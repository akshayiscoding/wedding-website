import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Blessings.css';
import Mandala from './Mandala';
import { useReveal } from '../hooks/useAnimations';
import { useLang } from '../i18n';

const STORAGE_KEY = 'ak-blessings';

const SEEDS = [
  { name: 'Asha', city: 'Mumbai', wish: 'May your love bloom like a thousand marigolds 🌼' },
  { name: 'Rohit', city: 'Delhi', wish: 'Two families, one heart — shubh vivah!' },
  { name: 'Neha', city: 'London', wish: 'May the pheras bind you for seven lifetimes ✨' },
  { name: 'Arjun', city: 'Jaipur', wish: 'Har subah tum dono ki khushi ho 🪔' },
  { name: 'Priya', city: 'Bengaluru', wish: 'Wishing you endless laughter and the sweetest tea.' },
  { name: 'Vikram', city: 'Sydney', wish: 'From afar I send all my blessings and warmth ❦' },
  { name: 'Meera', city: 'Pune', wish: 'Saat phere, ek jeevan — congrats!' },
  { name: 'Kabir', city: 'Ahmedabad', wish: 'Love, health, and a shelf full of shared books 📚' },
];

function loadBlessings() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return stored.length ? stored : SEEDS;
}

export default function Blessings() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const { t } = useLang();
  const [items, setItems] = useState(() => loadBlessings());
  const [form, setForm] = useState({ name: '', city: '', wish: '' });

  useReveal(cardRef, { style: 'fade', start: 'top 80%' });

  useEffect(() => {
    gsap.utils.toArray('[data-blessing]').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          delay: Math.min(i * 0.05, 0.6),
          scrollTrigger: { trigger: cardRef.current, start: 'top 75%', once: true },
        },
      );
    });
  }, [items]);

  const persist = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
  };

  const addBlessing = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const wish = form.wish.trim();
    if (!name || !wish) return;
    const next = [
      { id: Date.now(), name, city: form.city.trim() || 'Guest', wish },
      ...items.filter((i) => i.id),
    ];
    persist(next);
    setForm({ name: '', city: '', wish: '' });
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section className="blessings" id="blessings" ref={rootRef}>
      <span className="bless-deco"><Mandala size={300} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag light">{t('bless.tag')}</p>
      <h2 className="section-title light shimmer">{t('bless.title')}</h2>
      <p className="section-sub light-sub">{t('bless.sub')}</p>

      <div className="bless-card preserve-3d" ref={cardRef}>
        <form className="bless-form" onSubmit={addBlessing}>
          <div className="bless-row">
            <label className="bless-field">
              <span>{t('bless.name')}</span>
              <input required autoComplete="name" name="name" value={form.name} onChange={onChange} />
            </label>
            <label className="bless-field">
              <span>{t('bless.city')}</span>
              <input autoComplete="address-level1" name="city" value={form.city} onChange={onChange} placeholder="Jaipur…" />
            </label>
          </div>
          <label className="bless-field">
            <span>{t('bless.wish')}</span>
            <textarea required rows="2" name="wish" value={form.wish} onChange={onChange} placeholder={t('bless.placeholder')} />
          </label>
          <button className="bless-btn" type="submit">
            {t('bless.submit')} · ✨
          </button>
        </form>

        <div className="bless-count" aria-live="polite">
          <span className="bless-count-num">{items.length}</span>
          <span>{t('bless.count')}</span>
        </div>

        <div className="bless-wall">
          {items.map((b) => (
            <figure className="bless-card-item" data-blessing key={b.id || `${b.name}-${b.wish}`}>
              <span className="bless-quote">“</span>
              <blockquote>{b.wish}</blockquote>
              <figcaption>
                <strong>{b.name}</strong>
                {b.city ? <em> · {b.city}</em> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}