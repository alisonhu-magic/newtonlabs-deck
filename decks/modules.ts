import type { DeckModule } from "@/components/deck/types";
import type { DeckSlug } from "./catalog";
import * as aon from "./aon/slides";
import * as fundAdmins from "./fund-admins/slides";

const modules = {
  "fund-admins": fundAdmins,
  aon,
} as const satisfies Record<DeckSlug, DeckModule>;

export function getDeckModule(slug: DeckSlug): DeckModule {
  return modules[slug];
}
