import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { mkdirSync, rmSync } from "node:fs";

const URL = process.env.SOCIAL_URL ?? "http://127.0.0.1:3000/social/";
const OUT =
  process.env.OUT ?? "public/downloads/digital-asset-compliance-landscape.zip";
const EXECUTABLE =
  process.env.CHROME ??
  path.join(
    os.homedir(),
    "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64",
    "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  );

const FOLDERS = {
  sq: "square",
  ls: "landscape",
  bn: "banner",
};

const EXPORT_CSS = `
  .preview-chrome,
  .fs-pages > p,
  .fs-section > p.text-label,
  .fs-stack > div > p {
    display: none !important;
  }
  .fs-pages,
  .fs-section,
  .fs-stack {
    padding: 0 !important;
    gap: 0 !important;
    width: auto !important;
    max-width: none !important;
  }
  .fs-sq-frame,
  .fs-ls-frame,
  .fs-bn-frame {
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    box-shadow: none !important;
  }
  .fs-canvas {
    transform: none !important;
  }
`;

const SIZES = {
  sq: { w: 1200, h: 1200 },
  ls: { w: 1600, h: 900 },
  bn: { w: 1584, h: 396 },
};

const tmp = path.join(os.tmpdir(), "newton-social-png");
rmSync(tmp, { recursive: true, force: true });
for (const folder of Object.values(FOLDERS)) {
  mkdirSync(path.join(tmp, folder), { recursive: true });
}

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  headless: true,
  args: ["--force-color-profile=srgb"],
});
const page = await browser.newPage({
  viewport: { width: 1920, height: 1200 },
  deviceScaleFactor: 1,
});

const res = await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
if (!res || !res.ok()) {
  console.error(`Social preview failed to load: ${res?.status()} ${URL}`);
  process.exit(1);
}

await page.addStyleTag({ content: EXPORT_CSS });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(400);

const nodes = page.locator("[data-export]");
const count = await nodes.count();
if (count === 0) {
  console.error("No [data-export] canvases found");
  process.exit(1);
}

const counts = { sq: 0, ls: 0, bn: 0 };

for (let i = 0; i < count; i++) {
  const el = nodes.nth(i);
  const id = await el.getAttribute("data-export");
  const [format, ...rest] = id.split("-");
  const slug = rest.join("-");
  counts[format] += 1;
  const n = String(counts[format]).padStart(2, "0");
  const folder = FOLDERS[format];
  const dest = path.join(tmp, folder, `${n}-${slug}.png`);
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: dest, type: "png" });
  const box = await el.boundingBox();
  const expected = SIZES[format];
  if (
    !box ||
    Math.round(box.width) !== expected.w ||
    Math.round(box.height) !== expected.h
  ) {
    console.warn(
      `size mismatch ${id}: ${Math.round(box?.width ?? 0)}×${Math.round(box?.height ?? 0)} (expected ${expected.w}×${expected.h})`,
    );
  }
  console.log(path.relative(tmp, dest));
}

await browser.close();

mkdirSync(path.dirname(OUT), { recursive: true });
rmSync(OUT, { force: true });
execFileSync("zip", ["-r", "-q", path.resolve(OUT), ...Object.values(FOLDERS)], {
  cwd: tmp,
});
console.log("ZIP written:", OUT, `(${count} pngs)`);
