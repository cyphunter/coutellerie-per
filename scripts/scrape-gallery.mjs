/**
 * Télécharge les images full-size de la galerie source
 * (https://coutellerie-per.france-artisanat.fr/galerie.html) et les sauvegarde
 * dans `public/images/knives/source/` avec un nom de fichier en kebab-case FR.
 *
 * Utilisation : `node scripts/scrape-gallery.mjs`
 *
 * Étape suivante : `node scripts/convert-gallery.mjs` (jpg → webp via ffmpeg).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = path.resolve(__dirname, "..", "public", "images", "knives", "source");

const BASE = "https://www.france-artisanat.fr/fa/uploadify/uploads-folder";

/** @type {{ slug: string; hash: string; alt: string }[]} */
const ITEMS = [
  { slug: "sgian-dubh-classique",      hash: "5fe443e284da5afc17fd030c11943258", alt: "Sgian dubh" },
  { slug: "pliant-damas",              hash: "ca466509bef5836d94eb6d58bf9203de", alt: "Couteau pliant lame damas" },
  { slug: "puukko-damas",              hash: "13ae9be92a0b2c019870db177f6c3d14", alt: "Puukko lame damas" },
  { slug: "droit-brut-de-forge",       hash: "21a377ac1aa848dec511481e28e05b8e", alt: "Couteau droit brut de forge" },
  { slug: "ulu-classique",             hash: "c81eccf974082b9fb799cc1c3d1d59e5", alt: "Ulu" },
  { slug: "pliant-os-scrimshaw",       hash: "75daf273a4f1016c3778450f648262eb", alt: "Couteau pliant manche en os avec scrimshaw" },
  { slug: "pliant-carbone-damas",      hash: "4018652974c6fc9f820394f2d8517267", alt: "Couteau pliant manche fibre de carbone et lame damas" },
  { slug: "puukko-if",                 hash: "4f0e4a417da1dadf01f9ac935ba1762c", alt: "Puukko brut de forge manche et étui en if" },
  { slug: "pliant-g10",                hash: "2cd1c5e4f7b6e12eee7b15a96394beed", alt: "Couteau pliant manche en G10" },
  { slug: "sgian-dubh-morta-i",        hash: "225c18f93006992aa296188cb2462bea", alt: "Sgian Dubh manche en Morta stabilisé" },
  { slug: "cabestan-iii-os",           hash: "92916a8544e51e00f23f30fa5f1ae908", alt: "Couteau pliant Cabestan III manche en os" },
  { slug: "sgian-dubh-morta-ii",       hash: "966a3478db8e7bca8149883869f79428", alt: "Sgian Dubh manche en Morta stabilisé" },
  { slug: "cabestan-loupe-bouleau",    hash: "2213d57ecd5c3bf8b988b5a8da858d7b", alt: "Couteau pliant Cabestan manche en loupe de bouleau teinté et stabilisé" },
  { slug: "puukko-hetre",              hash: "18d404266f05d20b0055b060d7e5ae88", alt: "Puukko brut de forge manche en hêtre stabilisé" },
  { slug: "sgian-dubh-morta-iii",      hash: "be8f07f61de813e5048711edfb9138b2", alt: "Sgian Dubh manche en Morta stabilisé" },
  { slug: "piece-atelier",             hash: "c76c108008f0a1c5df2a26a9ce4b963d", alt: "Pièce de l'atelier" },
  { slug: "brut-de-forge-collection",  hash: "f23bb06cad817b30b0cc7bb53adfd346", alt: "Brut de forge — collection" },
  { slug: "droit-bouleau-teinte",      hash: "962c831d63d7ad9e2fe3014ba72cd2a5", alt: "Couteau droit bouleau teinté et stabilisé" },
  { slug: "curragh-bouleau",           hash: "f35821d9c6f4d1004b3511c2d4def9b3", alt: "Couteau pliant Curragh en bouleau stabilisé" },
  { slug: "sgian-dubh-morta-iv",       hash: "0e8205892311a6e3d3544e0c3ef6869e", alt: "Sgian Dubh — Morta" },
  { slug: "brut-de-forge-buis",        hash: "98cc3e58b8c30117aaa229bf27c1dc6c", alt: "Brut de forge — buis" },
  { slug: "kenseurt-ii-buis",          hash: "e6554f38c6c7c98eda4a8de77a9afe28", alt: "Couteau pliant Kenseurt II en vieux buis" },
  { slug: "sgian-dubh-ebene-damas",    hash: "2b537634312e432ed16afab4db38d4de", alt: "Sgian Dubh — ébène et damas inox" },
  { slug: "brut-de-forge-volute-if",   hash: "7f16ba5e895d7b10e139408636ce91cd", alt: "Brut de forge Volute en if" },
  { slug: "marin-usage",               hash: "79056c778c165a43c3f8e29063ee55b9", alt: "Couteau d'usage marin" },
  { slug: "sgian-dubh-cerf-ambre",     hash: "5a62afb28d3d4578c61f7dada97a652b", alt: "Sgian Dubh — bois de cerf et ambre" },
  { slug: "pliant-classique-i",        hash: "82987ef166ff868186652f0f90ababc9", alt: "Couteau pliant" },
  { slug: "pliant-classique-ii",       hash: "91ac1f246378bec79f831e46e69ca9ed", alt: "Couteau pliant" },
  { slug: "petit-pliant-maillechort",  hash: "a8a5e834fc73ed25fabb1e316babb441", alt: "Petit couteau pliant — maillechort et damas inox" },
  { slug: "droit-cerf-acier",          hash: "ddf939e39870ba2f03036cbc5851a475", alt: "Couteau droit acier forgé et bois de cerf" },
];

async function downloadOne(item) {
  const url = `${BASE}/${item.hash}.jpg`;
  const dest = path.join(SOURCE_DIR, `${item.slug}.jpg`);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Coutellerie Per gallery import)",
      Referer: "https://coutellerie-per.france-artisanat.fr/galerie.html",
    },
  });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return { slug: item.slug, bytes: buf.byteLength };
}

async function main() {
  await mkdir(SOURCE_DIR, { recursive: true });
  console.log(`→ Téléchargement de ${ITEMS.length} images vers ${SOURCE_DIR}`);
  const results = await Promise.allSettled(ITEMS.map(downloadOne));
  let ok = 0;
  let ko = 0;
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "fulfilled") {
      ok++;
      const kb = (r.value.bytes / 1024).toFixed(0);
      console.log(`  ✓ ${r.value.slug} (${kb} KB)`);
    } else {
      ko++;
      console.error(`  ✗ ${ITEMS[i].slug} — ${r.reason?.message ?? r.reason}`);
    }
  }
  console.log(`\nFait : ${ok} ok / ${ko} erreurs`);
  if (ko > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
