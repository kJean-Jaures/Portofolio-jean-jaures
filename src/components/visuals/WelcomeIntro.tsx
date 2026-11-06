import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { useMotionSettings } from "./MotionSettings";
import Starfield from "./Starfield";

const INTRO_DURATION_MS = 4800;

export default function WelcomeIntro() {
  const { enabled } = useMotionSettings();
  const [done, setDone] = useState(() =>
    [
      "#apropos",
      "#portfolio",
      "#experiences",
      "#realisations",
      "#competences",
      "#parcours",
      "#contact",
    ].includes(window.location.hash),
  );
  const ref = useRef<HTMLDialogElement>(null);
  const finish = () => {
    ref.current?.close();
    setDone(true);
  };
  useEffect(() => {
    if (done) return;
    ref.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let timeout = 0;
    const frame = requestAnimationFrame(() => {
      timeout = window.setTimeout(finish, INTRO_DURATION_MS);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      ref.current?.close();
    };
  }, [done]);
  if (done) return null;
  return (
    <dialog
      ref={ref}
      className="welcome-intro"
      aria-labelledby="welcome-title"
      data-animated={enabled}
      style={{ "--intro-duration": `${INTRO_DURATION_MS}ms` } as CSSProperties}
      onCancel={finish}
    >
      <div className="intro-glow" />
      <div className="intro-stars" aria-hidden="true">
        <Starfield />
      </div>
      <svg
        className="intro-lightning"
        viewBox="0 0 900 900"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="lightning-glow">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path
          vectorEffect="non-scaling-stroke"
          className="lightning-halo"
          d="M550 -20L480 75 510 100 410 170 449 215 390 270 470 330 432 390 503 445 450 495 489 540 419 600 460 660 390 715 430 765 375 815 405 920"
        />
        <path
          vectorEffect="non-scaling-stroke"
          className="lightning-core"
          d="M550 -20L480 75 510 100 410 170 449 215 390 270 470 330 432 390 503 445 450 495 489 540 419 600 460 660 390 715 430 765 375 815 405 920"
        />
        <path
          vectorEffect="non-scaling-stroke"
          className="lightning-branch"
          d="M449 215L540 180 574 205 640 150M419 600L337 565 300 590 248 560"
        />
      </svg>
      <div className="intro-copy">
        <span className="intro-mark">
          <Zap size={30} />
        </span>
        <p>KOUAMÉ JEAN-JAURES KOUASSI</p>
        <h2 id="welcome-title">
          Bienvenue dans
          <br />
          <span>mon univers.</span>
        </h2>
        <span className="intro-subtitle">Systèmes · Réseaux · Code</span>
      </div>
      <button className="intro-skip" onClick={finish} autoFocus>
        {enabled ? "Passer l’animation" : "Entrer sur le site"}{" "}
        <ArrowRight size={16} />
      </button>
    </dialog>
  );
}
