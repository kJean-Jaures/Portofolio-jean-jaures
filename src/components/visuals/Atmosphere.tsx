import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionSettings } from "./MotionSettings";
import Starfield from "./Starfield";

export default function Atmosphere() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const { enabled } = useMotionSettings();
  return (
    <>
      <div className="ambient-sky cosmic-sky" aria-hidden="true">
        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />
        <Starfield />
      </div>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: enabled ? smooth : scrollYProgress }}
        aria-hidden="true"
      />
    </>
  );
}
