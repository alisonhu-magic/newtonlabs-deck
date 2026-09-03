import { chromium } from "playwright-core";
import { execFileSync, spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { mkdirSync, rmSync } from "node:fs";

// Chromium print-to-PDF: each slide is printed as a 1920×1080 page with
// embedded fonts, so type stays selectable and sharp. WebGL fields and
// AssetFrame chrome (box-shadow) are snapshotted to PNG just before print —
// canvas pixels do not survive PrintToPDF, and Chrome encodes blurred
// box-shadow as a Luminosity SMask that Preview.app paints as a gray slab.
// Screen media is forced so @media print does not unhide every slide.

const DECK = process.env.DECK ?? "fund-admins";
const URL = process.env.DECK_URL ?? `http://127.0.0.1:3000/d/${DECK}/`;
const OUT = process.env.OUT ?? `exports/${DECK}.pdf`;
const TOTAL_ENV = process.env.SLIDES ? Number(process.env.SLIDES) : null;
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

const EXPORT_CSS = `
  html {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @page { size: ${W}px ${H}px; margin: 0; }
  html, body {
    width: ${W}px !important;
    height: ${H}px !important;
    overflow: hidden !important;
    margin: 0 !important;
  }
  .deck-app {
    position: relative !important;
    inset: auto !important;
    width: ${W}px !important;
    height: ${H}px !important;
    overflow: visible !important;
  }
  .deck-scaler {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    translate: none !important;
    scale: none !important;
    width: ${W}px !important;
    height: ${H}px !important;
    overflow: visible !important;
  }
  .deck-slide {
    width: ${W}px !important;
    height: ${H}px !important;
    overflow: visible !important;
  }
  .deck-slide .overflow-hidden:not(.asset-frame):not(.asset-frame-clip) {
    overflow: visible !important;
  }
  .deck-slide .asset-frame,
  .deck-slide .asset-frame-clip {
    overflow: hidden !important;
  }
  .asset-frame-clip {
    border-radius: 8px !important;
    clip-path: inset(0 round 8px);
  }
  .asset-frame-clip img {
    border-radius: 8px !important;
  }
  .deck-app > p { display: none !important; }
`;

function qpdfAvailable() {
  return spawnSync("qpdf", ["--version"], { encoding: "utf8" }).status === 0;
}

mkdirSync(path.dirname(OUT), { recursive: true });
const tmpDir = path.join(path.dirname(OUT), ".pdf-pages");
rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });

if (!qpdfAvailable()) {
  console.error(
    "qpdf is required to merge per-slide PDFs. Install it and re-run:\n" +
      "  macOS:          brew install qpdf\n" +
      "  Debian/Ubuntu:  sudo apt-get install qpdf\n" +
      "  Windows:        winget install qpdf.qpdf",
  );
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  headless: true,
  args: ["--enable-unsafe-swiftshader", "--force-color-profile=srgb"],
});

const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: SCALE,
});

async function waitForSlide() {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
  });
  await page.waitForTimeout(800);
}

async function rasterizeCanvases() {
  const canvases = await page.locator("canvas").all();
  const urls = [];
  for (const canvas of canvases) {
    const box = await canvas.boundingBox();
    if (!box || box.width < 2 || box.height < 2) {
      urls.push(null);
      continue;
    }
    const buf = await canvas.screenshot({ type: "png" });
    urls.push(`data:image/png;base64,${buf.toString("base64")}`);
  }
  await page.evaluate((dataUrls) => {
    const nodes = [...document.querySelectorAll("canvas")];
    nodes.forEach((el, i) => {
      const url = dataUrls[i];
      if (!url) return;
      const img = document.createElement("img");
      img.src = url;
      img.alt = "";
      img.className = el.className;
      img.style.cssText = el.getAttribute("style") || "";
      img.style.display = "block";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      el.replaceWith(img);
    });
  }, urls);
}

// Chrome PrintToPDF encodes blurred box-shadow as a Luminosity SMask that
// macOS Preview paints as a hard gray slab. Keep the live frame (shadow off)
// and sit a canvas-drawn alpha shadow behind it, in a padded wrap so print
// does not clip the blur.
const SHADOW_PAD = 56;
const SHADOW_RADIUS = 14; // --radius-lg

async function rasterizeAssetFrames() {
  const count = await page.locator(".asset-frame").count();
  if (count === 0) return;

  const boxes = [];
  for (let i = 0; i < count; i++) {
    const box = await page.locator(".asset-frame").nth(i).boundingBox();
    boxes.push(box && box.width >= 2 && box.height >= 2 ? box : null);
  }

  const shadows = await page.evaluate(
    ({ boxes, pad, radius, scale }) => {
      function roundRect(ctx, x, y, w, h, r) {
        const rr = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + rr, y);
        ctx.arcTo(x + w, y, x + w, y + h, rr);
        ctx.arcTo(x + w, y + h, x, y + h, rr);
        ctx.arcTo(x, y + h, x, y, rr);
        ctx.arcTo(x, y, x + w, y, rr);
        ctx.closePath();
      }

      return boxes.map((box) => {
        if (!box) return null;
        const cssW = box.width;
        const cssH = box.height;
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil((cssW + pad * 2) * scale);
        canvas.height = Math.ceil((cssH + pad * 2) * scale);
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        const x = pad;
        const y = pad;
        const draw = (color, blur, ox, oy) => {
          ctx.save();
          ctx.shadowColor = color;
          // shadowBlur/offset ignore the CTM — scale them in device pixels.
          ctx.shadowBlur = blur * scale;
          ctx.shadowOffsetX = ox * scale;
          ctx.shadowOffsetY = oy * scale;
          ctx.fillStyle = "#FBFCFE";
          roundRect(ctx, x, y, cssW, cssH, radius);
          ctx.fill();
          ctx.restore();
        };
        draw("rgba(0,0,0,0.08)", 27.6, 0, 4.6);
        draw("rgba(0,0,0,0.25)", 2.3, 0, 0);
        return canvas.toDataURL("image/png");
      });
    },
    { boxes, pad: SHADOW_PAD, radius: SHADOW_RADIUS, scale: SCALE },
  );

  await page.evaluate(
    ({ urls, pad, boxes }) => {
      const nodes = [...document.querySelectorAll(".asset-frame")];
      nodes.forEach((el, i) => {
        const box = boxes[i];
        const url = urls[i];
        el.style.setProperty("box-shadow", "none", "important");
        if (box) {
          el.style.setProperty("width", `${box.width}px`, "important");
          el.style.setProperty("height", `${box.height}px`, "important");
          el.style.setProperty("max-width", "none", "important");
          el.style.setProperty("flex-shrink", "0", "important");
        }
        if (!url || !box) return;

        const fill = el.classList.contains("h-full");
        const wrap = document.createElement("div");
        wrap.style.cssText = [
          "position:relative",
          "overflow:visible",
          `width:${box.width}px`,
          `height:${box.height}px`,
          fill ? "flex:1 1 auto;min-height:0;align-self:stretch" : "flex-shrink:0",
        ].join(";");

        const img = document.createElement("img");
        img.src = url;
        img.alt = "";
        img.style.cssText = [
          "position:absolute",
          `left:-${pad}px`,
          `top:-${pad}px`,
          `width:${box.width + pad * 2}px`,
          `height:${box.height + pad * 2}px`,
          "max-width:none",
          "display:block",
          "pointer-events:none",
          "z-index:0",
        ].join(";");

        el.style.position = "relative";
        el.style.zIndex = "1";
        el.style.width = "100%";
        el.style.height = "100%";
        el.parentNode.insertBefore(wrap, el);
        wrap.appendChild(img);
        wrap.appendChild(el);
      });
    },
    { urls: shadows, pad: SHADOW_PAD, boxes },
  );

  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
  });
  await page.waitForTimeout(200);
}

const parts = [];
await page.goto(`${URL}#1`, { waitUntil: "networkidle", timeout: 60000 });
const TOTAL =
  TOTAL_ENV ??
  (await page.evaluate(() => document.querySelectorAll(".deck-slide").length));
if (!TOTAL || TOTAL < 1) {
  console.error(`No slides found at ${URL}`);
  process.exit(1);
}
console.log(`Exporting deck "${DECK}" (${TOTAL} slides) → ${OUT}`);

for (let n = 1; n <= TOTAL; n++) {
  await page.goto(`${URL}#${n}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.emulateMedia({ media: "screen" });
  await page.addStyleTag({ content: EXPORT_CSS });
  await waitForSlide();
  await rasterizeCanvases();
  await rasterizeAssetFrames();

  const file = path.join(tmpDir, `slide-${String(n).padStart(2, "0")}.pdf`);
  await page.pdf({
    path: file,
    width: `${W}px`,
    height: `${H}px`,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    tagged: true,
  });
  parts.push(file);
  console.log(`printed ${n}/${TOTAL}`);
}

await browser.close();

execFileSync("qpdf", ["--empty", "--pages", ...parts, "--", OUT], {
  stdio: "inherit",
});
rmSync(tmpDir, { recursive: true, force: true });
console.log("PDF written:", OUT);
