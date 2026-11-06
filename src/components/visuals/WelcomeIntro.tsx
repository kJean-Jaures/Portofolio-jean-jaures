import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { useMotionSettings } from "./MotionSettings";
import Starfield from "./Starfield";

export default function WelcomeIntro() {
  const { enabled } = useMotionSettings();
  const [done, setDone] = useState(() => {
    try {
      return (
        !enabled ||
        !!window.location.hash ||
        sessionStorage.getItem("portfolio-cosmic-intro") === "seen"
      );
    } catch {
      return false;
    }
  });
  const ref = useRef<HTMLDialogElement>(null);
  const finish = () => {
    try {
      sessionStorage.setItem("portfolio-cosmic-intro", "seen");
    } catch {
      /* The welcome animation is optional. */
    }
    ref.current?.close();
    setDone(true);
  };
  useEffect(() => {
    if (done) return;
    if (!enabled) {
      ref.current?.close();
      setDone(true);
      return;
    }
    ref.current?.showModal();
    const timeout = window.setTimeout(finish, 1900);
    return () => {
      window.clearTimeout(timeout);
      ref.current?.close();
    };
  }, [done, enabled]);
  if (done || !enabled) return null;
  return (
    <dialog
      ref={ref}
      className="welcome-intro"
      aria-labelledby="welcome-title"
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
        aria-hidden="true"
      >
        <defs>
          <filter id="lightning-glow">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path
          className="lightning-halo"
          d="M550 -20L480 75 510 100 410 170 449 215 390 270 470 330 432 390 503 445 450 495 489 540 419 600 460 660 390 715 430 765 375 815 405 920"
        />
        <path
          className="lightning-core"
          d="M550 -20L480 75 510 100 410 170 449 215 390 270 470 330 432 390 503 445 450 495 489 540 419 600 460 660 390 715 430 765 375 815 405 920"
        />
        <path
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
        Passer l’animation <ArrowRight size={16} />
      </button>
    </dialog>
  );
}
