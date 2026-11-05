import {
  Server,
  Network,
  Activity,
  Code2,
  Database,
  PenTool,
} from "lucide-react";
import { skillGroups } from "../data/profile";
import SectionHeading from "./SectionHeading";

const icons = [Server, Network, Activity, Code2, Database, PenTool];

export default function Skills() {
  return (
    <section id="competences" className="section section-shell">
      <SectionHeading
        number="04"
        label="La boîte à outils"
        title="De l’infrastructure à l’interface."
        description="Les technologies et les outils que je mobilise dans mes formations, mes stages et mes projets."
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index];
          return (
            <article className="skill-card" key={group.title}>
              <Icon size={24} strokeWidth={1.5} />
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
