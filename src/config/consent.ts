/**
 * Traceurs soumis au consentement.
 *
 * Le site n'utilise aujourd'hui aucun cookie ni traceur soumis au
 * consentement : polices et images sont servies par le site lui-même, et le
 * simulateur ne stocke ses réponses que dans la session du navigateur
 * (stockage nécessaire au service demandé).
 *
 * Si un outil de mesure d'audience ou un service tiers est ajouté, le
 * déclarer ici : le bandeau (accepter / refuser / personnaliser) et le
 * bouton de modification des préférences s'activent automatiquement. Ne
 * charger le script de l'outil que si `hasConsent(id)` renvoie true.
 */
export type ConsentCategory = {
  id: string;
  label: string;
  description: string;
  /** Outils concernés, pour information de l'utilisateur. */
  vendors: string[];
};

export const consentCategories: ConsentCategory[] = [];

/** Version de la configuration : la changer redemande le consentement. */
export const CONSENT_VERSION = 1;
/** Durée de validité d'un choix, conformément aux recommandations de la CNIL. */
export const CONSENT_MAX_AGE_DAYS = 180;
