import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionSettings } from "./MotionSettings";

export default function Atmosphere() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const { enabled } = useMotionSettings();
  return (
    <>
      <div className="ambient-sky" aria-hidden="true">
        <span className="ambient-blob blob-violet" />
        <span className="ambient-blob blob-cyan" />
        <span className="ambient-blob blob-pink" />
        <div className="ambient-grid" />
      </div>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: enabled ? smooth : scrollYProgress }}
        aria-hidden="true"
      />
    </>
  );
}
