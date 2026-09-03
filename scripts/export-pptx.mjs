/**
 * HTML → editable PowerPoint (.pptx) exporter — hybrid, paint-order faithful.
 *
 * APPROACH (option 4, hybrid): the live deck is the source of truth. We render
 * it at a 1920×1080 stage (scale 1) and use the browser as the layout engine,
 * reading computed styles + real bounding boxes via Playwright. Every visual is
 * turned into ONE flat, paint-ordered list of layers and emitted to PowerPoint
 * in that exact order, so DOM stacking / z-index / nested stacking contexts are
 * preserved (no more "all shapes then all text" bucketing).
 *
 *   - Text            → native, editable PowerPoint text boxes (per-run color).
 *   - Fills/borders/
 *     cards/pills/rings → native shapes (rect / roundRect / ellipse / line).
 *   - Dividers        → native line shapes (per-side borders).
 *   - Photos, tinted
 *     SVG icons, logos,
 *     gradients        → high-res transparent PNG layers (flattened, reported).
 *
 * Geometry: the 1920×1080 stage maps 1:1 onto a 13.333"×7.5" (16:9) canvas at
 * 144 px/in, so px→inch = /144 and px→pt = ×0.5.
 *
 * Layer model per element (CSS painting order, simplified but correct for this
 * deck): element background/border → ::before → text OR children (children are
 * sorted by z-index, stable within a level to keep DOM order) → ::after.
 */
import { chromium } from "playwright-core";
import os from "node:os";
import path from "node:path";
import { mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PptxGenJS = require("pptxgenjs");

// ── Config ──────────────────────────────────────────────────────────────────
const DECK = process.env.DECK ?? "fund-admins";
const URL = process.env.DECK_URL ?? `http://127.0.0.1:4188/d/${DECK}/`;
const OUT = process.env.OUT ?? `output/${DECK}.pptx`;
const TOTAL = Number(process.env.SLIDES ?? 17);
const SHOT_SCALE = Number(process.env.SHOT_SCALE ?? 3);
const STAGE_W = 1920;
const STAGE_H = 1080;
const PX_PER_IN = STAGE_W / 13.333;
const PT_PER_PX = 72 / PX_PER_IN;

const EXECUTABLE =
  process.env.CHROME ??
  path.join(
    os.homedir(),
    "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64",
    "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  );

const SURFACE = "FBFCFE";
const FONT_SANS = process.env.FONT_SANS ?? "Arial";

const px2in = (px) => +(px / PX_PER_IN).toFixed(4);
const px2pt = (px) => +(px * PT_PER_PX).toFixed(2);

const assetsDir = path.join(path.dirname(OUT), ".assets");
mkdirSync(path.dirname(OUT), { recursive: true });
rmSync(assetsDir, { recursive: true, force: true });
mkdirSync(assetsDir, { recursive: true });

// ── Browser-side extraction ───────────────────────────────────────────────
// Returns a single paint-ordered array of layer descriptors for the visible
// slide. Elements that must be rasterized are tagged data-shot="<id>".
function extractScene() {
  const BONE = [251, 252, 254];

  function parseColor(str) {
    if (!str) return null;
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(",").map((s) => parseFloat(s.trim()));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  // Blend a (possibly translucent) color over bone-50, folding in the element's
  // cumulative opacity, → solid hex (renders identically on the light surface).
  function toHex(str, op = 1, bg = BONE) {
    const c = parseColor(str);
    if (!c) return null;
    const a = c.a * op;
    if (a <= 0.003) return null;
    const mix = (fg, b) => Math.round(fg * a + b * (1 - a));
    return [mix(c.r, bg[0]), mix(c.g, bg[1]), mix(c.b, bg[2])]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }

  const slides = [...document.querySelectorAll(".deck-slide")];
  const slide = slides.find((s) => s.getBoundingClientRect().width > 10);
  const base = slide.getBoundingClientRect();
  const ORG = { x: base.left, y: base.top };
  const rel = (r) => ({ x: r.left - ORG.x, y: r.top - ORG.y, w: r.width, h: r.height });

  const items = [];
  let order = 0;
  let shotId = 0;
  const push = (it, group) => {
    items.push({ ...it, order: order++, group });
  };

  const isVisible = (el, cs) =>
    cs.display !== "none" &&
    cs.visibility !== "hidden" &&
    parseFloat(cs.opacity || "1") > 0.01;

  const isInlineDisplay = (d) => d.startsWith("inline") || d === "contents";

  function isTextContainer(el) {
    if (!el.textContent || !el.textContent.trim()) return false;
    for (const c of el.childNodes) {
      if (c.nodeType === 1) {
        const d = getComputedStyle(c).display;
        if (!isInlineDisplay(d)) return false;
        if (c.tagName === "IMG" || c.tagName === "SVG") return false;
      }
    }
    return true;
  }

  function styleOf(el, op) {
    const cs = getComputedStyle(el);
    const w = parseInt(cs.fontWeight) || 400;
    return {
      color: toHex(cs.color, op) || "0E0E0F",
      bold: w >= 500,
      italic: cs.fontStyle === "italic",
      size: parseFloat(cs.fontSize),
      lh: cs.lineHeight === "normal" ? parseFloat(cs.fontSize) * 1.2 : parseFloat(cs.lineHeight),
      letter: cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing),
      align: cs.textAlign,
      transform: cs.textTransform,
    };
  }
  const applyTransform = (t, s) =>
    s.transform === "uppercase" ? t.toUpperCase() : s.transform === "lowercase" ? t.toLowerCase() : t;

  // Break a single-run element into visual lines using real line-box geometry,
  // so wrapping/line-breaks survive font substitution exactly.
  function detectLines(el) {
    const range = document.createRange();
    const out = [];
    let cur = "";
    let lastTop = null;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      const re = /\S+/g;
      let m;
      while ((m = re.exec(text))) {
        range.setStart(node, m.index);
        range.setEnd(node, m.index + m[0].length);
        const top = Math.round(range.getBoundingClientRect().top);
        if (lastTop !== null && Math.abs(top - lastTop) > 3) {
          out.push(cur.trimEnd());
          cur = "";
        }
        cur += m[0] + " ";
        lastTop = top;
      }
    }
    if (cur.trim()) out.push(cur.trimEnd());
    return out.length ? out : [el.textContent.trim()];
  }

  function textItem(el, op, group) {
    const s = styleOf(el, op);
    const r = rel(el.getBoundingClientRect());
    const elementRuns = [];
    for (const c of el.childNodes) {
      if (c.nodeType === 3) {
        const val = c.nodeValue.replace(/\s+/g, " ");
        if (val) elementRuns.push({ text: val, s });
      } else if (c.nodeType === 1) {
        const t = c.textContent;
        if (t && t.trim()) elementRuns.push({ text: t.replace(/\s+/g, " "), s: styleOf(c, op) });
      }
    }
    if (elementRuns.length) {
      elementRuns[0].text = elementRuns[0].text.replace(/^\s+/, "");
      const last = elementRuns.length - 1;
      elementRuns[last].text = elementRuns[last].text.replace(/\s+$/, "");
      for (let i = elementRuns.length - 1; i >= 0; i--)
        if (!elementRuns[i].text.length) elementRuns.splice(i, 1);
    }
    let runs;
    if (elementRuns.length <= 1) {
      runs = [{ text: detectLines(el).map((l) => applyTransform(l, s)).join("\n"), ...s }];
    } else {
      runs = elementRuns.map((rn) => ({ text: applyTransform(rn.text, rn.s), ...rn.s }));
    }

    const cs = getComputedStyle(el);
    const radius = parseFloat(cs.borderTopLeftRadius) || 0;
    const hasChrome = toHex(cs.backgroundColor, op) || parseFloat(cs.borderTopWidth) > 0;
    const pill = hasChrome && radius >= r.h / 2 - 1 && r.h < 70;

    push(
      {
        kind: "text",
        ...r,
        runs,
        align: s.align === "center" ? "center" : s.align === "right" ? "right" : "left",
        valign: pill ? "middle" : "top",
        size: s.size,
        lh: s.lh,
        letter: s.letter,
        italic: s.italic,
      },
      group,
    );
  }

  // Emit fill + border layers for one box (element or pseudo). Returns the
  // order id used, so callers can use it as a group anchor.
  function boxLayers(cs, r, op, group, radiusOverride) {
    const bg = toHex(cs.backgroundColor, op);
    const sides = ["Top", "Right", "Bottom", "Left"].map((d) => ({
      w: parseFloat(cs[`border${d}Width`]) || 0,
      color: toHex(cs[`border${d}Color`], op),
    }));
    const anyBorder = sides.some((sd) => sd.w > 0.5 && sd.color);
    const radius = radiusOverride ?? (parseFloat(cs.borderTopLeftRadius) || 0);
    if (!bg && !anyBorder) return null;

    const uniform =
      anyBorder &&
      sides.every(
        (sd) => sd.w > 0.5 && sd.color && Math.abs(sd.w - sides[0].w) < 0.5 && sd.color === sides[0].color,
      );
    const isEllipse = radius >= Math.min(r.w, r.h) / 2 - 1 && Math.abs(r.w - r.h) < 4;
    const anchor = order;

    if (uniform || bg) {
      push(
        {
          kind: "box",
          ...r,
          fill: bg,
          line: uniform ? { color: sides[0].color, w: sides[0].w } : null,
          radius,
          ellipse: isEllipse,
          pill: !isEllipse && radius >= r.h / 2 - 1,
        },
        group,
      );
    }
    if (anyBorder && !uniform) {
      const [t, ri, b, l] = sides;
      const line = (x1, y1, x2, y2, sd) => push({ kind: "line", x1, y1, x2, y2, color: sd.color, w: sd.w }, group);
      if (t.w > 0.5 && t.color) line(r.x, r.y, r.x + r.w, r.y, t);
      if (b.w > 0.5 && b.color) line(r.x, r.y + r.h, r.x + r.w, r.y + r.h, b);
      if (l.w > 0.5 && l.color) line(r.x, r.y, r.x, r.y + r.h, l);
      if (ri.w > 0.5 && ri.color) line(r.x + r.w, r.y, r.x + r.w, r.y + r.h, ri);
    }
    return anchor;
  }

  function pseudoLayer(el, which, r, op, group) {
    const cs = getComputedStyle(el, which);
    if (!cs || cs.content === "none" || cs.content === "" || cs.content === "normal") return;
    // Only reproduce simple inset solid-color overlays; skip textured/gradient
    // pseudo-elements (masks, noise, gradients) — those are decorative here.
    if (cs.maskImage !== "none" || (cs.backgroundImage && cs.backgroundImage !== "none")) return;
    const bg = toHex(cs.backgroundColor, op);
    if (!bg) return;
    push({ kind: "box", ...r, fill: bg, line: null, radius: parseFloat(cs.borderTopLeftRadius) || 0, ellipse: false, pill: false }, group);
  }

  function isAssetFrame(el, cs) {
    return parseFloat(cs.borderTopWidth) >= 5 && cs.boxShadow && cs.boxShadow !== "none";
  }
  const zOf = (node) => {
    const z = parseInt(getComputedStyle(node).zIndex);
    return Number.isNaN(z) ? 0 : z;
  };

  function walk(el, op, group) {
    if (el.nodeType !== 1) return;
    const cs = getComputedStyle(el);
    if (!isVisible(el, cs)) return;
    const opacity = op * (parseFloat(cs.opacity || "1") || 1);
    const r = rel(el.getBoundingClientRect());

    if (el.tagName === "CANVAS") return; // WebGL field → flattened to surface

    if (r.w >= 0.5 && r.h >= 0.5) {
      if (isAssetFrame(el, cs)) {
        const id = "s" + shotId++;
        el.setAttribute("data-shot", id);
        push({ kind: "image", imgKind: "frame", id, ...r }, group);
        return;
      }
      if (el.tagName === "IMG") {
        const id = "s" + shotId++;
        el.setAttribute("data-shot", id);
        push({ kind: "image", imgKind: "img", id, ...r }, group);
        return;
      }
    }

    // 1) own background / border (skip the slide root — background set globally)
    let anchor = group;
    if (el !== slide) {
      const a = boxLayers(cs, r, opacity, group);
      if (a !== null && a !== undefined) anchor = a;
    }
    // 2) ::before
    pseudoLayer(el, "::before", r, opacity, anchor);

    // 3) content
    if (isTextContainer(el)) {
      textItem(el, opacity, anchor);
    } else {
      const kids = [...el.children];
      kids.map((k, i) => ({ k, i, z: zOf(k) }))
        .sort((a, b) => (a.z !== b.z ? a.z - b.z : a.i - b.i))
        .forEach(({ k }) => walk(k, opacity, anchor));
    }
    // 4) ::after
    pseudoLayer(el, "::after", r, opacity, anchor);
  }

  walk(slide, 1, 0);
  return { items, stage: { w: base.width, h: base.height } };
}

// ── Build the presentation ───────────────────────────────────────────────
const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  headless: true,
  args: ["--enable-unsafe-swiftshader", "--force-color-profile=srgb"],
});
const page = await browser.newPage({
  viewport: { width: STAGE_W, height: STAGE_H },
  deviceScaleFactor: SHOT_SCALE,
});

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "W16x9", width: 13.333, height: 7.5 });
pptx.layout = "W16x9";
pptx.author = "newtonlabs-deck exporter";
pptx.title = "Newton Labs — Policy Infrastructure for Onchain Finance";

const flattened = new Set();
const stats = [];

// ONLY=<n> exports one slide; SLIDES_LIST="13,1,2" exports a custom order.
// Both are diagnostics for per-slide / interactive Quick Look reproduction.
const ONLY = process.env.ONLY ? Number(process.env.ONLY) : null;
const slideNums = process.env.SLIDES_LIST
  ? process.env.SLIDES_LIST.split(",").map((s) => Number(s.trim()))
  : ONLY
    ? [ONLY]
    : Array.from({ length: TOTAL }, (_, i) => i + 1);

for (const n of slideNums) {
  await page.goto(`${URL}#${n}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForFunction(
    () => [...document.querySelectorAll(".deck-slide")].some((s) => s.getBoundingClientRect().width > 10),
    { timeout: 30000 },
  );
  // Wait for fonts AND every image to finish decoding before measuring.
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const imgs = [...document.images].filter((i) => !i.complete);
    await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(900);

  const scene = await page.evaluate(extractScene);

  // Rasterize tagged elements (localized PNGs, cached per run).
  const shotFiles = {};
  for (const it of scene.items) {
    if (it.kind !== "image") continue;
    const file = path.join(assetsDir, `slide${n}-${it.id}.png`);
    try {
      await page.locator(`[data-shot="${it.id}"]`).screenshot({
        path: file,
        omitBackground: it.imgKind === "img",
      });
      shotFiles[it.id] = file;
      flattened.add(it.imgKind === "frame" ? "photo/screenshot frames (image + matte)" : "tinted SVG icons & raster logos");
    } catch (e) {
      console.warn(`  ! screenshot failed ${it.id}:`, e.message);
    }
  }
  flattened.add("WebGL background field (flattened to surface)");

  const slide = pptx.addSlide();
  slide.background = { color: SURFACE };

  // Emit every layer in strict paint order.
  for (const it of scene.items) {
    const objectName = `s${n}-g${it.group}-o${it.order}-${it.kind}`;
    if (it.kind === "box") {
      const shapeType = it.ellipse
        ? pptx.ShapeType.ellipse
        : it.radius > 1
          ? pptx.ShapeType.roundRect
          : pptx.ShapeType.rect;
      const opts = {
        x: px2in(it.x),
        y: px2in(it.y),
        w: px2in(it.w),
        h: px2in(it.h),
        line: it.line ? { color: it.line.color, width: px2pt(it.line.w) } : { type: "none" },
        fill: it.fill ? { color: it.fill } : { type: "none" },
        objectName,
      };
      if (shapeType === pptx.ShapeType.roundRect) {
        const rad = it.pill ? it.h / 2 : it.radius;
        opts.rectRadius = Math.min(px2in(rad), px2in(Math.min(it.w, it.h) / 2));
      }
      slide.addShape(shapeType, opts);
    } else if (it.kind === "line") {
      slide.addShape(pptx.ShapeType.line, {
        x: px2in(it.x1),
        y: px2in(it.y1),
        w: px2in(it.x2 - it.x1),
        h: px2in(it.y2 - it.y1),
        line: { color: it.color, width: Math.max(0.5, px2pt(it.w)) },
        objectName,
      });
    } else if (it.kind === "image") {
      const file = shotFiles[it.id];
      if (!file) continue;
      const opts = { path: file, x: px2in(it.x), y: px2in(it.y), w: px2in(it.w), h: px2in(it.h), objectName };
      if (it.imgKind === "frame")
        opts.shadow = { type: "outer", color: "000000", opacity: 0.18, blur: 8, offset: 3, angle: 90 };
      slide.addImage(opts);
    } else if (it.kind === "text") {
      const runs = it.runs.map((rn) => ({
        text: rn.text,
        options: {
          fontFace: FONT_SANS,
          fontSize: px2pt(rn.size ?? it.size),
          bold: rn.bold,
          italic: rn.italic ?? it.italic,
          color: rn.color,
          charSpacing: rn.letter ? px2pt(rn.letter) : undefined,
        },
      }));
      slide.addText(runs, {
        x: px2in(it.x),
        y: px2in(it.y),
        w: px2in(it.w) + 0.04,
        h: px2in(it.h) + 0.04,
        align: it.align,
        valign: it.valign,
        margin: 0,
        wrap: false,
        lineSpacing: px2pt(it.lh),
        objectName,
      });
    }
  }

  const c = scene.items.reduce((a, it) => ((a[it.kind] = (a[it.kind] || 0) + 1), a), {});
  stats.push({ n, ...c });
  console.log(`slide ${n}/${TOTAL}: ${scene.items.length} layers →`, c);

  await page.evaluate(() =>
    document.querySelectorAll("[data-shot]").forEach((e) => e.removeAttribute("data-shot")),
  );
}

await pptx.writeFile({ fileName: OUT });
await browser.close();

console.log("\nPPTX written:", OUT);
console.log("Flattened element classes:");
for (const f of flattened) console.log("  -", f);
