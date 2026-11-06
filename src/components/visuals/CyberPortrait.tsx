import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ScanFace } from "lucide-react";
import portrait from "../../assets/photo-profil.webp";
import { useMotionSettings } from "./MotionSettings";

export default function CyberPortrait() {
  const { enabled } = useMotionSettings();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [mode, setMode] = useState<"auto" | "cyber" | "portrait">("auto");
  const [automatic, setAutomatic] = useState(false);
  const [hover, setHover] = useState(false);
  const active =
    mode === "cyber" || (mode === "auto" && enabled && (automatic || hover));
  useEffect(() => {
    if (!enabled || !inView || mode !== "auto") return;
    const interval = window.setInterval(
      () => setAutomatic((value) => !value),
      3600,
    );
    return () => window.clearInterval(interval);
  }, [enabled, inView, mode]);
  return (
    <div
      ref={ref}
      className={`cyber-portrait ${active ? "is-cyber" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
    >
      <div className="portrait-halo" />
      <div className="portrait-orbit" />
      <div className="portrait-cutout">
        <img
          className="portrait-natural"
          src={portrait}
          alt="Kouamé Jean-Jaures KOUASSI"
          width="736"
          height="1000"
          loading="lazy"
        />
        <div className="portrait-cyber-layer" aria-hidden="true">
          <img src={portrait} alt="" width="736" height="1000" loading="lazy" />
          <svg viewBox="0 0 736 1000" fill="none">
            <defs>
              <linearGradient
                id="cyber-mask"
                x1="300"
                y1="100"
                x2="480"
                y2="320"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#07193c" />
                <stop offset=".5" stopColor="#2560c2" stopOpacity=".85" />
                <stop offset="1" stopColor="#061834" />
              </linearGradient>
            </defs>
            <path
              d="M307 125Q391 72 471 127L481 241 451 290 391 325 329 286 298 238Z"
              fill="url(#cyber-mask)"
              stroke="#6ae3ff"
              strokeWidth="2"
            />
            <path
              d="M309 149L390 178 469 151M299 218L390 178 480 218M329 286L390 239 451 290M390 178V325M307 125L390 239 471 127M310 244L390 275 472 244"
              stroke="#64cbff"
              strokeOpacity=".8"
              strokeWidth="1.6"
            />
            <path
              d="M323 177L372 197 367 221 321 205ZM410 197L458 177 462 205 416 221Z"
              fill="#bdedff"
              stroke="#74e6ff"
              strokeWidth="4"
            />
            <path
              d="M367 275L391 284 415 275"
              stroke="#c5f1ff"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="portrait-scanline" aria-hidden="true" />
      </div>
      <button
        className="portrait-mode"
        onClick={() => setMode(active ? "portrait" : "cyber")}
        aria-pressed={active}
        aria-label={
          active ? "Revenir au portrait naturel" : "Activer le portrait cyber"
        }
      >
        <ScanFace size={16} /> {active ? "Mode cyber" : "Scanner le profil"}
      </button>
    </div>
  );
}
