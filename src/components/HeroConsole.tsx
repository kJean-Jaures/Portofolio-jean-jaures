import { useState } from "react";
import { ArrowUpRight, Check, Copy, MapPin, Terminal } from "lucide-react";
import { profile } from "../data/profile";
import { TiltCard } from "./visuals/Reveal";

const commands = [
  {
    id: "whoami",
    label: "whoami",
    lines: [
      "Kouamé Jean-Jaures KOUASSI",
      "Réseaux & SecOps / Développement",
      "Bachelor 3 · IPSSI · 2026–2027",
    ],
  },
  {
    id: "skills",
    label: "ls skills",
    lines: [
      "systèmes/  réseaux/  sécurité/",
      "full-stack/  design/  supervision/",
      "Linux · React · Bash · Grafana",
    ],
  },
  {
    id: "contact",
    label: "contact",
    lines: [profile.email, profile.phone, "À la recherche d’une alternance"],
  },
];

export default function HeroConsole({
  onOpenTerminal,
}: {
  onOpenTerminal: () => void;
}) {
  const [active, setActive] = useState("whoami");
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const selected = commands.find((command) => command.id === active)!;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  };
  return (
    <TiltCard className="hero-console-tilt">
      <div className="hero-console">
        <div className="console-topbar">
          <div className="console-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>jean-jaures@portfolio:~</span>
          <Terminal size={14} />
        </div>
        <div className="console-profile">
          <span className="console-avatar">
            JJ
            <span />
          </span>
          <div>
            <strong>Mon univers technique</strong>
            <span>Entre infrastructure et création.</span>
          </div>
          <span className="console-profile-symbol" aria-hidden="true">
            &lt;/&gt;
          </span>
        </div>
        <div
          className="console-tabs"
          role="group"
          aria-label="Explorer mon profil"
        >
          {commands.map((command) => (
            <button
              key={command.id}
              className={active === command.id ? "is-selected" : ""}
              aria-pressed={active === command.id}
              onClick={() => setActive(command.id)}
            >
              {command.label}
            </button>
          ))}
        </div>
        <div className="console-output" aria-live="polite">
          <p>
            <span>❯</span> {selected.label}
            <span className="console-cursor" aria-hidden="true">
              ▋
            </span>
          </p>
          {selected.lines.map((line, index) => (
            <div
              key={line}
              className={index === 0 ? "console-output-primary" : ""}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="console-location">
          <MapPin size={13} /> {profile.location}
          <span>Alternance recherchée</span>
        </div>
        <div className="console-actions">
          <button onClick={onOpenTerminal}>
            <Terminal size={15} /> Explorer le terminal{" "}
            <ArrowUpRight size={14} />
          </button>
          <button
            onClick={copy}
            aria-label="Copier mon adresse email"
            title="Copier mon adresse email"
          >
            {copyState === "success" ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <span role="status" className="console-copy-status">
          {copyState === "success"
            ? "Adresse email copiée."
            : copyState === "error"
              ? `Copie indisponible : ${profile.email}`
              : ""}
        </span>
      </div>
    </TiltCard>
  );
}
