# Maîtrise RGE — site vitrine

Site de Maîtrise RGE, entreprise de rénovation énergétique : présentation des prestations,
simulateur d'aides, espace Conseils et formulaires reliés à un Google Sheet.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · zod.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis compléter les valeurs
npm run dev
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | serveur de développement (http://localhost:3000) |
| `npm run build` / `npm start` | build et serveur de production |
| `npm run lint` | ESLint |
| `npm run brand` | régénère logo, icônes et image de partage depuis `assets-src/logo-original.jpeg` |
| `npm run qa` | captures et contrôles mobile / tablette / ordinateur (Edge requis, serveur lancé) |

## Routes

`/`, `/simulateur`, `/conseils`, `/conseils/[slug]`, `/mentions-legales`, `/confidentialite`,
`/cookies`, ainsi que `/sitemap.xml`, `/robots.txt` et l'API `POST /api/leads`.

## Où modifier quoi

| Sujet | Fichier |
| --- | --- |
| Téléphone, email, adresse, zone d'intervention | `src/config/site.ts` |
| Qualifications, dispositifs, marques (affichés seulement si justifiés) | `src/config/trust.ts` |
| Informations légales | `src/config/legal.ts` |
| Traceurs soumis au consentement | `src/config/consent.ts` |
| Prestations | `src/content/services.ts` |
| Accompagnement et FAQ | `src/content/home.ts` |
| Articles Conseils | `src/content/articles.ts` |
| Photos et crédits | `src/content/photos.ts` |
| Barèmes du simulateur | `src/lib/simulator/rules.ts` |
| Plafonds de revenus | `src/lib/simulator/income-ceilings.ts` |
| Règles de calcul (cumul, plafonnement, remise) | `src/lib/simulator/calculate.ts` |

## Mode revue et contenus à valider

Le **mode revue** est actif en local et sur les prévisualisations Vercel, inactif en production
(forçable avec `SITE_REVIEW_MODE`). Il affiche des badges « À confirmer » sur tout ce qui attend
une validation du client. En production, ces éléments sont masqués ou neutralisés :

- **Simulateur** : `rules.ts` contient des montants **fictifs** (`status: "exemple"`). En revue, ils
  s'affichent avec un bandeau « Exemple — données fictives ». En production, aucun montant n'est
  affiché ni envoyé au navigateur : le parcours se termine par une demande d'étude personnalisée.
  Pour activer l'estimation réelle, renseigner les tarifs et barèmes validés puis passer
  `status` à `"valide"`.
- **Plafonds de revenus** : grille Anah 2025 marquée `verified: false` ; à contrôler sur
  [anah.gouv.fr](https://www.anah.gouv.fr/) puis passer `verified` à `true`.
- **Qualifications et marques** (RGE, MaPrimeRénov', CEE, De Dietrich, Atlantic, Chappée) :
  affichées uniquement avec `confirmed: true` et un justificatif dans `proof`.
- **Articles** : statut `a-valider` → non indexés (`noindex`) et absents du sitemap. Passer à
  `publie` après relecture des points listés dans `toCheck`.
- **Pages légales** : chaque information manquante apparaît « À compléter ».
- **Remise commerciale** : définie dans `rules.ts` (`discount`), toujours présentée séparément
  des aides publiques. Aucune promesse de paiement limité au reste à charge n'est affichée.

## Google Sheets

1. Créer un compte de service Google Cloud et activer l'API Google Sheets.
2. Partager le Google Sheet du client en **Éditeur** avec l'email du compte de service.
3. Créer l'onglet `Demandes` avec la ligne d'en-tête suivante (ordre des colonnes) :
   `Date, Provenance, Prénom, Nom, Téléphone, Email, Code postal, Logement, Travaux, Message,
   Accord recontact, Chauffage actuel, Région, Personnes au foyer, Revenus, Statut barème,
   Coût travaux (€), MaPrimeRénov' (€), CEE (€), Remise Maîtrise RGE (€),
   Total aides et remise (€), Part financée (%), Reste à charge (€)`
   (liste de référence : `SHEET_HEADERS` dans `src/lib/leads/row.ts`).
4. Renseigner les variables `GOOGLE_*` (voir `.env.example`) dans Vercel.

Les deux formulaires écrivent dans le même onglet (`Provenance` = `simulateur` ou `contact`).
Le serveur valide les données (zod), applique un champ piège, un délai minimal de saisie, une
vérification d'origine et une limitation par IP. Le résultat de simulation est **recalculé côté
serveur** ; le visiteur ne voit le message de succès qu'après confirmation d'écriture par Google.

## Avant la mise en ligne

- [ ] Coordonnées dans `site.ts` (le téléphone devient cliquable automatiquement)
- [ ] Textes et informations légales dans `legal.ts`
- [ ] Justificatifs des qualifications et marques dans `trust.ts`
- [ ] Barèmes, tarifs et remise validés dans `rules.ts`, grille de revenus vérifiée
- [ ] Relecture et publication des articles
- [ ] Variables d'environnement Google et `NEXT_PUBLIC_SITE_URL` sur Vercel
- [ ] Remplacement des photos d'illustration par des photos de chantiers réels
