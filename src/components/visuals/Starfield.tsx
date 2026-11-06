import { useEffect, useRef } from "react";
import { useMotionSettings } from "./MotionSettings";

interface Star {
  x: number;
  y: number;
  depth: number;
  size: number;
  phase: number;
}
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { enabled } = useMotionSettings();
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      elapsed = 0,
      hidden = document.hidden;
    let pointerX = 0,
      pointerY = 0,
      smoothX = 0,
      smoothY = 0;
    const stars: Star[] = Array.from(
      { length: window.innerWidth < 768 ? 110 : 220 },
      (_, index) => ({
        x: (index * 0.61803398875) % 1,
        y: (index * 0.754877666) % 1,
        depth: 0.25 + (index % 7) / 9,
        size: 0.45 + (index % 6) * 0.19,
        phase: index * 1.71,
      }),
    );
    const draw = () => {
      const light = document.documentElement.classList.contains("light");
      context.clearRect(0, 0, width, height);
      const projected = stars.map((star) => ({
        x:
          (((star.x * width +
            smoothX * star.depth +
            elapsed * star.depth * 1.6) %
            width) +
            width) %
          width,
        y:
          (((star.y * height +
            smoothY * star.depth +
            elapsed * star.depth * 0.7) %
            height) +
            height) %
          height,
        opacity:
          (0.28 + (0.5 + Math.sin(elapsed * 0.65 + star.phase) * 0.5) * 0.55) *
          (light ? 0.5 : 1),
        star,
      }));
      projected.forEach(({ x, y, opacity, star }, index) => {
        context.fillStyle = light
          ? `rgba(35,90,180,${opacity})`
          : index % 5 === 0
            ? `rgba(91,161,255,${opacity})`
            : `rgba(217,235,255,${opacity})`;
        context.beginPath();
        context.arc(x, y, star.size, 0, Math.PI * 2);
        context.fill();
      });
      // A few local constellations, rather than a costly all-pairs particle graph.
      for (let index = 0; index < 35; index++) {
        const a = projected[index * 2],
          b = projected[index * 2 + 1];
        if (Math.hypot(a.x - b.x, a.y - b.y) > 150) continue;
        context.strokeStyle = light
          ? "rgba(40,100,210,.12)"
          : "rgba(72,135,241,.14)";
        context.lineWidth = 0.6;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
      if (enabled) {
        for (let index = 0; index < 3; index++) {
          const cycle = (elapsed + index * 4.3) % 15;
          if (cycle > 1.1) continue;
          const progress = cycle / 1.1;
          const x = (index * 0.31 + 0.12) * width + progress * width * 0.28;
          const y = (index * 0.18 + 0.08) * height + progress * height * 0.22;
          const alpha = Math.sin(progress * Math.PI) * 0.7;
          const trail = context.createLinearGradient(x - 75, y - 55, x, y);
          trail.addColorStop(0, "rgba(104,175,255,0)");
          trail.addColorStop(1, `rgba(170,218,255,${alpha})`);
          context.strokeStyle = trail;
          context.lineWidth = 1.2;
          context.beginPath();
          context.moveTo(x - 75, y - 55);
          context.lineTo(x, y);
          context.stroke();
        }
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled) return;
      pointerX = (event.clientX / width - 0.5) * -35;
      pointerY = (event.clientY / height - 0.5) * -25;
    };
    const visibility = () => {
      hidden = document.hidden;
      last = performance.now();
    };
    const themeObserver = new MutationObserver(() => {
      if (!enabled) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    resize();
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (hidden || time - last < 1000 / 30) return;
      elapsed += Math.min((time - last) / 1000, 0.05);
      last = time;
      smoothX += (pointerX - smoothX) * 0.04;
      smoothY += (pointerY - smoothY) * 0.04;
      draw();
    };
    if (enabled) frame = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      themeObserver.disconnect();
    };
  }, [enabled]);
  return <canvas className="starfield-canvas" ref={ref} aria-hidden="true" />;
}
