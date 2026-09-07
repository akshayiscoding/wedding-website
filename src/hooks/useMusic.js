import { useCallback, useEffect, useRef, useState } from 'react';

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0]; // raga-ish pentatonic: C D E G A
const SEQUENCE = [0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 3, 4, 3, 2, 1];
const BEAT = 0.34;
const STORAGE_KEY = 'ak-music';

export default function useMusic() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const onRef = useRef(on);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const stepRef = useRef(0);
  const nextTimeRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
      masterRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx || ctxRef.current) return;

    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5);
    master.connect(ctx.destination);
    masterRef.current = master;

    // tanpura-style drone: Sa + Pa
    [130.81, 196.0].forEach((f) => {
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.5;
      o.connect(g);
      g.connect(master);
      o.start();
    });

    const pad = (freq, when, dur, gain) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(gain, when + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      o.connect(g);
      g.connect(master);
      o.start(when);
      o.stop(when + dur + 0.1);
    };

    nextTimeRef.current = ctx.currentTime + 0.1;
    const scheduleStep = () => {
      const when = nextTimeRef.current;
      const idx = SEQUENCE[stepRef.current % SEQUENCE.length];
      pad(SCALE[idx], when, BEAT * 3, 0.22);
      pad(SCALE[(idx + 2) % SCALE.length] / 2, when, BEAT * 4, 0.12);
      stepRef.current += 1;
      nextTimeRef.current += BEAT;
      timerRef.current = setTimeout(
        scheduleStep,
        Math.max(0, (nextTimeRef.current - ctx.currentTime) * 1000),
      );
    };
    scheduleStep();
  }, []);

  const toggle = useCallback(() => {
    if (onRef.current) {
      stop();
      setOn(false);
      try {
        localStorage.setItem(STORAGE_KEY, '0');
      } catch {}
    } else {
      start();
      setOn(true);
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {}
    }
  }, [start, stop]);

  // pause when the tab is hidden (no unexpected audio)
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && onRef.current) {
        stop();
        setOn(false);
        try {
          localStorage.setItem(STORAGE_KEY, '0');
        } catch {}
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [stop]);

  return { on, toggle };
}