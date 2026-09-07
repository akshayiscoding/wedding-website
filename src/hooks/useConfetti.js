import { useCallback } from 'react';

const COLORS = ['#d4af37', '#f0d78c', '#6d0f1f', '#8b1e3f', '#ffd166', '#fffaf0'];

export default function useConfetti() {
  const burst = useCallback((x, y) => {
    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText =
      'position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden;';
    document.body.appendChild(layer);

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    layer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const cx = x ?? window.innerWidth / 2;
    const cy = y ?? window.innerHeight / 2;

    const parts = [];
    const N = 170;
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 5 + Math.random() * 9;
      parts.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 3.2,
        g: 0.16,
        rot: Math.random() * Math.PI * 2,
        rv: (Math.random() - 0.5) * 0.4,
        size: 5 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        life: 70 + Math.random() * 40,
        ttl: 70 + Math.random() * 40,
        rect: Math.random() > 0.45,
      });
    }

    let frame;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of parts) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.vy *= 0.99;
        p.vx *= 0.99;
        p.rot += p.rv;
        p.life -= 1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life / p.ttl);
        ctx.fillStyle = p.color;
        if (p.rect) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (alive) frame = requestAnimationFrame(tick);
      else {
        cancelAnimationFrame(frame);
        layer.remove();
      }
    };
    tick();
  }, []);

  return burst;
}