import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const MotionContext = createContext({
  enabled: true,
  systemReduced: false,
  toggle: () => {},
});
export const useMotionSettings = () => useContext(MotionContext);

export function MotionSettingsProvider({ children }: { children: ReactNode }) {
  const systemReduced = !!useReducedMotion();
  const [preference, setPreference] = useState(() => {
    try {
      return localStorage.getItem("portfolio-motion") !== "off";
    } catch {
      return true;
    }
  });
  const enabled = preference && !systemReduced;
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", !enabled);
    try {
      localStorage.setItem("portfolio-motion", preference ? "on" : "off");
    } catch {
      /* Optional preference storage. */
    }
  }, [enabled, preference]);
  return (
    <MotionContext.Provider
      value={{
        enabled,
        systemReduced,
        toggle: () => setPreference((value) => !value),
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </MotionContext.Provider>
  );
}
