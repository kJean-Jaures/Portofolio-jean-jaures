import { useState } from "react";
import {
  Server,
  Network,
  Activity,
  Code2,
  Database,
  PenTool,
  Sparkles,
} from "lucide-react";
import { skillGroups } from "../data/profile";
import SectionHeading from "./SectionHeading";
import { Reveal, TiltCard } from "./visuals/Reveal";
import TechScene from "./visuals/LazyScene";
import TechTiles from "./TechTiles";
const icons = [Server, Network, Activity, Code2, Database, PenTool];

export default function Skills() {
  const [selectedTechnology, setSelectedTechnology] = useState("React");
  return (
    <section id="competences" className="section section-shell">
      <SectionHeading
        number="03"
        label="Tech stack"
        title="Plusieurs outils. Une vision d’ensemble."
        description="Des outils complémentaires pour comprendre un projet, du réseau qui le porte à l’interface qui le rend accessible."
      />
      <TechTiles />
      <Reveal className="stack-stage">
        <div className="stack-stage-copy">
          <span className="stack-pill">
            <Sparkles size={15} /> Mon terrain de jeu
          </span>
          <h3>
            L’infrastructure <br />
            aussi a son <br />
            <span>côté créatif.</span>
          </h3>
          <p>
            Linux, React, DNS, Bash, design… Le lien entre ces univers ?
            Comprendre comment ils fonctionnent ensemble.
          </p>
        </div>
        <div className="stack-visual">
          <TechScene
            variant="keyboard"
            selectedTechnology={selectedTechnology}
            onTechnologySelect={setSelectedTechnology}
          />
        </div>
      </Reveal>
      <div className="keyboard-interactions">
        <p>
          Touchez une touche du clavier, ou choisissez un outil ci-dessous.
          Faites glisser la page pour continuer la visite.
        </p>
        <div role="group" aria-label="Explorer les touches du clavier">
          {["React", "Linux", "Bash", "DNS", "Figma", "Grafana"].map(
            (label) => (
              <button
                key={label}
                aria-pressed={selectedTechnology === label}
                onClick={() => setSelectedTechnology(label)}
              >
                {label}
              </button>
            ),
          )}
        </div>
        <p className="keyboard-feedback" role="status">
          Outil sélectionné : <strong>{selectedTechnology}</strong>
        </p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={group.title} delay={(index % 3) * 0.07}>
              <TiltCard>
                <article className="skill-card">
                  <div className="skill-card-top">
                    <Icon size={25} strokeWidth={1.5} />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="tags">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
