"use client";

import Deck from "@/components/deck/Deck";
import DeckPreview from "@/components/deck/DeckPreview";
import type { DeckSlug } from "@decks/catalog";
import { getDeckModule } from "@decks/modules";
import type { DownloadLink } from "@/lib/downloads";

export default function DeckViewer({
  slug,
  mode = "preview",
  downloads = [],
}: {
  slug: DeckSlug;
  mode?: "preview" | "present";
  downloads?: DownloadLink[];
}) {
  const mod = getDeckModule(slug);
  if (mode === "present") {
    return <Deck slides={mod.slides} renderSlide={mod.renderSlide} />;
  }
  return (
    <DeckPreview
      slides={mod.slides}
      renderSlide={mod.renderSlide}
      downloads={downloads}
    />
  );
}
