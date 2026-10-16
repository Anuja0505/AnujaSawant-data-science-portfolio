import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initParticles = useCallback(
    (w: number, h: number): Particle[] => {
      const count = Math.min(50, Math.floor((w * h) / 18000));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const isBlue = Math.random() > 0.45;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.5 + 0.8,
          hue: isBlue ? 200 : 265,
        });
      }
      return particles;
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;
    let isRunning = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = initParticles(w, h);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawParticles(particles);
    };

    const drawParticles = (pts: Particle[]) => {
      const maxDist = 130;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 68%, 0.55)`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 85%, 72%, 0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.2;
            const avgHue = (pts[i].hue + pts[j].hue) / 2;
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 65%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      drawParticles(particles);
      rafId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !prefersReducedMotion) {
          if (!isRunning) {
            isRunning = true;
            rafId = requestAnimationFrame(animate);
          }
        } else {
          isRunning = false;
          cancelAnimationFrame(rafId);
          if (visible && prefersReducedMotion) drawStatic();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas.parentElement!);

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      intersectionObserver.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
