/**
 * Contrôle visuel et technique sur mobile, tablette et ordinateur.
 * Utilise le navigateur Edge installé (playwright-core, sans téléchargement).
 *
 * Usage : node scripts/qa-screens.mjs [baseUrl] [dossierSortie]
 * Produit une capture pleine page par route et par format, et signale :
 * débordements horizontaux, champs dont le texte est inférieur à 16 px,
 * cibles tactiles trop petites, images sans attribut alt.
 */
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "qa-output";
const routes = [
  "/",
  "/simulateur",
  "/conseils",
  "/conseils/pompe-a-chaleur-air-eau-maison",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
];
const viewports = [
  { name: "mobile", width: 375, height: 812, isMobile: true, hasTouch: true },
  { name: "tablette", width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: "ordinateur", width: 1440, height: 900 },
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const report = [];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "load" });
    await page.evaluate(async () => {
      document.querySelectorAll(".reveal").forEach((el) => (el.dataset.visible = "true"));
      document.documentElement.style.scrollBehavior = "auto";
      // Charge les images différées en parcourant la page.
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await Promise.race([
        Promise.all(
          [...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))),
        ),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
    });
    await page.waitForTimeout(400);

    const issues = await page.evaluate((vw) => {
      const found = [];
      if (document.documentElement.scrollWidth > vw + 1) {
        found.push(`Débordement horizontal : ${document.documentElement.scrollWidth}px`);
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed") {
            const inClip = el.closest("[class*='overflow-hidden'], [class*='overflow-x']");
            if (!inClip) found.push(`  ↳ ${el.tagName.toLowerCase()}.${String(el.className).slice(0, 80)} (droite ${Math.round(r.right)})`);
          }
          if (found.length > 12) break;
        }
      }
      for (const el of document.querySelectorAll("input:not([type=checkbox]):not([type=radio]), select, textarea")) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size < 16 && el.offsetParent) found.push(`Champ < 16px (${size}px) : #${el.id}`);
      }
      for (const el of document.querySelectorAll("a, button, summary, label:has(input)")) {
        const r = el.getBoundingClientRect();
        if (!el.offsetParent || r.width === 0) continue;
        const text = (el.textContent || "").trim().slice(0, 40);
        const inline = el.tagName === "A" && el.closest("p, li") && !el.className.includes("min-h");
        if (!inline && (r.height < 40 || r.width < 40)) found.push(`Cible tactile ${Math.round(r.width)}×${Math.round(r.height)} : « ${text} »`);
      }
      for (const img of document.querySelectorAll("img:not([alt])")) found.push(`Image sans alt : ${img.src}`);
      return found;
    }, vp.width);

    const file = `${out}/${vp.name}${route === "/" ? "-accueil" : route.replaceAll("/", "-")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    report.push({ viewport: vp.name, route, issues });
  }
  await context.close();
}

await browser.close();
await writeFile(`${out}/rapport.json`, JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(`${r.viewport.padEnd(10)} ${r.route.padEnd(45)} ${r.issues.length ? `${r.issues.length} point(s)` : "OK"}`);
  for (const i of r.issues) console.log(`   - ${i}`);
}
