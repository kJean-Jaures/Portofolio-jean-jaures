import { useRef, useState } from "react";
import { Download, Eye, X } from "lucide-react";
import type { Project, ProjectFile } from "../data/projects";
import PdfPreview from "./PdfPreview";

export default function ProjectFiles({ project }: { project: Project }) {
  const [selected, setSelected] = useState<ProjectFile | null>(null);
  const [imageZoom, setImageZoom] = useState(false);
  const [imageError, setImageError] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const files: ProjectFile[] = [
    ...(project.files ?? []),
    ...(project.image
      ? [
          {
            label: `Illustration — ${project.title}`,
            href: project.image,
            format: "image" as const,
            downloadName: `${project.id}-illustration.webp`,
          },
        ]
      : []),
  ];
  function close() {
    setSelected(null);
    trigger.current?.focus();
  }
  return (
    <section className="project-files" aria-label="Fichiers du projet">
      <h3>Fichiers disponibles</h3>
      {!project.files?.length && (
        <p className="missing-document">
          Aucun document de projet n’est disponible dans le dépôt.
          {project.image
            ? " Seule l’illustration ci-dessous est disponible."
            : ""}
        </p>
      )}
      <ul className="project-file-list">
        {files.map((file) => (
          <li key={file.href}>
            <div>
              <strong>{file.label}</strong>
              <small>
                {file.format === "pdf"
                  ? "PDF"
                  : file.format === "image"
                    ? "Image · illustration"
                    : "Fichier"}
              </small>
            </div>
            <div className="file-actions">
              <button
                className="button button-secondary"
                aria-label={`Consulter — ${file.label}`}
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setImageZoom(false);
                  setImageError(false);
                  setSelected(file);
                  requestAnimationFrame(() => {
                    preview.current?.focus();
                    preview.current?.scrollIntoView({
                      block: "start",
                      behavior: "instant",
                    });
                  });
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
      {selected && (
        <div
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
          {selected.format === "pdf" ? (
            <PdfPreview key={selected.href} href={selected.href} />
          ) : selected.format === "image" ? (
            <>
              {imageError ? (
                <p role="alert">
                  L’image ne peut pas être affichée. Vous pouvez la télécharger.
                </p>
              ) : (
                <>
                  <button
                    className="button button-secondary"
                    aria-pressed={imageZoom}
                    onClick={() => setImageZoom(!imageZoom)}
                  >
                    {imageZoom ? "Réduire l’image" : "Agrandir l’image"}
                  </button>
                  <div className="image-scroll">
                    <img
                      className={imageZoom ? "is-zoomed" : ""}
                      src={selected.href}
                      alt={project.imageAlt ?? selected.label}
                      onError={() => setImageError(true)}
                    />
                  </div>
                </>
              )}
            </>
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
            <Download size={16} /> Télécharger
          </a>
        </div>
      )}
    </section>
  );
}
