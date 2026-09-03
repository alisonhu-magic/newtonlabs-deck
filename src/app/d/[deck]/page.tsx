import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  deckListings,
  getDeckListing,
  isDeckSlug,
  type DeckSlug,
} from "@decks/catalog";
import DeckViewer from "./viewer";
import { pdfDownload, type DownloadLink } from "@/lib/downloads";

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
    title: listing.title,
    robots: { index: false, follow: false },
  };
}

export default async function DeckPage({ params }: PageProps) {
  const { deck: slug } = await params;
  if (!isDeckSlug(slug)) notFound();
  const listing = getDeckListing(slug as DeckSlug);
  const downloads = [
    pdfDownload(listing.downloads.full, "full"),
    pdfDownload(listing.downloads.compressed, "compressed"),
  ].filter((d): d is DownloadLink => d !== null);
  return <DeckViewer slug={slug as DeckSlug} downloads={downloads} />;
}
