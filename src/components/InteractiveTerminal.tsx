import { useEffect, useRef, useState, type FormEvent } from "react";
import { Terminal, X } from "lucide-react";
import { education, experiences, profile, skillGroups } from "../data/profile";
import { projects } from "../data/projects";

export default function InteractiveTerminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Bienvenue dans mon portfolio, version terminal.",
    "Tapez help pour découvrir les commandes.",
    "",
  ]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const oldOverflow = document.body.style.overflow;
    dialog?.showModal();
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [isOpen]);
  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  const commands: Record<string, () => string[]> = {
    help: () => [
      "Les commandes disponibles :",
      "about · Mon profil",
      "skills · Compétences",
      "projects · Réalisations",
      "experience · Expériences",
      "education · Formation",
      "contact · Coordonnées",
      "social · Liens",
      "clear · Effacer",
      "exit · Fermer",
    ],
    about: () => [
      profile.name,
      `${profile.degree} · ${profile.school} · ${profile.academicYear}`,
      "À la recherche d’une alternance en administration systèmes, réseaux et cybersécurité.",
      "Une double compétence : administration IT et développement full stack.",
    ],
    skills: () =>
      skillGroups.flatMap((group) => [
        group.title,
        `  ${group.skills.join(" / ")}`,
        "",
      ]),
    projects: () =>
      projects.flatMap((project) => [
        project.title,
        project.period,
        project.summary,
        "",
      ]),
    experience: () =>
      experiences.flatMap((item) => [
        `${item.company} · ${item.role}`,
        item.period,
        "",
      ]),
    education: () =>
      education.flatMap((item) => [
        `${item.period} · ${item.school}`,
        item.title,
        "",
      ]),
    contact: () => [
      profile.email,
      profile.phone,
      `${profile.location}, France`,
    ],
    social: () => [profile.github, profile.linkedin],
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") setHistory([]);
    else if (command === "exit") onClose();
    else {
      const output = Object.prototype.hasOwnProperty.call(commands, command)
        ? commands[command]()
        : [
            `Commande inconnue : ${command}`,
            "Tapez help pour afficher les commandes.",
          ];
      setHistory((previous) => [...previous, `$ ${input}`, ...output, ""]);
    }
    setInput("");
  };
  return (
    <dialog
      ref={dialogRef}
      className="terminal-dialog"
      aria-labelledby="terminal-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="terminal-header">
        <span id="terminal-title">
          <Terminal size={17} /> jean-jaures@portfolio:~
        </span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Fermer le terminal"
        >
          <X size={19} />
        </button>
      </div>
      <div
        className="terminal-output"
        ref={outputRef}
        role="log"
        aria-live="polite"
      >
        {history.map((line, index) => (
          <div
            key={index}
            className={line.startsWith("$") ? "terminal-command" : ""}
          >
            {line || "\u00a0"}
          </div>
        ))}
      </div>
      <form className="terminal-input" onSubmit={handleSubmit}>
        <span aria-hidden="true">$</span>
        <label className="sr-only" htmlFor="terminal-command">
          Commande du terminal
        </label>
        <input
          id="terminal-command"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="help"
        />
      </form>
    </dialog>
  );
}
