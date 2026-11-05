import { Monitor, Network, ShieldCheck, Wifi } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectArtwork({
  project,
  modal = false,
}: {
  project: Project;
  modal?: boolean;
}) {
  if (project.image)
    return (
      <img
        className={modal ? "dialog-image" : ""}
        src={project.image}
        alt={project.imageAlt || project.title}
        width="960"
        height="540"
        loading={modal ? "eager" : "lazy"}
      />
    );
  return (
    <div className="infrastructure-art" aria-hidden="true">
      <div className="rack-grid" />
      <div className="rack-visual">
        <div className="rack-top">
          <Network size={30} />
          <span>INFRASTRUCTURE</span>
        </div>
        {["SYSTÈMES", "RÉSEAUX", "SUPPORT IT"].map((label, index) => (
          <div className="rack-unit" key={label}>
            <span className={`rack-light light-${index}`} />
            <span>{label}</span>
            <i />
            <i />
            <i />
          </div>
        ))}
      </div>
      <span className="rack-satellite satellite-monitor">
        <Monitor size={27} />
      </span>
      <span className="rack-satellite satellite-shield">
        <ShieldCheck size={27} />
      </span>
      <span className="rack-satellite satellite-wifi">
        <Wifi size={25} />
      </span>
    </div>
  );
}
