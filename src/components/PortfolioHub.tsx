import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Code2, FolderOpen, GraduationCap } from "lucide-react";
import Projects from "./Projects";
import Skills from "./Skills";
import Parcours from "./Parcours";
import SectionHeading from "./SectionHeading";
import { useMotionSettings } from "./visuals/MotionSettings";

type Panel = "projects" | "skills" | "education";
const tabs: { id: Panel; label: string; icon: typeof Code2; anchor: string }[] =
  [
    {
      id: "projects",
      label: "Expériences & projets",
      icon: FolderOpen,
      anchor: "experiences",
    },
    { id: "skills", label: "Tech stack", icon: Code2, anchor: "competences" },
    {
      id: "education",
      label: "Formation",
      icon: GraduationCap,
      anchor: "parcours",
    },
  ];
const fromHash = (hash: string): Panel =>
  hash === "#competences"
    ? "skills"
    : hash === "#parcours"
      ? "education"
      : "projects";

export default function PortfolioHub() {
  const [active, setActive] = useState<Panel>(() =>
    fromHash(window.location.hash),
  );
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const { enabled } = useMotionSettings();
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  useEffect(() => {
    let frame = 0;
    const apply = () => {
      if (
        ![
          "#experiences",
          "#realisations",
          "#competences",
          "#parcours",
        ].includes(window.location.hash)
      )
        return;
      setActive(fromHash(window.location.hash));
      const target = window.location.hash.slice(1);
      frame = requestAnimationFrame(() =>
        document
          .getElementById(target)
          ?.scrollIntoView({
            behavior: enabledRef.current ? "smooth" : "auto",
            block: "start",
          }),
      );
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", apply);
    };
  }, []);
  const activate = (index: number) => {
    setActive(tabs[index].id);
    window.history.replaceState(null, "", `#${tabs[index].anchor}`);
  };
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    activate(next);
    buttons.current[next]?.focus();
  };
  return (
    <section id="portfolio" className="section section-shell portfolio-hub">
      <SectionHeading
        number="02"
        label="Portfolio"
        title="Explorer mon univers."
        description="Les projets que je construis, les outils que j’utilise et le parcours qui les relie."
      />
      <div
        className="portfolio-tabs"
        role="tablist"
        aria-label="Explorer le portfolio"
      >
        {tabs.map(({ id, label, icon: Icon }, index) => (
          <button
            key={id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            id={`tab-${id}`}
            role="tab"
            aria-selected={active === id}
            aria-controls={`panel-${id}`}
            tabIndex={active === id ? 0 : -1}
            className={active === id ? "is-active" : ""}
            onClick={() => activate(index)}
            onKeyDown={(event) => onKey(event, index)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div
        id="panel-projects"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby="tab-projects"
        hidden={active !== "projects"}
      >
        <Projects />
      </div>
      <div
        id="panel-skills"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby="tab-skills"
        hidden={active !== "skills"}
      >
        <Skills />
      </div>
      <div
        id="panel-education"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby="tab-education"
        hidden={active !== "education"}
      >
        <Parcours />
      </div>
    </section>
  );
}
