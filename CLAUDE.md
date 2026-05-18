# Coutellerie Per — instructions Claude (spécifiques projet)

> Règles agence : voir `../CLAUDE.md` à la racine de `freelance/`.
> Référence détaillée : voir `../CONVENTIONS.md`.

## Identité du projet

- **Client** : P. et G. Chémereau — SARL Coutellerie Per
- **Activité** : Coutelier artisan d'art (fabrication, affûtage, restauration de couteaux)
- **Site** : `https://coutellerie-per.fr`
- **SITE_ID** : `coutellerieper` (préfixe tables D1)
- **D1** : partagée `freelance-shared` (tables préfixées `coutellerieper_*`)
- **R2 bucket** : `coutellerie-per-media`
- **Email expéditeur** : `contact@coutellerie-per.fr` (Resend)

## Direction artistique

- **Palette** :
  - `ink` `#1a1410` (texte principal — noir chaud acajou)
  - `paper` `#f5efe6` (fond — parchemin chaud)
  - `brand` `#2a1f17` (signature — acajou profond)
  - `brand-accent` `#b8722f` (accent — cuivre forge)
  - `muted` `#6b5d52` (gris brun)
- **Polices** : Inter (body) + Cormorant Garamond (display sérif artisanale)
- **Ton** : artisanal, intemporel, sobre, respect du métier — vocabulaire de coutelier (lame, manche, soie, mitre, damas, trempe, émouture). Pas de jargon marketing.

## Sources de contenu client-éditables

- **`src/lib/site-config.ts`** — coordonnées, navigation, mentions légales, social
- **`src/data/knives.ts`** — catalogue des couteaux (galerie + dernières créations)
- **`src/data/services.ts`** — services proposés (fabrication, affûtage, restauration)
- **`src/data/faq.ts`** — questions fréquentes
- **`src/data/press.ts`** — apparitions presse / TV (France 3, TF1)

## Points d'attention spécifiques

- **Public cible** : amateurs de coutellerie d'art, collectionneurs, chasseurs/pêcheurs, professionnels (cuisiniers, marins), particuliers cherchant une pièce sur-mesure.
- **TF1 (2012)** et **France 3 (2019)** — crédibilité forte, à valoriser sur l'accueil.
- **Pas d'e-commerce direct** : les couteaux sont des pièces uniques, vente sur devis / atelier. CTA = contact / visite atelier.
- **Galerie** : pièces classées par type (pliant, droit, sgian dubh, puukko, ulu, marin).
- **Légal armes** : couteaux libres en vente, mais port et transport encadrés (catégorie D — décret 2013-700). Mention dans FAQ + CGU.
- **Accessibilité** : public possiblement âgé → contrastes élevés, taille de police confortable, pas d'animations agressives.
- **SEO local** : Vannes / Morbihan / Bretagne — JSON-LD `LocalBusiness` avec geo + opening hours + areaServed.
