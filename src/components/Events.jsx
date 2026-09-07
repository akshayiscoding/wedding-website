import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal, useTilt } from '../hooks/useAnimations';
import './Events.css';
import Mandala from './Mandala';

gsap.registerPlugin(ScrollTrigger);

const DAYS = [
  {
    day: 'Day One',
    title: 'Mehendi & Cocktail',
    hindi: 'मेहंदी और कॉकटेल',
    date: '18 November 2026',
    icon: '🖐️',
    color: ['#3a7d44', '#1e5a28'],
    desc: 'Henna spirals, jingling kada, golden hour frames — and the first toast of the celebration.',
    schedule: [
      { time: 'Morning', label: 'Mehendi ceremony', emoji: '🖐️' },
      { time: 'Daytime', label: 'Relax · photos · family time', emoji: '📸' },
      { time: 'Night', label: 'Cocktail party', emoji: '🍸' },
    ],
  },
  {
    day: 'Day Two',
    title: 'Haldi, Tilak & Engagement',
    hindi: 'हल्दी, तिलक और सगाई',
    date: '19 November 2026',
    icon: '🌼',
    color: ['#e6a024', '#b8860b'],
    desc: 'Rituals of gold, red and bright turmeric — crowned by the ring, and a night of music.',
    schedule: [
      { time: 'Morning', label: 'Haldi', emoji: '🌼' },
      { time: 'Afternoon', label: 'Tilak ceremony', emoji: '🌺' },
      { time: 'Evening · Night', label: 'Engagement', emoji: '💍' },
      { time: 'Night', label: 'Musical · Sangeet night', emoji: '🎶' },
    ],
  },
  {
    day: 'Day Three',
    title: 'Wedding',
    hindi: 'विवाह',
    date: '20 November 2026',
    icon: '🪔',
    color: ['#8b1e3f', '#4a0814'],
    desc: 'The sacred fire, the garlands, and a promise made before the holy flames and heaven.',
    schedule: [
      { time: 'Evening', label: 'Baraat', emoji: '🐎' },
      { time: 'Dusk', label: 'Jaimala · Varmala — exchange of garlands', emoji: '🌸' },
      { time: 'Night', label: 'Wedding rituals', emoji: '🪔' },
      { time: 'Night', label: 'Pheras', emoji: '🔥' },
    ],
  },
];

export default function Events() {
  const rootRef = useRef(null);
  const cardsRef = useRef(null);

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

      <p className="section-tag">Celebrations</p>
      <h2 className="section-title">The Festivities</h2>
      <p className="section-sub">Three days of ritual and revelry — from the first swirl of henna to the final circle of the sacred fire.</p>

      <div className="events-grid" ref={cardsRef}>
        {DAYS.map((day, i) => (
          <DayCard key={day.title} day={day} index={i} />
        ))}
      </div>
    </section>
  );
}

function DayCard({ day, index }) {
  const cardRef = useRef(null);
  useTilt(cardRef, 10);

  return (
    <article
      ref={cardRef}
      className="day-card preserve-3d"
      style={{ '--ev1': day.color[0], '--ev2': day.color[1] }}
    >
      <div className="day-top">
        <span className="day-icon">{day.icon}</span>
        <span className="day-hindi">{day.hindi}</span>
      </div>
      <p className="day-label">{day.day}</p>
      <h3 className="day-name">{day.title}</h3>
      <p className="day-date">{day.date}</p>
      <p className="day-desc">{day.desc}</p>

      <ul className="day-schedule">
        {day.schedule.map((item) => (
          <li className="day-item" key={item.label}>
            <span className="day-item-emoji">{item.emoji}</span>
            <div className="day-item-body">
              <span className="day-item-time">{item.time}</span>
              <span className="day-item-label">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="event-rings">
        <span />
        <span />
        <span />
      </div>
      <span className="event-index">0{index + 1}</span>
    </article>
  );
}