import wisafeImage from "../assets/projet-wisafe.webp";
import freelanceImage from "../assets/graphiste-freelance.webp";

export interface Project {
  id: string;
  title: string;
  category: string;
  period: string;
  summary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  context: string;
  contributions: string[];
}

export const projects: Project[] = [
  {
    id: "wisafe",
    title: "WiSafe",
    category: "Réseaux & cybersécurité",
    period: "ESIEA · Mars — Juillet 2025",
    summary:
      "Un hotspot Wi-Fi sur Raspberry Pi, avec portail captif, contrôle d’accès et supervision du réseau.",
    image: wisafeImage,
    imageAlt: "Illustration du projet WiSafe, hotspot Wi-Fi sécurisé",
    tags: ["Raspberry Pi", "Bash", "Zabbix", "Grafana", "Pare-feu"],
    context:
      "Un projet académique réalisé à l’ESIEA pour concevoir un hotspot Wi-Fi sécurisé. Une mise en pratique de l’architecture réseau, de l’authentification et de la supervision.",
    contributions: [
      "Conception de l’architecture du hotspot sur Raspberry Pi.",
      "Développement d’un portail captif pour l’authentification et le contrôle d’accès.",
      "Supervision avec Zabbix et Grafana : disponibilité, connexions et charge.",
      "Configuration du NAT et du pare-feu pour filtrer et sécuriser les flux.",
      "Automatisation du déploiement et de la configuration avec des scripts Bash.",
    ],
  },
  {
    id: "freelance",
    title: "Du besoin à la mise en ligne",
    category: "Web & identité visuelle",
    period: "Freelance · Depuis 2023",
    summary:
      "Sites vitrines, e-commerce et identités visuelles : accompagner les projets du premier croquis au lancement.",
    image: freelanceImage,
    imageAlt: "Illustration de mon activité de création web et graphique",
    tags: ["Responsive", "SEO", "Full stack", "Figma", "Design"],
    context:
      "Dans mon activité freelance, j’associe développement web et graphisme pour proposer des interfaces adaptées aux besoins de chaque client et une identité visuelle cohérente.",
    contributions: [
      "Conception de maquettes UI/UX avec Figma et Canva.",
      "Développement de sites vitrines et e-commerce responsives.",
      "Choix des technologies selon les besoins du projet.",
      "Optimisation SEO, hébergement et mise en ligne.",
      "Création de logos, chartes graphiques, affiches et flyers.",
    ],
  },
];
