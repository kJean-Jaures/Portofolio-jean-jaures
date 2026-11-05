import { Code2, Headphones, Network } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/profile";

const strengths = [
  {
    icon: Network,
    title: "Comprendre l’infrastructure",
    text: "Systèmes, réseaux et sécurité : une vision d’ensemble pour diagnostiquer les incidents et maintenir les services.",
  },
  {
    icon: Code2,
    title: "Parler aussi le langage du code",
    text: "Une expérience en développement full stack pour faire le lien entre les besoins applicatifs et les contraintes d’exploitation.",
  },
  {
    icon: Headphones,
    title: "Garder l’utilisateur au centre",
    text: "Écouter, expliquer et résoudre les problèmes avec rigueur, réactivité et sens du service.",
  },
];

export default function About() {
  return (
    <section id="apropos" className="section section-shell">
      <div className="about-layout">
        <SectionHeading
          number="01"
          label="Le profil"
          title="La technique, au service des autres."
        />
        <div className="about-copy">
          <p>
            J’aime comprendre comment les choses fonctionnent. Et surtout,
            trouver pourquoi elles ne fonctionnent plus.
          </p>
          <p>
            Mon parcours m’a conduit du développement d’applications à
            l’administration des systèmes et réseaux. Aujourd’hui, je poursuis
            un{" "}
            <strong>
              {profile.degree} à l’{profile.school}
            </strong>
            , avec l’envie de contribuer à la fiabilité et à la sécurité d’un
            environnement IT.
          </p>
          <p>
            Je recherche une{" "}
            <strong>
              alternance en administration systèmes, réseaux et cybersécurité
            </strong>{" "}
            en Île-de-France, pour apprendre au contact d’une équipe et
            m’investir durablement dans ses projets.
          </p>
          <div className="language-note">
            <span>
              Français <strong>Langue maternelle</strong>
            </span>
            <span>
              Anglais <strong>Intermédiaire</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="strengths-grid">
        {strengths.map(({ icon: Icon, title, text }, index) => (
          <article className="strength-card" key={title}>
            <div className="card-topline">
              <Icon size={24} strokeWidth={1.6} />
              <span>0{index + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
