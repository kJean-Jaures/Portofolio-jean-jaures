# Configurer les messages du portfolio

Sur Vercel, le formulaire passe par `/api/contact` et envoie les emails avec Resend. La clé reste côté serveur. Le destinataire est fixé à `kouassijaures605@gmail.com` et le bouton « Répondre » de l’email reprend l’adresse du visiteur.

## Mise en route

1. Créer un compte sur [Resend](https://resend.com) avec `kouassijaures605@gmail.com` et confirmer l’adresse. Le domaine de test `onboarding@resend.dev` permet uniquement d’écrire à l’adresse du compte Resend.
2. Créer une clé API avec la permission d’envoyer des emails.
3. Dans Vercel, ouvrir le projet du portfolio, puis **Settings → Environment Variables**. Ajouter `RESEND_API_KEY` pour **Production**. Ne pas utiliser de préfixe `VITE_` : la clé ne doit jamais apparaître dans le navigateur ou dans le dépôt.
4. Relancer le déploiement depuis **Deployments → Redeploy** pour charger la variable.
5. Envoyer un message depuis le site et vérifier sa réception, y compris dans les indésirables. Une confirmation du prestataire ne suffit pas à prouver la réception en boîte mail.

Si le compte Resend utilise une autre adresse, il faut d’abord vérifier un domaine d’envoi dans Resend. Ajouter ensuite `CONTACT_FROM_EMAIL` dans Vercel, par exemple `Jean-Jaures KOUASSI <contact@mon-domaine.fr>`.

Si le portfolio change de domaine, ajouter son origine complète dans `CONTACT_ALLOWED_ORIGIN`, par exemple `https://mon-domaine.fr`.

## Vérifications

```sh
node --test tests/contact-api.test.mjs
npm run typecheck
npm run build
```

Les tests du serveur simulent le prestataire et n’envoient aucun email. Pour tester la fonction en local, utiliser `vercel dev` avec les variables locales ; `npm run dev` lance uniquement la partie Vite.

Le serveur contrôle les champs, une origine autorisée, un champ piège et un petit quota par IP sur chaque instance. Ce quota n’est pas partagé entre les instances ; les limites du compte Resend restent importantes. Une clé d’idempotence évite qu’un même message envoyé à nouveau crée plusieurs emails pendant la période de déduplication de Resend.

Sur GitHub Pages, qui ne peut pas exécuter cette fonction, le site conserve le relais FormSubmit. Ce relais nécessite l’activation de l’adresse destinataire et dépend de la disponibilité de FormSubmit.

En cas d’erreur ou de délai dépassé, les champs restent remplis. Le lien vers la messagerie reprend le contenu du message ; il ouvre un brouillon et ne prétend pas avoir envoyé l’email.
