import { createRequire } from "node:module";
import path from "node:path";
import { mkdirSync } from "node:fs";
const require = createRequire(import.meta.url);
const sharp = require(
  path.join(process.cwd(), "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"),
);

const TOTAL = Number(process.env.SLIDES ?? 15);
const HTML = "output/html_ref";
// Which pptx render to compare against: keynote (true target) or render (LibreOffice)
const SRC = process.env.PPTX_SRC ?? "keynote"; // "keynote" | "render"
const PPTX = SRC === "keynote" ? "output" : "output/render";
const PREFIX = SRC === "keynote" ? "keynote-" : "slide-";
const OUT = "output/compare";
mkdirSync(OUT, { recursive: true });

const W = 900;
async function fit(file) {
  return sharp(file).resize({ width: W, height: Math.round((W * 9) / 16), fit: "fill" }).toBuffer();
}
async function panel(file, label) {
  const img = await fit(file);
  const h = Math.round((W * 9) / 16);
  const lbl = Buffer.from(
    `<svg width="${W}" height="30"><rect width="100%" height="100%" fill="#111"/><text x="10" y="20" font-family="Arial" font-size="16" fill="#fff">${label}</text></svg>`,
  );
  return sharp({ create: { width: W, height: h + 30, channels: 4, background: "#fff" } })
    .composite([{ input: lbl, top: 0, left: 0 }, { input: img, top: 30, left: 0 }])
    .png()
    .toBuffer();
}

for (let n = 1; n <= TOTAL; n++) {
  const nn = String(n).padStart(2, "0");
  const htmlFile = `${HTML}/slide-${nn}.png`;
  const pptxFile = `${PPTX}/${PREFIX}${nn}.png`;
  const h = Math.round((W * 9) / 16);

  const left = await panel(htmlFile, `HTML  #${n}`);
  const right = await panel(pptxFile, `PPTX (${SRC})  #${n}`);

  // Difference overlay: red where the two renders diverge.
  const a = await fit(htmlFile);
  const b = await fit(pptxFile);
  const diff = await sharp(a)
    .composite([{ input: b, blend: "difference" }])
    .grayscale()
    .linear(3, 0)
    .toColourspace("b-w")
    .toBuffer();
  const diffPanel = await sharp({ create: { width: W, height: h + 30, channels: 4, background: "#fff" } })
    .composite([
      { input: Buffer.from(`<svg width="${W}" height="30"><rect width="100%" height="100%" fill="#111"/><text x="10" y="20" font-family="Arial" font-size="16" fill="#fff">DIFF (white = mismatch)</text></svg>`), top: 0, left: 0 },
      { input: diff, top: 30, left: 0 },
    ])
    .png()
    .toBuffer();

  await sharp({ create: { width: W * 3 + 24, height: h + 30, channels: 4, background: "#ddd" } })
    .composite([
      { input: left, top: 0, left: 0 },
      { input: right, top: 0, left: W + 12 },
      { input: diffPanel, top: 0, left: W * 2 + 24 },
    ])
    .png()
    .toFile(`${OUT}/cmp-${nn}.png`);
  console.log("compare", n);
}
