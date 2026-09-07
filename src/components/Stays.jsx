import { useRef } from 'react';
import { useReveal, useTilt } from '../hooks/useAnimations';
import './Stays.css';
import Mandala from './Mandala';

const MAPS_URL =
  'https://www.google.com/maps/place/golden+eagle+jaipur/data=!4m2!3m1!1s0x396db4c0e33f76a3:0x262878d24c5bda50?sa=X&ved=1t:242&ictx=111';
const MAPS_EMBED = 'https://www.google.com/maps?q=Golden%20Eagle%20Jaipur&z=15&output=embed';

const AMENITIES = [
  'Complimentary breakfast',
  'Airport transfer',
  'Free parking',
  'Fast Wi-Fi',
  '24×7 front desk',
  'Travel desk',
];

export default function Stays() {
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  useReveal(infoRef, { style: 'from-left', start: 'top 80%' });
  useReveal(mapRef, { style: 'from-right', start: 'top 80%' });
  useTilt(infoRef, 5);

  return (
    <section className="stays" id="stays">
      <div className="stays-bg" />
      <span className="stays-deco left"><Mandala size={300} color="rgba(109,15,31,0.07)" /></span>
      <span className="stays-deco right"><Mandala size={220} color="rgba(212,175,55,0.12)" /></span>

      <p className="section-tag">For Our Guests</p>
      <h2 className="section-title">Where to Stay</h2>
      <p className="section-sub">
        Rest easy — a block of rooms has been booked for you. Just tell them the couple's names when you check in.
      </p>

      <div className="stays-grid">
        <div className="stays-card preserve-3d" ref={infoRef}>
          <span className="stays-badge">॥ Rooms Booked For Our Guests ॥</span>

          <h3 className="stays-hotel">Golden Eagle</h3>
          <p className="stays-city">Jaipur · Rajasthan</p>

          <p className="stays-desc">
            A haven of warm hospitality and old-world charm, tucked close to all the celebration venues. We've
            reserved a comfortable block of rooms so our dearest guests can unwind, refresh, and be ready for every
            ritual of the day.
          </p>

          <ul className="stays-amenities">
            {AMENITIES.map((a) => (
              <li key={a}>✦ {a}</li>
            ))}
          </ul>

          <p className="stays-note">
            Please mention <strong>Akshay &amp; Kirti's wedding</strong> at the front desk for the reserved-rate block.
          </p>

          <a
            className="stays-cta"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
            <span className="stays-cta-arrow">↗</span>
          </a>
        </div>

        <div className="stays-map-wrap preserve-3d" ref={mapRef}>
          <div className="stays-map-frame">
            <iframe
              title="Golden Eagle Jaipur map"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="stays-map-caption">
            Golden Eagle · Jaipur
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Get Directions →</a>
          </p>
        </div>
      </div>
    </section>
  );
}