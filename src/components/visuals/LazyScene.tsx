import { lazy, Suspense, useEffect, useRef, useState } from "react";
import SceneFallback from "./SceneFallback";
const TechScene = lazy(() => import("./TechScene"));

export default function LazyScene({
  variant = "workspace",
}: {
  variant?: "workspace" | "keyboard" | "globe";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="scene-loader" ref={ref}>
      {active ? (
        <Suspense fallback={<SceneFallback variant={variant} />}>
          <TechScene variant={variant} />
        </Suspense>
      ) : (
        <SceneFallback variant={variant} />
      )}
    </div>
  );
}
