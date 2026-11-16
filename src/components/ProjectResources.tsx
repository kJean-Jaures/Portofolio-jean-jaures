import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  FileText,
  X,
} from "lucide-react";
import type { Project, ProjectFile } from "../data/projects";
import PdfPreview from "./PdfPreview";

export default function ProjectResources({ project }: { project: Project }) {
  const [selected, setSelected] = useState<ProjectFile | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    preview.current?.focus();
    preview.current?.scrollIntoView({ block: "start" });
  }, [selected]);

  function close() {
    setSelected(null);
    trigger.current?.focus();
  }

  return (
    <>
      {project.files?.length || project.resources?.length ? (
        <div className="project-resources" aria-label="Ressources du projet">
          {project.files?.map((file) => (
            <button
              key={file.href}
              className="button button-secondary"
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(file);
              }}
              aria-expanded={selected?.href === file.href}
              aria-controls="project-presentation"
            >
              <FileText size={18} />
              Voir la {file.label.charAt(0).toLowerCase() + file.label.slice(1)}
              <ArrowUpRight size={16} />
            </button>
          ))}
          {project.resources?.map((resource) => (
            <a
              key={resource.href}
              className={`button ${resource.kind === "demo" ? "button-primary" : "button-secondary"}`}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource.kind === "demo" ? (
                <ExternalLink size={18} />
              ) : (
                <FileText size={18} />
              )}
              {resource.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      ) : null}
      {selected && (
        <div
          id="project-presentation"
          ref={preview}
          tabIndex={-1}
          className="file-preview"
          role="region"
          aria-label={`Aperçu — ${selected.label}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              close();
            }
          }}
        >
          <div className="preview-header">
            <h4>{selected.label}</h4>
            <button className="button button-secondary" onClick={close}>
              <X size={17} /> Fermer l’aperçu
            </button>
          </div>
          <PdfPreview key={selected.href} href={selected.href} />
          <a
            className="button button-secondary"
            href={selected.href}
            download={selected.downloadName}
          >
            <Download size={16} /> Télécharger le PDF
          </a>
        </div>
      )}
    </>
  );
}
