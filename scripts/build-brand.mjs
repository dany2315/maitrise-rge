/**
 * Génère les fichiers de marque à partir du logo fourni par le client
 * (assets-src/logo-original.jpeg). Seuls le symbole et le nom « Maîtrise RGE »
 * sont conservés ; le slogan et les pictogrammes sont écartés.
 *
 * Usage : node scripts/build-brand.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "assets-src/logo-original.jpeg";
const OUT = "public/brand";

// Zones mesurées sur le fichier source (1254 × 1254 px).
const SYMBOL = { left: 240, top: 86, width: 805, height: 628 };
const WORDMARK = { left: 82, top: 719, width: 1090, height: 188 };

/** Rend le fond blanc transparent sans altérer le rendu sur fond clair. */
async function toTransparent(region, { lightText = false } = {}) {
  const { data, info } = await sharp(SOURCE)
    .extract(region)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let p = 0; p < width * height; p++) {
    const r = data[p * channels];
    const g = data[p * channels + 1];
    const b = data[p * channels + 2];
    const darkest = Math.min(r, g, b);
    // Alpha minimal pour reproduire la couleur sur blanc, amplifié pour garder
    // les aplats opaques ; le bruit JPEG proche du blanc devient transparent.
    const base = Math.max(0, 255 - darkest - 10) / 245;
    const alpha = Math.min(1, base * 3);
    let fr = 0;
    let fg = 0;
    let fb = 0;
    if (alpha > 0) {
      fr = 255 - (255 - r) / alpha;
      fg = 255 - (255 - g) / alpha;
      fb = 255 - (255 - b) / alpha;
    }
    if (lightText) {
      // « Maîtrise » est bleu nuit : on le passe en blanc pour les fonds sombres.
      const isGreen = fg > fr + 25 && fg > fb + 10;
      if (!isGreen && Math.max(fr, fg, fb) < 120) {
        fr = 255;
        fg = 255;
        fb = 255;
      }
    }
    out[p * 4] = Math.max(0, Math.min(255, Math.round(fr)));
    out[p * 4 + 1] = Math.max(0, Math.min(255, Math.round(fg)));
    out[p * 4 + 2] = Math.max(0, Math.min(255, Math.round(fb)));
    out[p * 4 + 3] = Math.round(alpha * 255);
  }

  return sharp(out, { raw: { width, height, channels: 4 } }).png();
}

await mkdir(OUT, { recursive: true });

const symbol = await (await toTransparent(SYMBOL)).toBuffer();
const wordmark = await (await toTransparent(WORDMARK)).toBuffer();
const wordmarkLight = await (
  await toTransparent(WORDMARK, { lightText: true })
).toBuffer();

await sharp(symbol).trim().png({ compressionLevel: 9 }).toFile(`${OUT}/symbol.png`);
await sharp(wordmark).trim().png({ compressionLevel: 9 }).toFile(`${OUT}/wordmark.png`);
await sharp(wordmarkLight).trim().png({ compressionLevel: 9 }).toFile(`${OUT}/wordmark-light.png`);

// Icône d'application (carrée, fond transparent) et icône Apple (fond blanc).
const square = (size, pad, background) =>
  sharp(symbol)
    .trim()
    .resize(size - pad * 2, size - pad * 2, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background })
    .png();

await (await square(512, 24, { r: 0, g: 0, b: 0, alpha: 0 })).toFile("src/app/icon.png");
await (await square(180, 18, { r: 255, g: 255, b: 255, alpha: 1 }))
  .flatten({ background: "#ffffff" })
  .toFile("src/app/apple-icon.png");

// Image de partage (Open Graph) : logo horizontal sur fond clair.
const symbolOg = await sharp(symbol).trim().resize({ height: 300 }).toBuffer();
const symbolMeta = await sharp(symbolOg).metadata();
const wordOg = await sharp(wordmark).trim().resize({ width: 560 }).toBuffer();
const wordMeta = await sharp(wordOg).metadata();
const totalWidth = symbolMeta.width + 48 + wordMeta.width;
const startX = Math.round((1200 - totalWidth) / 2);

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: "#f6f8f2" },
})
  .composite([
    { input: symbolOg, left: startX, top: Math.round((630 - symbolMeta.height) / 2) },
    {
      input: wordOg,
      left: startX + symbolMeta.width + 48,
      top: Math.round((630 - wordMeta.height) / 2),
    },
  ])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log("Fichiers de marque générés.");
