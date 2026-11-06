import html from "devicon/icons/html5/html5-original.svg";
import css from "devicon/icons/css3/css3-original.svg";
import react from "devicon/icons/react/react-original.svg";
import ts from "devicon/icons/typescript/typescript-original.svg";
import next from "devicon/icons/nextjs/nextjs-original.svg";
import node from "devicon/icons/nodejs/nodejs-original.svg";
import php from "devicon/icons/php/php-original.svg";
import mysql from "devicon/icons/mysql/mysql-original.svg";
import linux from "devicon/icons/linux/linux-plain.svg";
import git from "devicon/icons/git/git-original.svg";
import figma from "devicon/icons/figma/figma-original.svg";
import canva from "devicon/icons/canva/canva-original.svg";
import windows from "devicon/icons/windows11/windows11-original.svg";
import grafana from "devicon/icons/grafana/grafana-original.svg";
import bash from "devicon/icons/bash/bash-original.svg";
import github from "devicon/icons/github/github-original.svg";
import trello from "devicon/icons/trello/trello-original.svg";
import express from "devicon/icons/express/express-original.svg";
import flutter from "devicon/icons/flutter/flutter-original.svg";
import photoshop from "devicon/icons/photoshop/photoshop-original.svg";
import pfsense from "devicon/icons/pfsense/pfsense-original.svg";
import { useState } from "react";
import {
  Server,
  Network,
  Activity,
  Code2,
  Database,
  PenTool,
  Search,
  X,
} from "lucide-react";
import javascript from "devicon/icons/javascript/javascript-original.svg";
import { skillGroups } from "../data/profile";
import { Reveal, TiltCard } from "./visuals/Reveal";

const images: Record<string, string> = {
  "Windows Server": windows,
  Grafana: grafana,
  Bash: bash,
  GitHub: github,
  Trello: trello,
  "Express.js": express,
  Flutter: flutter,
  "Adobe Photoshop": photoshop,
  pfSense: pfsense,
  HTML: html,
  CSS: css,
  "React.js": react,
  TypeScript: ts,
  "Next.js": next,
  "Node.js": node,
  PHP: php,
  MySQL: mysql,
  "Linux · Debian, Ubuntu, Raspbian": linux,
  Git: git,
  Figma: figma,
  Canva: canva,
  JavaScript: javascript,
};
const icons = [Server, Network, Activity, Code2, Database, PenTool];
const technologies = skillGroups.flatMap((group, domain) =>
  group.skills.flatMap((skill) =>
    (skill === "HTML & CSS"
      ? ["HTML", "CSS"]
      : skill === "Git & GitHub"
        ? ["Git", "GitHub"]
        : [skill]
    ).map((name) => ({ name, domain, group })),
  ),
);
export default function TechTiles() {
  const [domain, setDomain] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<
    (typeof technologies)[number] | null
  >(null);
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const visible = technologies.filter(
    (tool) =>
      (domain === null || domain === tool.domain) &&
      normalize(tool.name).includes(normalize(query)),
  );
  return (
    <div className="stack-directory">
      <div className="stack-directory-heading">
        <p>
          Toute ma boîte à outils{" "}
          <span>{technologies.length} outils & compétences</span>
        </p>
        <div className="stack-search">
          <Search size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="stack-search">
            Rechercher un outil
          </label>
          <input
            id="stack-search"
            type="search"
            placeholder="Rechercher un outil…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Effacer la recherche"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
      <div
        className="stack-domain-filters"
        role="group"
        aria-label="Filtrer la stack par domaine"
      >
        <button aria-pressed={domain === null} onClick={() => setDomain(null)}>
          Tout
        </button>
        {skillGroups.map((group, index) => (
          <button
            key={group.title}
            aria-pressed={domain === index}
            onClick={() => setDomain(index)}
          >
            {group.title}
          </button>
        ))}
      </div>
      <p className="stack-results" role="status">
        {visible.length} éléments affichés
      </p>
      <div className="tech-tiles">
        {visible.map((tool) => {
          const Icon = icons[tool.domain];
          return (
            <Reveal key={tool.name}>
              <TiltCard>
                <button
                  className="tech-tile"
                  data-domain={tool.domain}
                  aria-pressed={selected?.name === tool.name}
                  onClick={() => setSelected(tool)}
                >
                  <span>
                    {images[tool.name] ? (
                      <img
                        src={images[tool.name]}
                        alt=""
                        width="44"
                        height="44"
                        loading="lazy"
                      />
                    ) : (
                      <Icon size={30} strokeWidth={1.5} />
                    )}
                  </span>
                  <strong>{tool.name}</strong>
                </button>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
      {!visible.length && (
        <p className="stack-empty">
          Aucun résultat. Essayez un autre nom ou le filtre « Tout ».
        </p>
      )}
      {selected && (
        <div className="stack-tool-detail" role="status">
          <strong>{selected.name}</strong>
          <span>{selected.group.title}</span>
          <p>{selected.group.description}</p>
        </div>
      )}
    </div>
  );
}
