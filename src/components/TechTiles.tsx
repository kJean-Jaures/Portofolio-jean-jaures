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
import { Reveal, TiltCard } from "./visuals/Reveal";

const technologies = [
  { name: "HTML", image: html },
  { name: "CSS", image: css },
  { name: "React", image: react },
  { name: "TypeScript", image: ts },
  { name: "Next.js", image: next },
  { name: "Node.js", image: node },
  { name: "PHP", image: php },
  { name: "MySQL", image: mysql },
  { name: "Linux", image: linux },
  { name: "Git", image: git },
  { name: "Figma", image: figma },
  { name: "Canva", image: canva },
];
export default function TechTiles() {
  return (
    <div className="tech-tiles" aria-label="Quelques technologies utilisées">
      {technologies.map(({ name, image }, index) => (
        <Reveal key={name} delay={(index % 6) * 0.045}>
          <TiltCard>
            <div className="tech-tile">
              <span>
                <img src={image} alt="" width="44" height="44" loading="lazy" />
              </span>
              <strong>{name}</strong>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
