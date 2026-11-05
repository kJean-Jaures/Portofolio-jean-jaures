import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/projects";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="realisations" className="section section-shell">
      <SectionHeading
        number="03"
        label="Les réalisations"
        title="La théorie prend forme."
        description="Sécuriser un réseau ou concevoir une expérience web : des projets pour mettre mes compétences en pratique."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <button
              className="project-image-button"
              onClick={() => setSelected(project)}
              aria-label={`Découvrir ${project.title}`}
              aria-haspopup="dialog"
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                width="960"
                height="540"
                loading="lazy"
              />
              <span className="project-image-label">
                0{index + 1} / {project.category}
              </span>
              <span className="project-open">
                <ArrowUpRight size={24} />
              </span>
            </button>
            <div className="project-card-copy">
              <p className="project-period">{project.period}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                className="text-link"
                onClick={() => setSelected(project)}
                aria-haspopup="dialog"
                aria-label={`Voir la démarche : ${project.title}`}
              >
                Voir la démarche <ArrowUpRight size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
