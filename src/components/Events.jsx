import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal, useTilt } from '../hooks/useAnimations';
import { googleCalendarUrl, downloadIcs } from '../utils/calendar';
import './Events.css';
import Mandala from './Mandala';
import Pheras from './Pheras';
import { useLang } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

const DAYS = [
  {
    key: 'day-1',
    dayKey: 'events.day1',
    titleKey: 'events.title1',
    date: '18 November 2026',
    calendarDate: '2026-11-18',
    startTime: '09:00',
    durationHours: 14,
    location: 'Golden Eagle · Garden, Jaipur',
    venueQuery: 'Golden Eagle Jaipur',
    icon: '🖐️',
    color: ['#3a7d44', '#1e5a28'],
    desc: 'Henna spirals, jingling kada, golden hour frames — and the first toast of the celebration.',
    schedule: [
      { timeKey: 'events.t.morning', labelKey: 'events.l.mehendi', emoji: '🖐️' },
      { timeKey: 'events.t.daytime', labelKey: 'events.l.photo', emoji: '📸' },
      { timeKey: 'events.t.night', labelKey: 'events.l.cocktail', emoji: '🍸' },
    ],
  },
  {
    key: 'day-2',
    dayKey: 'events.day2',
    titleKey: 'events.title2',
    date: '19 November 2026',
    calendarDate: '2026-11-19',
    startTime: '08:00',
    durationHours: 15,
    location: 'Golden Eagle · Lawns & Ballroom, Jaipur',
    venueQuery: 'Golden Eagle Jaipur',
    icon: '🌼',
    color: ['#e6a024', '#b8860b'],
    desc: 'Rituals of gold, red and bright turmeric — crowned by the ring, and a night of music.',
    schedule: [
      { timeKey: 'events.t.morning', labelKey: 'events.l.haldi', emoji: '🌼' },
      { timeKey: 'events.t.daytime', labelKey: 'events.l.tilak', emoji: '🌺' },
      { timeKey: 'events.t.evening', labelKey: 'events.l.engagement', emoji: '💍' },
      { timeKey: 'events.t.night', labelKey: 'events.l.sangeet', emoji: '🎶' },
    ],
  },
  {
    key: 'day-3',
    dayKey: 'events.day3',
    titleKey: 'events.title3',
    date: '20 November 2026',
    calendarDate: '2026-11-20',
    startTime: '17:00',
    durationHours: 6,
    location: 'Phool Mahal · Jaipur',
    venueQuery: 'Phool Mahal Jaipur',
    icon: '🪔',
    color: ['#8b1e3f', '#4a0814'],
    desc: 'The sacred fire, the garlands, and a promise made before the holy flames and heaven.',
    schedule: [
      { timeKey: 'events.t.evening', labelKey: 'events.l.baraat', emoji: '🐎' },
      { timeKey: 'events.t.dusk', labelKey: 'events.l.jaimala', emoji: '🌸' },
      { timeKey: 'events.t.night', labelKey: 'events.l.rituals', emoji: '🪔' },
      { timeKey: 'events.t.night', labelKey: 'events.l.pheras', emoji: '🔥' },
    ],
  },
];

export default function Events() {
  const rootRef = useRef(null);
  const cardsRef = useRef(null);
  const { t } = useLang();

  useReveal(cardsRef, { style: 'blur', start: 'top 80%' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.day-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotationY: 24 },
          {
            opacity: 1, y: 0, rotationY: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="events" id="events" ref={rootRef}>
      <div className="events-bg" />
      <span className="events-deco"><Mandala size={320} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag">{t('events.tag')}</p>
      <h2 className="section-title shimmer">{t('events.title')}</h2>
      <p className="section-sub">{t('events.sub')}</p>

      <div className="events-grid" ref={cardsRef}>
        {DAYS.map((day, i) => (
          <DayCard key={day.key} day={day} index={i} />
        ))}
      </div>

      <Pheras />
    </section>
  );
}

function DayCard({ day, index }) {
  const cardRef = useRef(null);
  const { t } = useLang();
  useTilt(cardRef, 10);

  const title = t(day.titleKey);
  const mapsQuery = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(day.venueQuery)}`;
  const cal = {
    uid: day.key,
    title: `Akshay & Kirti — ${title}`,
    date: day.calendarDate,
    startTime: day.startTime,
    durationHours: day.durationHours,
    location: day.location,
    details: `${title} (${day.date}). Celebrate with Akshay & Kirti!`,
  };

  return (
    <article
      ref={cardRef}
      className="day-card preserve-3d"
      style={{ '--ev1': day.color[0], '--ev2': day.color[1] }}
    >
      <div className="day-top">
        <span className="day-icon">{day.icon}</span>
      </div>
      <p className="day-label">{t(day.dayKey)}</p>
      <h3 className="day-name">{title}</h3>
      <p className="day-date">{day.date}</p>

      <a className="day-venue" href={mapsQuery} target="_blank" rel="noopener noreferrer">
        <span className="day-venue-pin">📍</span>
        <span className="day-venue-text">{day.location}</span>
        <span className="day-venue-go">{t('events.l.venue')} ↗</span>
      </a>

      <p className="day-desc">{day.desc}</p>

      <ul className="day-schedule">
        {day.schedule.map((item) => (
          <li className="day-item" key={item.labelKey}>
            <span className="day-item-emoji">{item.emoji}</span>
            <div className="day-item-body">
              <span className="day-item-time">{t(item.timeKey)}</span>
              <span className="day-item-label">{t(item.labelKey)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="day-actions">
        <a className="day-cal-btn" href={googleCalendarUrl(cal)} target="_blank" rel="noopener noreferrer">
          <span className="day-cal-icon">🗓</span> Google
        </a>
        <button type="button" className="day-cal-btn" onClick={() => downloadIcs(cal)}>
          <span className="day-cal-icon">📥</span> Apple / Outlook
        </button>
      </div>

      <div className="event-rings">
        <span />
        <span />
        <span />
      </div>
      <span className="event-index">0{index + 1}</span>
    </article>
  );
}