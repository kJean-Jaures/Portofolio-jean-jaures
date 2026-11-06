import fashionImage from "../assets/fashion-afro-braids.webp";
import wisafeImage from "../assets/projet-wisafe.webp";
import freelanceImage from "../assets/graphiste-freelance.webp";
import merakyImage from "../assets/stage-assistant.webp";

export interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  category: string;
  field: "infrastructure" | "development" | "design";
  type: string;
  period: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  context: string;
  contributions: string[];
  deliverables: string[];
  resources?: {
    label: string;
    href: string;
    kind: "demo" | "document" | "pdf";
    downloadName?: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "arescom",
    title: "Au cœur du support IT",
    company: "Arescom",
    role: "Stagiaire technicien informatique",
    category: "Systèmes & réseaux",
    field: "infrastructure",
    type: "Stage",
    period: "Février — Avril 2026",
    summary:
      "Diagnostiquer, dépanner et accompagner les utilisateurs au quotidien. Une expérience concrète de l’exploitation informatique.",
    tags: ["Support IT", "DNS / DHCP", "Maintenance", "Sécurité"],
    context:
      "Chez Arescom, j’ai participé au support technique et à la maintenance des postes utilisateurs. La mission : comprendre les incidents, rétablir les accès et contribuer à la continuité des services.",
    contributions: [
      "Diagnostic et résolution de pannes logicielles et de connexion.",
      "Installation, configuration et mise à jour des postes de travail.",
      "Diagnostics réseau : connectivité, DHCP, DNS, câblage et Wi-Fi.",
      "Participation à la sécurisation des équipements : antivirus, sauvegardes et gestion des droits d’accès.",
    ],
    deliverables: [
      "Postes de travail installés et configurés.",
      "Accès réseau rétablis après diagnostic.",
      "Contribution aux mises à jour et à la protection des équipements.",
    ],
  },
  {
    id: "wisafe",
    title: "WiSafe",
    company: "ESIEA",
    role: "Projet académique · Réseaux & sécurité",
    category: "Réseaux & cybersécurité",
    field: "infrastructure",
    type: "Projet académique",
    period: "Mars — Juillet 2025",
    summary:
      "Un hotspot Wi-Fi sur Raspberry Pi, avec portail captif, contrôle d’accès et supervision du réseau.",
    image: wisafeImage,
    imageAlt: "Portail captif du projet WiSafe, hotspot Wi-Fi sécurisé",
    resources: [
      {
        label: "Voir le portail captif",
        href: "https://kjean-jaures.github.io/portail-captif-Pi-ESIEA/",
        kind: "demo",
      },
      {
        label: "Voir le document sur LinkedIn",
        href: "https://www.linkedin.com/in/k-kouassi/overlay/1754786248894/single-media-viewer/?profileId=ACoAAFkDxVQBP9vFslDwfG0vMxBpG1uDCJBqcdA",
        kind: "document",
      },
    ],
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
    deliverables: [
      "Architecture du hotspot et portail captif.",
      "Configuration du NAT et du pare-feu.",
      "Supervision réseau avec Zabbix et Grafana.",
      "Scripts Bash de déploiement et de configuration.",
    ],
  },
  {
    id: "meraky",
    title: "Du code au travail d’équipe",
    company: "Meraky",
    role: "Assistant chef de projet",
    category: "Développement web & mobile",
    field: "development",
    type: "Stage de fin d’études",
    period: "Décembre 2023 — Mars 2024",
    summary:
      "Développer des applications web et mobiles, participer aux choix techniques et suivre l’avancement des projets.",
    image: merakyImage,
    imageAlt: "Illustration de mon expérience en développement web et mobile",
    tags: ["React.js", "Node.js", "Flutter", "Gestion de projet"],
    context:
      "Stage de fin d’études chez Meraky en tant qu’assistant chef de projet. J’ai contribué au développement des applications et à la coordination avec l’équipe.",
    contributions: [
      "Développement d’applications web et mobiles avec React.js, Node.js et Flutter.",
      "Participation aux choix techniques et à la définition de l’architecture.",
      "Réalisation de tests fonctionnels avant livraison.",
      "Rédaction de documentation technique pour la maintenance et la prise en main.",
      "Suivi de l’avancement du projet et coordination avec l’équipe.",
    ],
    deliverables: [
      "Contribution au développement des applications.",
      "Tests fonctionnels des fonctionnalités.",
      "Documentation technique et suivi d’avancement.",
    ],
  },
  {
    id: "freelance",
    title: "Fashion Afro Braids Paris",
    company: "Freelance · Développement",
    role: "Développeur full stack · Réalisé seul",
    category: "Développement web",
    field: "development",
    type: "Indépendant",
    period: "Depuis 2023",
    summary:
      "Une application pour un salon de coiffure, conçue et développée seul : réservation, boutique et interfaces responsives.",
    image: fashionImage,
    imageAlt:
      "Accueil de l’application Fashion Afro Braids Paris développée pour une cliente",
    resources: [
      {
        label: "Voir Fashion Afro Braids",
        href: "https://fashionafrobraids.fr",
        kind: "demo",
      },
      {
        label: "Présentation du projet",
        href: "https://github.com/kJean-Jaures/Fashionafrobraids-presentation",
        kind: "document",
      },
    ],
    tags: ["React", "Next.js", "TypeScript", "Node.js", "SEO"],
    context:
      "J’ai réalisé seul Fashion Afro Braids Paris, de la conception à la mise en ligne. Cette application pour un salon de coiffure réunit la présentation des prestations, les réservations et une boutique. J’ai pris en charge les interfaces, le développement et l’intégration des services.",
    contributions: [
      "Développement d’interfaces responsives adaptées au téléphone.",
      "Construction des parcours de réservation et de la boutique Fashion Afro Braids.",
      "Intégration des fonctionnalités serveur, des données et des services externes.",
      "Optimisation du référencement, hébergement et mise en ligne.",
    ],
    deliverables: [
      "Sites vitrines et e-commerce responsives.",
      "Application Fashion Afro Braids Paris et ses parcours de réservation.",
      "Mise en ligne et optimisation SEO.",
    ],
  },
  {
    id: "design",
    title: "Identités visuelles & interfaces",
    company: "Freelance · Design",
    role: "Graphiste & designer UI/UX",
    category: "Design & communication",
    field: "design",
    type: "Indépendant",
    period: "Depuis 2023",
    summary:
      "Transformer une idée en langage visuel : logos, chartes graphiques, supports de communication et maquettes d’interfaces.",
    image: freelanceImage,
    imageAlt:
      "Illustration de mon activité de graphisme et de création d’identités visuelles",
    tags: ["Figma", "Canva", "Photoshop", "InDesign", "UI/UX"],
    context:
      "J’accompagne les projets dans leur expression visuelle, avec des identités cohérentes et des interfaces claires, adaptées aux besoins de chaque client.",
    contributions: [
      "Création de logos et de chartes graphiques.",
      "Réalisation d’affiches, de flyers et de supports de communication.",
      "Conception de maquettes UI/UX avec Figma et Canva.",
      "Déclinaison de l’identité visuelle sur les supports numériques et imprimés.",
    ],
    deliverables: [
      "Logos et chartes graphiques.",
      "Affiches, flyers et supports de communication.",
      "Maquettes d’interfaces UI/UX.",
    ],
  },
];
