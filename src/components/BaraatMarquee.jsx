import './BaraatMarquee.css';

const ITEMS = ['🐎', '🥁', '🎺', '🌹', '🪗', '🎶', '👯', '🪔'];

export default function BaraatMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="baraat-marquee" aria-hidden="true">
      <div className="baraat-track">
        <div className="baraat-row">
          {row.map((item, i) => (
            <span className="baraat-item" key={`a-${i}`}>{item}</span>
          ))}
        </div>
        <div className="baraat-row" aria-hidden="true">
          {row.map((item, i) => (
            <span className="baraat-item" key={`b-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}