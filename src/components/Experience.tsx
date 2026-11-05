import { ArrowUpRight, Briefcase } from "lucide-react";
import { experiences } from "../data/profile";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experiences" className="section section-shell">
      <SectionHeading
        number="02"
        label="Sur le terrain"
        title="Des expériences complémentaires."
        description="Du support utilisateur au développement web, un même fil conducteur : comprendre le besoin et apporter une solution concrète."
      />
      <div className="experience-list">
        {experiences.map((experience) => (
          <article className="experience-row" key={experience.company}>
            <div className="experience-company">
              <span className="experience-icon">
                <Briefcase size={21} />
              </span>
              <h3>{experience.company}</h3>
              <span className="muted">{experience.period}</span>
              <span className="small-tag">{experience.type}</span>
            </div>
            <div className="experience-content">
              <h4>{experience.role}</h4>
              <p>{experience.description}</p>
              <ul>
                {experience.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
              <div className="tags">
                {experience.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <ArrowUpRight
              className="experience-arrow"
              size={22}
              strokeWidth={1.4}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
