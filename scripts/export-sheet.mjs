import { chromium } from "playwright-core";
import os from "node:os";
import path from "node:path";
import { mkdirSync } from "node:fs";

const URL = process.env.SHEET_URL ?? "http://127.0.0.1:3000/sheet/";
const OUT = process.env.OUT ?? "public/downloads/curators.pdf";
const EXECUTABLE =
  process.env.CHROME ??
  path.join(
    os.homedir(),
    "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64",
    "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  );

mkdirSync(path.dirname(OUT), { recursive: true });

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  headless: true,
  args: ["--force-color-profile=srgb"],
});
const page = await browser.newPage({
  viewport: { width: 900, height: 1400 },
  deviceScaleFactor: 2,
});

const res = await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
if (!res || !res.ok()) {
  console.error(`Sheet failed to load: ${res?.status()} ${URL}`);
  process.exit(1);
}

await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(400);
await page.emulateMedia({ media: "print" });

await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log("PDF written:", OUT);
