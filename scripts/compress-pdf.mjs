import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Image-aware PDF compression for the print export.
// Ghostscript /ebook JPEG-encodes Chrome's ICC PNGs in a way macOS Preview
// paints as a black slide with a white oval (field + scrim). This pipeline:
//   1. Re-encode large RGB images as DeviceRGB JPEG (Python / pypdf + Pillow)
//   2. qpdf structural compression (object streams, flate)
// Alpha PNGs (AssetFrame shadows, logos) are not re-encoded.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_PASS = path.join(__dirname, "compress-pdf-images.py");

const DECK = process.env.DECK ?? "fund-admins";
const IN = process.env.PDF_IN ?? `exports/${DECK}.pdf`;
const OUT = process.env.PDF_OUT ?? `exports/${DECK}-compressed.pdf`;

const QPDF_HINT =
  "qpdf is not installed. Install it and re-run:\n" +
  "  macOS:          brew install qpdf\n" +
  "  Debian/Ubuntu:  sudo apt-get install qpdf\n" +
  "  Windows:        winget install qpdf.qpdf\n" +
  "See https://github.com/qpdf/qpdf for other platforms.";

const PYTHON_HINT =
  "Python image compression needs pypdf and Pillow:\n" +
  "  pip3 install pypdf Pillow";

function available(bin, args = ["--version"]) {
  return spawnSync(bin, args, { encoding: "utf8" }).status === 0;
}

function pageCount(file) {
  return Number(
    execFileSync("qpdf", ["--show-npages", file], { encoding: "utf8" }).trim(),
  );
}

function human(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

if (!available("qpdf")) {
  console.error(QPDF_HINT);
  process.exit(1);
}

if (!existsSync(IN)) {
  console.error(
    `Input PDF not found: ${IN}\nRun the PDF export first (e.g. npm run export:pdf).`,
  );
  process.exit(1);
}

const py = spawnSync("python3", ["-c", "import pypdf, PIL"], { encoding: "utf8" });
if (py.status !== 0) {
  console.error(PYTHON_HINT);
  if (py.stderr) console.error(py.stderr.trim());
  process.exit(1);
}

mkdirSync(path.dirname(OUT), { recursive: true });
const tmp = `${OUT}.images.pdf`;

execFileSync("python3", [IMAGE_PASS], {
  stdio: "inherit",
  env: { ...process.env, PDF_IN: IN, PDF_OUT: tmp },
});

execFileSync(
  "qpdf",
  [
    tmp,
    OUT,
    "--compress-streams=y",
    "--recompress-flate",
    "--compression-level=9",
    "--object-streams=generate",
    "--remove-unreferenced-resources=yes",
  ],
  { stdio: "inherit" },
);
unlinkSync(tmp);

execFileSync("qpdf", ["--check", OUT], { stdio: "ignore" });
const inPages = pageCount(IN);
const outPages = pageCount(OUT);
if (inPages !== outPages) {
  console.error(
    `Page count mismatch: original ${inPages}, compressed ${outPages}.`,
  );
  process.exit(1);
}

const inSize = statSync(IN).size;
const outSize = statSync(OUT).size;
const reduction = ((1 - outSize / inSize) * 100).toFixed(1);

console.log("");
console.log("PDF compression complete (JPEG images + qpdf)");
console.log(`  Source:      ${IN} (${human(inSize)})`);
console.log(`  Compressed:  ${OUT} (${human(outSize)})`);
console.log(`  Reduction:   ${reduction}%`);
console.log(`  Pages:       ${outPages} (unchanged), integrity check passed`);
