#!/usr/bin/env python3
"""Re-encode large opaque PDF images as DeviceRGB JPEG.

Chrome PrintToPDF stores field snapshots and photos as huge ICC PNGs.
Ghostscript /ebook turns those into JPEGs that macOS Preview paints as a
black rectangle with a white oval (the CSS scrim). This pass downsamples
and JPEG-encodes RGB XObjects without an ICC profile, which Preview
renders correctly. Alpha PNGs (frame shadows, logos) are left alone.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter

IN = Path(os.environ.get("PDF_IN", "exports/newtonlabs-deck.pdf"))
OUT = Path(os.environ.get("PDF_OUT", "exports/newtonlabs-deck-compressed.pdf"))
MAX_SIDE = int(os.environ.get("PDF_MAX_SIDE", "1920"))
JPEG_Q = int(os.environ.get("PDF_JPEG_Q", "82"))


def prepare(im: Image.Image) -> Image.Image:
    rgb = im.convert("RGB") if im.mode != "RGB" else im.copy()
    rgb.info.pop("icc_profile", None)
    w, h = rgb.size
    scale = min(1.0, MAX_SIDE / max(w, h))
    if scale < 0.999:
        rgb = rgb.resize(
            (max(1, round(w * scale)), max(1, round(h * scale))),
            Image.Resampling.LANCZOS,
        )
        rgb.info.pop("icc_profile", None)
    return rgb


def main() -> int:
    if not IN.exists():
        print(f"Input PDF not found: {IN}", file=sys.stderr)
        return 1

    reader = PdfReader(str(IN))
    writer = PdfWriter()
    writer.append(reader)

    n_jpeg = 0
    n_skip = 0
    for page in writer.pages:
        for img in page.images:
            pil = img.image
            if pil is None or pil.mode != "RGB":
                n_skip += 1
                continue
            img.replace(prepare(pil), quality=JPEG_Q)
            n_jpeg += 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    writer.write(str(OUT))
    size_mb = OUT.stat().st_size / 1024 / 1024
    print(f"image pass: jpeg={n_jpeg} skip={n_skip} → {OUT} ({size_mb:.2f} MB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
