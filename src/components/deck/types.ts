import type { ReactNode } from "react";

export type DeckMeta = {
  title: string;
  preparedFor: string;
  brand: string;
};

export type DeckSlide = {
  label?: string;
  variant?: "hero" | "content";
  field?: boolean;
  render: () => ReactNode;
};

export type DeckModule = {
  slides: DeckSlide[];
  renderSlide: (index: number, total: number) => ReactNode;
};
