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
      const count = Math.min(55, Math.max(20, Math.floor((w * h) / 16000)));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const isBlue = Math.random() > 0.45;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 1,
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

    const getSectionEl = (): HTMLElement | null => {
      let el: HTMLElement | null = canvas;
      while (el) {
        if (el.tagName === 'SECTION') return el;
        el = el.parentElement;
      }
      return null;
    };

    const resize = () => {
      const section = getSectionEl();
      if (!section) return;
      w = section.clientWidth;
      h = section.clientHeight;
      if (w === 0 || h === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = initParticles(w, h);
    };

    const drawParticles = (pts: Particle[]) => {
      const maxDist = 140;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 68%, 0.6)`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, 0.8)`;
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
            const opacity = (1 - dist / maxDist) * 0.25;
            const avgHue = (pts[i].hue + pts[j].hue) / 2;
            ctx.strokeStyle = `hsla(${avgHue}, 75%, 68%, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawParticles(particles);
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

    const section = getSectionEl();
    if (section) {
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
      intersectionObserver.observe(section);

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
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
