import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Layers, X } from "lucide-react";
import type { Project } from "../data/projects";
import ProjectArtwork from "./ProjectArtwork";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    const oldOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className={`project-dialog-content project-${project.id}`}>
          <button
            className="icon-button dialog-close"
            onClick={onClose}
            aria-label="Fermer l’expérience"
            autoFocus
          >
            <X size={21} />
          </button>
          <div className="dialog-art">
            <ProjectArtwork project={project} modal />
          </div>
          <div className="dialog-copy">
            <p className="eyebrow">
              {project.company} / {project.category}
            </p>
            <h2 id="project-title">{project.title}</h2>
            <div className="dialog-facts">
              <span>
                <small>Mon rôle</small>
                {project.role}
              </span>
              <span>
                <small>Période</small>
                {project.period}
              </span>
              <span>
                <small>Cadre</small>
                {project.type}
              </span>
            </div>
            <h3>Le contexte</h3>
            <p>{project.context}</p>
            <h3>Ce que j’ai fait</h3>
            <ul className="contribution-list">
              {project.contributions.map((text) => (
                <li key={text}>
                  <Check size={17} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="deliverables-panel">
              <h3>
                <Layers size={18} /> Réalisations & livrables
              </h3>
              <ul>
                {project.deliverables.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
            <h3>Outils & compétences mobilisés</h3>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="button button-primary"
              href="#contact"
              onClick={onClose}
            >
              Échanger sur cette expérience <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
