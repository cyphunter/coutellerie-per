/**
 * Convertit les jpg de `public/images/knives/source/` en webp optimisés
 * dans `public/images/knives/`.
 *
 *  - max width 1600 px (les cartes affichent 600–800 px max ; on garde
 *    une marge pour les écrans rétina)
 *  - qualité 82 (équilibre poids / netteté pour des photos texturées de bois,
 *    acier, cuir)
 *  - préservation du ratio
 *
 * Utilisation : `node scripts/convert-gallery.mjs`
 * Prérequis : `ffmpeg` dans le PATH.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = path.resolve(__dirname, "..", "public", "images", "knives", "source");
const OUT_DIR = path.resolve(__dirname, "..", "public", "images", "knives");

const MAX_WIDTH = 1600;
const QUALITY = 82;

function convert(src, dest) {
  return new Promise((resolve, reject) => {
    // ffmpeg : scale en gardant le ratio si > MAX_WIDTH, q:v=2 (libwebp 0–10),
    // libwebp `compression_level=6` pour meilleur ratio compression / vitesse.
    const args = [
      "-y",
      "-loglevel", "error",
      "-i", src,
      "-vf", `scale='min(${MAX_WIDTH},iw)':-2`,
      "-c:v", "libwebp",
      "-quality", String(QUALITY),
      "-compression_level", "6",
      "-preset", "photo",
      dest,
    ];
    const proc = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (d) => (stderr += d.toString()));
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg ${code}: ${stderr}`));
    });
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SOURCE_DIR)).filter((f) => f.endsWith(".jpg"));
  console.log(`→ Conversion de ${files.length} fichiers en webp`);

  let totalIn = 0;
  let totalOut = 0;
  const errors = [];

  await Promise.all(
    files.map(async (file) => {
      const src = path.join(SOURCE_DIR, file);
      const slug = file.replace(/\.jpg$/, "");
      const dest = path.join(OUT_DIR, `${slug}.webp`);
      try {
        await convert(src, dest);
        const [sIn, sOut] = await Promise.all([stat(src), stat(dest)]);
        totalIn += sIn.size;
        totalOut += sOut.size;
        const ratio = ((1 - sOut.size / sIn.size) * 100).toFixed(0);
        console.log(
          `  ✓ ${slug}.webp — ${(sOut.size / 1024).toFixed(0)} KB (−${ratio}%)`,
        );
      } catch (err) {
        errors.push({ slug, err });
        console.error(`  ✗ ${slug} — ${err.message}`);
      }
    }),
  );

  const reduction = ((1 - totalOut / totalIn) * 100).toFixed(0);
  console.log(
    `\nFait : ${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(1)} MB (−${reduction}%)`,
  );
  if (errors.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
