import { useEffect, useState } from "react";
import { useMotionSettings } from "./MotionSettings";
const roles = [
  "Réseaux & SecOps",
  "Développement full stack",
  "Bachelor 3 · IPSSI",
];

export default function TypingText() {
  const { enabled } = useMotionSettings();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const text = roles[index];
    const delay =
      !deleting && length === text.length ? 1800 : deleting ? 32 : 65;
    const timeout = window.setTimeout(() => {
      if (!deleting && length < text.length) setLength((value) => value + 1);
      else if (!deleting) setDeleting(true);
      else if (length > 0) setLength((value) => value - 1);
      else {
        setDeleting(false);
        setIndex((value) => (value + 1) % roles.length);
      }
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [enabled, index, length, deleting]);
  return (
    <>
      <span className="sr-only">
        Réseaux et SecOps, développement full stack, étudiant à l’IPSSI.
      </span>
      <span aria-hidden="true" className="typing-text">
        {enabled ? roles[index].slice(0, length) : roles[0]}
        <span className="typing-caret">_</span>
      </span>
    </>
  );
}
