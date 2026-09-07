export default function Mandala({ size = 140, rotate = 0, color = '#d4af37' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <circle cx="100" cy="100" r="82" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 100 + Math.cos(angle) * 88;
        const y1 = 100 + Math.sin(angle) * 88;
        const x2 = 100 + Math.cos(angle) * 98;
        const y2 = 100 + Math.sin(angle) * 98;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />;
      })}
      <circle cx="100" cy="100" r="48" stroke={color} strokeWidth="1" fill="none" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 + 22.5) * Math.PI / 180;
        const cx = 100 + Math.cos(angle) * 40;
        const cy = 100 + Math.sin(angle) * 40;
        return (
          <path
            key={i}
            d={`M ${cx} ${cy - 10} Q ${cx + 10} ${cy} ${cx} ${cy + 10} Q ${cx - 10} ${cy} ${cx} ${cy - 10}`}
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
        );
      })}
      <circle cx="100" cy="100" r="18" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
      <circle cx="100" cy="100" r="4" fill={color} />
    </svg>
  );
}