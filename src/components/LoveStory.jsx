import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LoveStory.css';
import Mandala from './Mandala';

gsap.registerPlugin(ScrollTrigger);

const STORY = [
  {
    year: 'April 2019',
    icon: '💻',
    title: 'How It Began',
    text: 'It all began in April 2019, when we met through a freelance project. What started as work soon turned into conversations, laughter, and a connection neither of us expected.',
  },
  {
    year: 'First Meet · Mumbai',
    icon: '🎤',
    title: 'The Travis Scott Night',
    text: 'Our first meeting was in Mumbai, where we went to a Travis Scott concert together. Somewhere between the music, the madness, and spending time together, we found ourselves falling a little more in love.',
  },
  {
    year: 'Jaipur ↔ Hyderabad',
    icon: '🗺️',
    title: 'Two Cities, One Heart',
    text: 'And then came the long-distance chapter — Jaipur and Hyderabad. Different cities, busy lives, countless calls and messages — but somehow, the distance only made us more certain about each other.',
  },
  {
    year: 'The Roka',
    icon: '💍',
    title: 'A Step Towards Forever',
    text: 'Akshay travelled to Jaipur to ask her parents for her hand. They said yes, and with their blessings, both families came together in Hyderabad to celebrate our Roka — officially beginning our journey towards forever.',
  },
  {
    year: 'Still Far, Still Close',
    icon: '📞',
    title: 'Back to Long Distance',
    text: 'After the celebrations, it was back to long distance once again. But by then, we knew that every goodbye was simply bringing us one step closer to the day we wouldn’t have to say goodbye anymore.',
  },
  {
    year: 'Wayanad',
    icon: '🌄',
    title: 'A Birthday Getaway',
    text: 'One of our favourite memories came when we travelled to Wayanad to celebrate Akshay’s birthday. A little escape, a lot of laughter, and another beautiful chapter in our story.',
  },
];

export default function LoveStory() {
  const rootRef = useRef(null);
  const bannerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const cards = gsap.utils.toArray(track.children);

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth * 0.92),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // rotate each card into view as it arrives
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { rotationY: 40, scale: 0.85, opacity: 0.4 },
          {
            rotationY: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 92%',
              end: 'left 65%',
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 60%', once: true } },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={rootRef}>
      <div className="story-bg" />
      <span className="story-deco"><Mandala size={380} color="rgba(212,175,55,0.1)" /></span>

      <div className="story-banner" ref={bannerRef}>
        <p className="section-tag light">Our Journey</p>
        <h2 className="section-title light">The Love Story</h2>
        <div className="divider light-variant">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.6-9.5-9C.5 8.6 2 5.5 5.1 5.5c2 0 3.6 1.2 4.4 3.1l2.5 4.6 2.5-4.6c.8-1.9 2.4-3.1 4.4-3.1 3.1 0 4.6 3.1 2.6 6.5C19 16.4 12 21 12 21Z"/></svg>
        </div>
      </div>

      <div className="story-viewport">
        <div className="story-track preserve-3d" ref={trackRef}>
          {STORY.map((item, i) => (
            <article className={`story-card card-img-${i}`} key={item.year}>
              <span className="story-icon">{item.icon}</span>
              <span className="story-year">{item.year}</span>
              <h3 className="story-title">{item.title}</h3>
              <p className="story-text">{item.text}</p>
              <span className="story-index">0{i + 1}</span>
            </article>
          ))}
          <div className="story-end preserve-3d">
            <span className="story-end-big">❤️</span>
            <p>After all the cities, journeys, calls, and celebrations — we’re finally here, ready to begin our forever together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}