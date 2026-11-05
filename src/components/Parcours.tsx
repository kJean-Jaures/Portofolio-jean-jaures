import { GraduationCap, ArrowUpRight } from "lucide-react";
import { education } from "../data/profile";
import SectionHeading from "./SectionHeading";

export default function Parcours() {
  return (
    <section id="parcours" className="section section-shell">
      <div className="education-layout">
        <div>
          <SectionHeading
            number="04"
            label="La formation"
            title="Apprendre, puis aller plus loin."
          />
          <p className="section-intro">
            Une base en développement, enrichie par les systèmes, les réseaux et
            la cybersécurité opérationnelle.
          </p>
          <GraduationCap
            className="education-illustration"
            size={88}
            strokeWidth={0.8}
          />
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article
              className={`education-row ${item.current ? "is-current" : ""}`}
              key={item.school}
            >
              <div className="education-date">
                <span>{item.period}</span>
                {item.current && <span className="small-tag">En cours</span>}
              </div>
              <div>
                <p className="education-school">
                  {item.school}
                  {item.current && <ArrowUpRight size={16} />}
                </p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
