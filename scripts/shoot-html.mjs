import { chromium } from "playwright-core";
import os from "node:os";
import path from "node:path";
import { mkdirSync } from "node:fs";

const DECK = process.env.DECK ?? "fund-admins";
const URL = process.env.DECK_URL ?? `http://127.0.0.1:4188/d/${DECK}/`;
const TOTAL = Number(process.env.SLIDES ?? 17);
const OUT = process.env.HTML_OUT ?? `output/html_ref/${DECK}`;
const EX = path.join(
  os.homedir(),
  "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64",
  "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
);
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: EX, headless: true, args: ["--enable-unsafe-swiftshader", "--force-color-profile=srgb"] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
for (let n = 1; n <= TOTAL; n++) {
  await p.goto(`${URL}#${n}`, { waitUntil: "networkidle" });
  await p.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  await p.waitForTimeout(1200);
  const f = path.join(OUT, `slide-${String(n).padStart(2, "0")}.png`);
  await p.screenshot({ path: f, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log("html", n);
}
await b.close();
