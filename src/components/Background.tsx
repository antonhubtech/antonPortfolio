import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface P { x: number; y: number; vx: number; vy: number; r: number }

/**
 * Fixed backdrop: two slow gradient blobs + a light particle network on a canvas.
 * The canvas is capped in density and DPR, pauses when the tab is hidden,
 * and renders a single still frame for reduced-motion users.
 */
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    let parts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(64, Math.max(22, (w * h) / 26000)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.4,
      }));
    };

    const LINK = 120;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
          // gentle attraction toward the pointer
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            p.x += dx * 0.0012;
            p.y += dy * 0.0012;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160, 200, 255, 0.55)';
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(110, 170, 255, ${(1 - d / LINK) * 0.14})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    resize();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute -left-[12vw] -top-[18vh] h-[60vh] w-[60vh] rounded-full opacity-50 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgb(79 139 255 / .55), transparent 70%)', animation: 'drift-a 26s ease-in-out infinite' }}
      />
      <div
        className="absolute -bottom-[20vh] -right-[10vw] h-[65vh] w-[65vh] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgb(141 107 255 / .5), transparent 70%)', animation: 'drift-b 32s ease-in-out infinite' }}
      />
      <div className="grid-lines absolute inset-0" />
      <canvas ref={ref} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(4_5_10/.75)_100%)]" />
    </div>
  );
}
