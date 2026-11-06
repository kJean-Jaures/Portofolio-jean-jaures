import {
  ArrowUpRight,
  Download,
  GraduationCap,
  Network,
  Briefcase,
  Layers,
  Code2,
} from "lucide-react";
import { profile, education, skillGroups } from "../data/profile";
import { projects } from "../data/projects";
import cv from "../assets/CV-Jean-Jaures-KOUASSI.pdf";
import { Reveal } from "./visuals/Reveal";
import CyberPortrait from "./visuals/CyberPortrait";
import CountUp from "./visuals/CountUp";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="apropos" className="section section-shell cosmic-about">
      <SectionHeading
        number="01"
        label="À propos"
        title="Un peu de moi. Beaucoup de curiosité."
      />
      <div className="about-portrait-layout">
        <Reveal className="about-introduction">
          <p className="about-greeting">Salut, moi c’est</p>
          <h3>
            Jean-Jaures
            <br />
            KOUASSI<span>.</span>
          </h3>
          <p>
            La technique m’intéresse.
            <br />
            Ce qu’on peut en faire, encore plus.
          </p>
          <a
            className="button button-primary"
            href={cv}
            download="CV-Kouame-Jean-Jaures-KOUASSI.pdf"
          >
            <Download size={16} /> Découvrir mon CV
          </a>
        </Reveal>
        <Reveal className="portrait-stage" delay={0.1}>
          <CyberPortrait />
        </Reveal>
        <Reveal className="about-biography" delay={0.15}>
          <span className="about-code-label">&lt; à_propos /&gt;</span>
          <p>
            Étudiant en{" "}
            <strong>
              {profile.degree} à l’{profile.school}
            </strong>
            , j’aime comprendre les systèmes, résoudre les incidents et donner
            vie aux idées par le code.
          </p>
          <p>
            Du support IT chez Arescom aux applications développées chez Meraky,
            en passant par WiSafe et mes projets freelance, mon parcours relie{" "}
            <strong>infrastructure et développement</strong>.
          </p>
          <p>
            Je recherche une{" "}
            <strong>alternance en systèmes, réseaux et cybersécurité</strong> en
            Île-de-France.
          </p>
          <a className="text-link" href="#experiences">
            Explorer mes expériences <ArrowUpRight size={16} />
          </a>
          <div className="language-note">
            <span>
              Français <strong>Langue maternelle</strong>
            </span>
            <span>
              Anglais <strong>Intermédiaire</strong>
            </span>
          </div>
        </Reveal>
      </div>
      <div className="about-snapshot">
        <Reveal>
          <article>
            <span className="snapshot-icon">
              <GraduationCap size={21} />
            </span>
            <div>
              <span>Formation actuelle</span>
              <h3>IPSSI · Bachelor 3 Réseaux & SecOps</h3>
              <p>2026–2027 · Administration & cybersécurité opérationnelle</p>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article>
            <span className="snapshot-icon">
              <Network size={21} />
            </span>
            <div>
              <span>Sur le terrain</span>
              <h3>Arescom · Technicien informatique</h3>
              <p>Février–avril 2026 · Support, maintenance & réseaux</p>
            </div>
          </article>
        </Reveal>
      </div>
      <div className="profile-stats">
        {[
          {
            value: projects.length,
            label: "Expériences & réalisations",
            icon: Briefcase,
          },
          {
            value: education.length,
            label: "Étapes de formation",
            icon: GraduationCap,
          },
          {
            value: skillGroups.length,
            label: "Domaines de compétences",
            icon: Layers,
          },
        ].map(({ value, label, icon: Icon }, index) => (
          <Reveal key={label} delay={index * 0.08}>
            <article>
              <div>
                <Icon size={21} />
                <span>{label}</span>
              </div>
              <strong>
                <CountUp value={value} />
              </strong>
              <Code2 className="stat-decoration" size={60} aria-hidden="true" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
