import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Project } from "../data/projects";

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
        <div className="project-dialog-content">
          <button
            className="icon-button dialog-close"
            onClick={onClose}
            aria-label="Fermer le projet"
            autoFocus
          >
            <X size={21} />
          </button>
          <img
            className="dialog-image"
            src={project.image}
            alt={project.imageAlt}
            width="960"
            height="540"
          />
          <div className="dialog-copy">
            <p className="eyebrow">{project.category}</p>
            <h2 id="project-title">{project.title}</h2>
            <p className="project-period">{project.period}</p>
            <p>{project.context}</p>
            <h3>Ma contribution</h3>
            <ul className="contribution-list">
              {project.contributions.map((text) => (
                <li key={text}>
                  <Check size={17} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
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
              Échanger sur ce projet <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
