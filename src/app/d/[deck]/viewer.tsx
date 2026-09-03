"use client";

import Deck from "@/components/deck/Deck";
import type { DeckSlug } from "@decks/catalog";
import { getDeckModule } from "@decks/modules";

export default function DeckViewer({ slug }: { slug: DeckSlug }) {
  const mod = getDeckModule(slug);
  return <Deck slides={mod.slides} renderSlide={mod.renderSlide} />;
}
