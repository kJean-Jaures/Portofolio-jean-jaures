# Mon portfolio — Jean-Jaures KOUASSI

Bienvenue sur mon portfolio ! Je m’appelle Kouamé Jean-Jaures KOUASSI et je suis étudiant en Bachelor 3 Administrateur Réseaux & SecOps à l’IPSSI, en Île-de-France.

Je m’intéresse aux systèmes, aux réseaux et à la sécurité informatique. Je fais aussi du développement web et du graphisme en freelance. J’aime comprendre comment les choses fonctionnent, résoudre des problèmes et créer des projets que l’on peut vraiment utiliser.

[Voir mon portfolio](https://portofolio-jean-jaures.vercel.app)

## Pourquoi ce site ?

J’ai voulu réunir mon parcours, mes expériences et mes réalisations au même endroit. On y retrouve mes stages chez Arescom et Meraky, mes projets en systèmes et réseaux, ainsi que mon travail en développement web et en design.

J’avais aussi envie que le site reflète mon goût pour la tech. J’ai donc choisi un univers sombre, un fond étoilé et des animations 3D, avec quelques éléments interactifs comme le clavier et le terminal. Le site s’adapte au téléphone et les animations peuvent être mises en pause.

## Quelques projets à découvrir

- **WiSafe** : un projet de portail captif sur Raspberry Pi, autour de l’accès au réseau et de sa sécurisation. [Voir le portail](https://kjean-jaures.github.io/portail-captif-Pi-ESIEA/).
- **Fashion Afro Braids** : une application web développée pour un salon de coiffure, avec des parcours de réservation et une boutique. [Voir le site](https://fashionafrobraids.fr).
- **Mes créations graphiques** : logos, identités visuelles, affiches, flyers et maquettes d’interfaces.

Les fiches du portfolio présentent mon rôle, ce que j’ai réalisé et les outils utilisés. Mon CV est également disponible sur le site.

## Avec quoi je l’ai développé

Le code est écrit en **TypeScript**, avec du **HTML** et du **CSS** pour la structure et la mise en forme.

- **React** pour construire les pages et les composants interactifs.
- **Three.js** pour les scènes 3D.
- **Framer Motion** pour les animations d’interface.
- **Lucide** et **Devicon** pour les icônes et les logos des technologies.
- **Vite** pour lancer le site en local et préparer la version de production.
- **Resend**, via une fonction serveur sur Vercel, pour l’envoi des messages. La version GitHub Pages utilise cette même fonction Vercel.

## Lancer le projet en local

Avec Node.js et npm installés :

```sh
git clone https://github.com/kJean-Jaures/Portofolio-jean-jaures.git
cd Portofolio-jean-jaures
npm ci
npm run dev
```

Pour vérifier le TypeScript et générer le site dans le dossier `dist` :

```sh
npm run typecheck
npm run build
```

Les informations de mon profil et les projets se trouvent dans `src/data`. Les composants sont dans `src/components` et les styles dans `src/index.css`.

La configuration du formulaire est expliquée dans [le guide de contact](docs/contact.md). Sur Vercel, la variable serveur `RESEND_API_KEY` doit être renseignée pour activer l’envoi.

## Me contacter

- [LinkedIn](https://www.linkedin.com/in/k-kouassi)
- [GitHub](https://github.com/kJean-Jaures)
- [kouassijaures605@gmail.com](mailto:kouassijaures605@gmail.com)
