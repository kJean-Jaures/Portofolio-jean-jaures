import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/projects";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import ProjectArtwork from "./ProjectArtwork";
import { Reveal, TiltCard } from "./visuals/Reveal";
import { useMotionSettings } from "./visuals/MotionSettings";

const filters = [
  { id: "all", label: "Tout explorer" },
  { id: "infrastructure", label: "Systèmes & réseaux" },
  { id: "development", label: "Développement web & mobile" },
  { id: "design", label: "Design & graphisme" },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");
  const { enabled } = useMotionSettings();
  const displayed = projects.filter(
    (project) => filter === "all" || project.field === filter,
  );
  return (
    <section
      id="experiences"
      className="section section-shell experience-showcase"
    >
      <span id="realisations" className="anchor-target" aria-hidden="true" />
      <SectionHeading
        number="02"
        label="Expériences & réalisations"
        title="Des missions. Du code. Du concret."
        description="Stages, projet académique et freelance : explorez chaque expérience pour découvrir mon rôle, mes contributions et mes réalisations."
      />
      <Reveal>
        <div
          className="project-filters"
          role="group"
          aria-label="Filtrer les expériences"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              className={filter === item.id ? "is-active" : ""}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span>
                {item.id === "all"
                  ? projects.length
                  : projects.filter((project) => project.field === item.id)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {displayed.length} expériences affichées
        </p>
        <div className="projects-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {displayed.map((project) => (
              <motion.div
                key={project.id}
                layout={enabled}
                initial={{ opacity: 0, y: enabled ? 20 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: enabled ? 0.96 : 1 }}
                transition={{ duration: enabled ? 0.3 : 0 }}
              >
                <TiltCard>
                  <article className={`project-card project-${project.id}`}>
                    <div className="project-cover">
                      <ProjectArtwork project={project} />
                      <span className="project-image-label">
                        {project.type}
                      </span>
                      <span className="project-open">
                        <ArrowUpRight size={24} />
                      </span>
                    </div>
                    <div className="project-card-copy">
                      <div className="project-card-meta">
                        <span>{project.company}</span>
                        <span>{project.period}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="project-role">{project.role}</p>
                      <p>{project.summary}</p>
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <span className="project-explore">
                        Explorer cette expérience <ArrowUpRight size={17} />
                      </span>
                    </div>
                    <button
                      className="card-hit-area"
                      onClick={() => setSelected(project)}
                      aria-label={`Découvrir ${project.company} — ${project.title}`}
                      aria-haspopup="dialog"
                    />
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
