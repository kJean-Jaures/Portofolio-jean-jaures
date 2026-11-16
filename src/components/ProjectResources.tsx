import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Eye,
  Github,
  X,
} from "lucide-react";
import type { Project, ProjectFile } from "../data/projects";
import PdfPreview from "./PdfPreview";

export default function ProjectResources({ project }: { project: Project }) {
  const [selected, setSelected] = useState<ProjectFile | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const files = project.files ?? [];

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
      {!!project.resources?.length && (
        <div className="project-resources" aria-label="Liens du projet">
          {project.resources.map((resource) => (
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
                <Github size={18} />
              )}
              {resource.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      )}
      <section className="project-files" aria-labelledby="project-files-title">
        <h2 id="project-files-title">Fichiers disponibles</h2>
        {!project.files?.length && (
          <p className="missing-document">
            Aucun document de présentation n’est disponible pour ce projet.
          </p>
        )}
        {!!files.length && (
          <ul className="project-file-list">
            {files.map((file) => (
              <li key={file.href}>
                <div>
                  <strong>{file.label}</strong>
                  <small>
                    {file.format === "pdf" ? "PDF de présentation" : "Fichier"}
                  </small>
                </div>
                <div className="file-actions">
                  <button
                    className="button button-secondary"
                    aria-label={`Consulter — ${file.label}`}
                    aria-expanded={selected?.href === file.href}
                    aria-controls={
                      selected?.href === file.href
                        ? "project-presentation"
                        : undefined
                    }
                    onClick={(event) => {
                      trigger.current = event.currentTarget;
                      setSelected(file);
                    }}
                  >
                    <Eye size={16} /> Consulter
                  </button>
                  <a
                    className="button button-secondary"
                    href={file.href}
                    download={file.downloadName}
                    aria-label={`Télécharger — ${file.label}`}
                  >
                    <Download size={16} /> Télécharger
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
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
                close();
              }
            }}
          >
            <div className="preview-header">
              <h3>{selected.label}</h3>
              <button className="button button-secondary" onClick={close}>
                <X size={17} /> Fermer l’aperçu
              </button>
            </div>
            {selected.format === "pdf" ? (
              <PdfPreview key={selected.href} href={selected.href} />
            ) : (
              <p>
                Aucun aperçu n’est disponible pour ce format. Téléchargez le
                fichier pour l’ouvrir sur votre appareil.
              </p>
            )}
            <a
              className="button button-secondary"
              href={selected.href}
              download={selected.downloadName}
            >
              <Download size={16} /> Télécharger{" "}
              {selected.format === "pdf" ? "le PDF" : "le fichier"}
            </a>
          </div>
        )}
      </section>
    </>
  );
}
