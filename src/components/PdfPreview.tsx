import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export default function PdfPreview({ href }: { href: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(280);
  const [error, setError] = useState(false);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let task:
      ReturnType<(typeof import("pdfjs-dist"))["getDocument"]> | undefined;
    setError(false);
    void (async () => {
      const pdf = await import("pdfjs-dist");
      const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
      if (cancelled) return;
      pdf.GlobalWorkerOptions.workerSrc = worker.default;
      task = pdf.getDocument({ url: href });
      const loaded = await task.promise;
      if (!cancelled) setDocument(loaded);
    })().catch(() => {
      if (!cancelled) setError(true);
    });
    return () => {
      cancelled = true;
      void task?.destroy();
    };
  }, [href]);

  useEffect(() => {
    if (!document) return;
    let cancelled = false;
    let render:
      | ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]>
      | undefined;
    setRendering(true);
    void document
      .getPage(page)
      .then(async (pdfPage) => {
        if (cancelled || !canvas.current) return;
        const scale = (width / pdfPage.getViewport({ scale: 1 }).width) * zoom;
        const viewport = pdfPage.getViewport({ scale });
        const ratio = window.devicePixelRatio || 1;
        const element = canvas.current;
        element.width = Math.floor(viewport.width * ratio);
        element.height = Math.floor(viewport.height * ratio);
        element.style.width = `${viewport.width}px`;
        element.style.height = `${viewport.height}px`;
        render = pdfPage.render({
          canvas: element,
          viewport,
          transform: [ratio, 0, 0, ratio, 0, 0],
        });
        await render.promise;
        if (!cancelled) setRendering(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
      render?.cancel();
    };
  }, [document, page, width, zoom]);

  return (
    <div ref={container} className="pdf-preview">
      {error ? (
        <p role="alert">
          Impossible d’afficher ce PDF. Vous pouvez le télécharger pour le lire.
        </p>
      ) : (
        <>
          <div className="preview-controls">
            <button
              className="button button-secondary"
              disabled={!document || page === 1}
              onClick={() => setPage(page - 1)}
            >
              Précédente
            </button>
            <span aria-live="polite">
              Page {page} / {document?.numPages ?? "…"}
            </span>
            <button
              className="button button-secondary"
              disabled={!document || page === document.numPages}
              onClick={() => setPage(page + 1)}
            >
              Suivante
            </button>
            <label>
              Zoom{" "}
              <select
                aria-label="Zoom du PDF"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
              >
                <option value={1}>Ajuster</option>
                <option value={1.5}>150 %</option>
                <option value={2}>200 %</option>
              </select>
            </label>
          </div>
          {rendering && <p role="status">Chargement de la page…</p>}
          <div
            className="pdf-scroll"
            aria-busy={rendering}
            tabIndex={0}
            aria-label="Page du PDF, défilement horizontal disponible avec le zoom"
          >
            <canvas
              ref={canvas}
              role="img"
              aria-label={`Page ${page} du document PDF`}
            />
          </div>
          <a href={href} target="_blank" rel="noopener noreferrer">
            Ouvrir le PDF original (texte et lecteur externe)
          </a>
        </>
      )}
    </div>
  );
}
