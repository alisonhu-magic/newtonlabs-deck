"use client";

import PreviewChrome from "@/components/ui/PreviewChrome";
import type { DownloadLink } from "@/lib/downloads";
import type { DeckModule } from "./types";

export default function DeckPreview({
  slides,
  renderSlide,
  downloads,
}: DeckModule & { downloads: DownloadLink[] }) {
  const total = slides.length;

  return (
    <main className="preview-desk min-h-screen flex flex-col items-center">
      <PreviewChrome downloads={downloads} />
      <div className="flex w-full flex-col items-center gap-12 px-6 py-12">
        {slides.map((_, i) => (
          <div key={i} className="deck-preview-frame">
            {renderSlide(i, total)}
          </div>
        ))}
      </div>
    </main>
  );
}
