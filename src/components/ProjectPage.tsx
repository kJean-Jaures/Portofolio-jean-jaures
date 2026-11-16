import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Check, Layers } from "lucide-react";
import { projects } from "../data/projects";
import ProjectResources from "./ProjectResources";
import ProjectArtwork from "./ProjectArtwork";
import Atmosphere from "./visuals/Atmosphere";

export default function ProjectPage() {
  const id = new URLSearchParams(window.location.search).get("projet");
  const project = projects.find((item) => item.id === id);
  useEffect(() => {
    document.title = `${project?.title ?? "Projet introuvable"} | Jean-Jaures KOUASSI`;
  }, [project]);
  return (
    <>
      <Atmosphere />
      <a className="skip-link" href="#project-main">
        Aller au projet
      </a>
      <header className="project-page-header">
        <a className="button button-secondary" href="./#experiences">
          <ArrowLeft size={18} /> Retour au portfolio
        </a>
        <span>Jean-Jaures KOUASSI / Projets</span>
      </header>
      <main
        id="project-main"
        className="project-page"
        aria-labelledby="project-title"
      >
        {project ? (
          <article className={`project-page-content project-${project.id}`}>
            <div className="dialog-art">
              <ProjectArtwork project={project} modal />
            </div>
            <div className="dialog-copy">
              <p className="eyebrow">
                {project.company} / {project.category}
              </p>
              <h1 id="project-title">{project.title}</h1>
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
              <ProjectResources key={project.id} project={project} />
              <h2>Le contexte</h2>
              <p>{project.context}</p>
              <h2>Ce que j’ai fait</h2>
              <ul className="contribution-list">
                {project.contributions.map((text) => (
                  <li key={text}>
                    <Check size={17} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className="deliverables-panel">
                <h2>
                  <Layers size={18} /> Réalisations & livrables
                </h2>
                <ul>
                  {project.deliverables.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </div>
              <h2>Outils & compétences mobilisés</h2>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a className="button button-primary" href="./#contact">
                Échanger sur cette expérience <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ) : (
          <div className="dialog-copy">
            <h1 id="project-title">Projet introuvable</h1>
            <p>
              Ce projet n’est pas disponible. Retrouvez les projets depuis le
              portfolio.
            </p>
            <a className="button button-primary" href="./#experiences">
              Voir les projets
            </a>
          </div>
        )}
      </main>
    </>
  );
}
