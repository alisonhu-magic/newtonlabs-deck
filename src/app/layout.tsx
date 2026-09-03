import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

// Suisse BP Neue italic — editorial quote/callout face (.text-quote).
const suisseBPNeue = localFont({
  src: [
    { path: "../fonts/SuisseBPNeue-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../fonts/SuisseBPNeue-MediumItalic.otf", weight: "500", style: "italic" },
  ],
  variable: "--font-bp-neue",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Newton Labs Decks",
    template: "%s · Newton Labs Decks",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${suisseIntl.variable} ${suisseBPNeue.variable} deck-active h-full antialiased`}
    >
      <body className="min-h-full bg-surface font-sans text-on-surface">{children}</body>
    </html>
  );
}
