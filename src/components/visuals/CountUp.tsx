import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMotionSettings } from "./MotionSettings";

export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const { enabled } = useMotionSettings();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || !enabled) return;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 950, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, enabled, value]);
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {(enabled ? count : value).toString().padStart(2, "0")}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
