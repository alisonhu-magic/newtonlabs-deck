import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { deckMeta } from "./content";
import "./globals.css";
import "./deck.css";

const suisseIntl = localFont({
  src: [
    { path: "../fonts/SuisseIntl-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SuisseIntl-RegularIt.woff2", weight: "400", style: "italic" },
    { path: "../fonts/SuisseIntl-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-suisse-intl",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: deckMeta.title,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${suisseIntl.variable} deck-active h-full antialiased`}>
      <body className="min-h-full bg-surface font-sans text-on-surface">{children}</body>
    </html>
  );
}
