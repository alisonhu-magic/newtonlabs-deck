import { chromium } from "playwright-core";
import os from "node:os";
import path from "node:path";
import { mkdirSync } from "node:fs";

const URL = process.env.DECK_URL ?? "http://127.0.0.1:4188/";
const OUT = process.env.OUT ?? "exports/newton-aon-deck-v1.pdf";
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
  args: ["--enable-unsafe-swiftshader", "--allow-file-access-from-files"],
});

const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

// Give WebGL fields + fonts a moment to paint, and ensure fonts are ready.
await page.evaluate(async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
});
await page.waitForTimeout(2500);

await page.emulateMedia({ media: "print" });
await page.waitForTimeout(500);

await page.pdf({
  path: OUT,
  width: "1920px",
  height: "1080px",
  printBackground: true,
  preferCSSPageSize: false,
  pageRanges: "",
});

await browser.close();
console.log("PDF written:", OUT);
