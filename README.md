# Portfolio — Kouamé Jean-Jaures KOUASSI

Portfolio React, TypeScript et Vite : systèmes, réseaux, SecOps et développement full stack.

## Développement

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Les informations du profil se trouvent dans `src/data/profile.ts`. Les quatre expériences et leurs fiches détaillées sont dans `src/data/projects.ts`. Les scènes 3D sont réalisées avec Three.js dans `src/components/visuals/TechScene.tsx` ; elles sont chargées séparément, arrêtent leur rendu lorsqu’elles quittent l’écran et disposent d’un visuel de repli sans WebGL. Le bouton de pause et la préférence système de réduction des animations sont pris en compte.

## Réception des messages

Le formulaire effectue un véritable POST vers `https://formsubmit.co/ajax/kouassijaures605@gmail.com`. Aucun message n’est enregistré fictivement et aucune clé privée n’est nécessaire dans le navigateur. Le visiteur ne voit un succès qu’après confirmation explicite du service ; une erreur, un délai dépassé ou une demande d’activation conservent les champs et proposent le contact direct par email.

L’adresse destinataire doit avoir été **activée chez FormSubmit**. Au premier envoi, le propriétaire peut recevoir un email de confirmation : ouvrir le lien d’activation, puis effectuer un nouvel envoi. Vérifier aussi les courriers indésirables. Une réponse du service n’est pas une preuve de réception dans la boîte mail ; cette dernière vérification nécessite de consulter la messagerie destinataire.

Pour tester depuis un environnement cloud restreint, autoriser `formsubmit.co` dans les accès Internet de cet environnement. Le site public utilise la connexion Internet du visiteur. Les tests automatisés des cas d’échec et de succès interceptent les requêtes pour éviter des envois multiples ; un essai réel et la confirmation de réception restent distincts.
