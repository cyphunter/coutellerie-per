/**
 * Identifiant unique de CE projet, utilisé comme PRÉFIXE pour toutes les
 * tables D1 dans la base partagée "freelance-shared".
 *
 * Convention :
 *  - ASCII alphanumérique minuscule + underscore
 *  - Doit matcher la valeur de `SITE_ID` dans wrangler.jsonc → vars
 *  - JAMAIS modifié après la première migration (sinon orphelinage des tables)
 */
export const SITE_ID = "coutellerieper" as const;

/**
 * Préfixe utilisé pour nommer toutes les tables D1 de ce projet.
 * Ex: tbl("contact_request") → "coutellerieper_contact_request".
 */
export function tbl(name: string): string {
  return `${SITE_ID}_${name}`;
}
