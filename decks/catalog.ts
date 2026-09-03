import { meta as aonMeta } from "./aon/meta";
import { meta as fundAdminsMeta } from "./fund-admins/meta";

export type DeckStatus = "active" | "archived";

export const deckListings = [fundAdminsMeta, aonMeta] as const;

export type DeckListing = (typeof deckListings)[number];
export type DeckSlug = DeckListing["slug"];

export function isDeckSlug(value: string): value is DeckSlug {
  return deckListings.some((d) => d.slug === value);
}

export function getDeckListing(slug: DeckSlug): DeckListing {
  const listing = deckListings.find((d) => d.slug === slug);
  if (!listing) throw new Error(`Unknown deck: ${slug}`);
  return listing;
}
