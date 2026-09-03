import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  deckListings,
  getDeckListing,
  isDeckSlug,
  type DeckSlug,
} from "@decks/catalog";
import DeckViewer from "../viewer";

type PageProps = {
  params: Promise<{ deck: string }>;
};

export function generateStaticParams() {
  return deckListings.map((d) => ({ deck: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { deck: slug } = await params;
  if (!isDeckSlug(slug)) return { title: "Deck not found" };
  const listing = getDeckListing(slug);
  return {
    title: `${listing.title} · Present`,
    robots: { index: false, follow: false },
  };
}

export default async function PresentPage({ params }: PageProps) {
  const { deck: slug } = await params;
  if (!isDeckSlug(slug)) notFound();
  return <DeckViewer slug={slug as DeckSlug} mode="present" />;
}
