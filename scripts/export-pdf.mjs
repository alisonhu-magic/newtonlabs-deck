import { chromium } from "playwright-core";
import os from "node:os";
import path from "node:path";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

// Screenshot-based export: each slide is captured exactly as the browser paints
// it (screen media, no print emulation), then the images are assembled into a
// single 1920x1080 landscape PDF. This keeps frame borders, shadows, overlays,
// and WebGL fields pixel-identical to the HTML (Chrome's vector print path
// flattens box-shadows into gray bands, which this avoids).

const URL = process.env.DECK_URL ?? "http://127.0.0.1:4188/";
const OUT = process.env.OUT ?? "exports/newton-aon-deck-v1.pdf";
const TOTAL = Number(process.env.SLIDES ?? 15);
const SCALE = Number(process.env.SCALE ?? 2);
const W = 1920;
const H = 1080;
const EXECUTABLE =
  process.env.CHROME ??
  path.join(
    os.homedir(),
    "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64",
    "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  );

mkdirSync(path.dirname(OUT), { recursive: true });
const tmpDir = path.join(path.dirname(OUT), ".shots");
mkdirSync(tmpDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  headless: true,
  args: ["--enable-unsafe-swiftshader", "--force-color-profile=srgb"],
});

const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: SCALE,
});

const shots = [];
for (let n = 1; n <= TOTAL; n++) {
  await page.goto(`${URL}#${n}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(1500); // let WebGL fields settle
  const file = path.join(tmpDir, `slide-${String(n).padStart(2, "0")}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: W, height: H } });
  shots.push(file);
  console.log(`captured ${n}/${TOTAL}`);
}

// Assemble the screenshots into a PDF: one full-bleed image per page.
const pagesHtml = shots
  .map((f) => `<img src="file://${path.resolve(f)}" />`)
  .join("\n");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: ${W}px ${H}px; margin: 0; }
  * { margin: 0; padding: 0; }
  img { display: block; width: ${W}px; height: ${H}px; break-after: page; }
  img:last-child { break-after: auto; }
</style></head><body>${pagesHtml}</body></html>`;

const htmlPath = path.join(tmpDir, "assemble.html");
writeFileSync(htmlPath, html);

const assemble = await browser.newPage();
await assemble.goto(`file://${path.resolve(htmlPath)}`, {
  waitUntil: "networkidle",
});
await assemble.pdf({
  path: OUT,
  width: `${W}px`,
  height: `${H}px`,
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();
rmSync(tmpDir, { recursive: true, force: true });
console.log("PDF written:", OUT);
